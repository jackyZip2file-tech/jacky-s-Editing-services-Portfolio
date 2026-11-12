'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useAuth } from '@/lib/auth-context';
import { getClientDb } from '@/lib/firebase';
import { ASPECTS, CATEGORIES, SAMPLE_PROJECTS } from '@/lib/data';

const EMPTY_FORM = {
  title: '',
  category: CATEGORIES[0],
  mediaType: 'video',
  aspect: '16:9',
  url: '',
  thumbUrl: '',
  description: '',
  featured: false,
  order: '',
};

const FIELD_CLASS =
  'focus-ring w-full border border-ink/20 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink/35';
const LABEL_CLASS = 'mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55';

export default function AdminPanel() {
  const { user, isOwner, loading, configured, signIn, signOutUser, error } = useAuth();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    if (!isOwner) {
      setProjects([]);
      return undefined;
    }
    const db = getClientDb();
    if (!db) return undefined;
    const unsubscribe = onSnapshot(
      collection(db, 'portfolio'),
      (snapshot) => {
        setProjects(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
        setLoadError('');
      },
      (err) => setLoadError(err?.message || 'Could not read the portfolio collection.')
    );
    return unsubscribe;
  }, [isOwner]);

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    [projects]
  );

  const updateField = (key) => (event) => {
    const value =
      event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const buildPayload = () => ({
    title: form.title.trim(),
    category: form.category,
    mediaType: form.mediaType,
    aspect: form.aspect,
    url: form.url.trim(),
    thumbUrl: form.thumbUrl.trim(),
    description: form.description.trim(),
    featured: Boolean(form.featured),
    order: form.order === '' ? 999 : Number(form.order),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const db = getClientDb();
    if (!db) {
      setNotice('Firebase is not configured.');
      return;
    }
    if (!form.title.trim() || !form.url.trim()) {
      setNotice('Title and media URL are required.');
      return;
    }

    setBusy(true);
    setNotice('');
    try {
      const payload = buildPayload();
      if (editingId) {
        await updateDoc(doc(db, 'portfolio', editingId), {
          ...payload,
          updatedAt: serverTimestamp(),
        });
        setNotice('Project updated.');
      } else {
        await addDoc(collection(db, 'portfolio'), {
          ...payload,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setNotice('Project added.');
      }
      resetForm();
    } catch (err) {
      setNotice(err?.message || 'Save failed. Check your Firestore rules.');
    } finally {
      setBusy(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setForm({
      title: project.title || '',
      category: project.category || CATEGORIES[0],
      mediaType: project.mediaType || 'video',
      aspect: project.aspect || '16:9',
      url: project.url || '',
      thumbUrl: project.thumbUrl || '',
      description: project.description || '',
      featured: Boolean(project.featured),
      order: project.order === undefined || project.order === null ? '' : String(project.order),
    });
    setNotice('');
    if (typeof window !== 'undefined') {
      document.getElementById('admin')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDelete = async (project) => {
    if (typeof window !== 'undefined' && !window.confirm(`Delete "${project.title || 'this project'}"?`)) {
      return;
    }
    const db = getClientDb();
    if (!db) return;
    setBusy(true);
    try {
      await deleteDoc(doc(db, 'portfolio', project.id));
      setNotice('Project deleted.');
      if (editingId === project.id) resetForm();
    } catch (err) {
      setNotice(err?.message || 'Delete failed.');
    } finally {
      setBusy(false);
    }
  };

  const handleSeed = async () => {
    const db = getClientDb();
    if (!db) return;
    setBusy(true);
    setNotice('');
    try {
      await Promise.all(
        SAMPLE_PROJECTS.map(({ id, sample, ...rest }) =>
          addDoc(collection(db, 'portfolio'), {
            ...rest,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
        )
      );
      setNotice('Starter projects added — edit them with your real work.');
    } catch (err) {
      setNotice(err?.message || 'Seeding failed.');
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <section className="border-b border-ink/10 bg-white">
        <div className="container-sharp py-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">
          Checking session…
        </div>
      </section>
    );
  }

  if (!configured) {
    return (
      <section id="admin" className="border-b border-ink/10 bg-ink text-white">
        <div className="container-sharp py-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-400">Owner area</p>
          <h2 className="mt-2 font-display text-xl font-bold">Firebase isn&apos;t wired up yet</h2>
          <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-white/60">
            Add your Firebase keys to <code className="border border-white/20 px-1">.env.local</code>{' '}
            (see <code className="border border-white/20 px-1">.env.local.example</code>), restart
            the dev server, and this panel turns into the upload dashboard.
          </p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section id="admin" className="border-b border-ink/10 bg-white">
        <div className="container-sharp flex flex-wrap items-center justify-between gap-4 py-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-ink/40">
              Owner area
            </p>
            <p className="mt-1 text-sm text-ink/60">
              Visitors browse freely. Sign in only if you&apos;re Jacky.
            </p>
          </div>
          <button
            type="button"
            onClick={signIn}
            className="btn-sharp border-ink bg-white text-ink hover:bg-ink hover:text-white"
          >
            Sign In
          </button>
        </div>
        {error ? (
          <div className="container-sharp pb-6 text-[12px] text-red-600">{error}</div>
        ) : null}
      </section>
    );
  }

  if (!isOwner) {
    return (
      <section id="admin" className="border-b border-ink/10 bg-white">
        <div className="container-sharp flex flex-wrap items-center justify-between gap-4 py-8">
          <p className="text-sm text-ink/60">
            Signed in as <span className="font-semibold text-ink">{user.email}</span> — this account
            can&apos;t publish. Only the owner email has write access.
          </p>
          <button
            type="button"
            onClick={signOutUser}
            className="btn-sharp border-ink/30 bg-white text-ink/70 hover:border-ink hover:text-ink"
          >
            Sign out
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="border-b border-ink/10 bg-gold-50/60">
      <div className="container-sharp py-14 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-700">
              Owner dashboard
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.02em] text-ink">
              Manage the portfolio
            </h2>
            <p className="mt-1 text-[13px] text-ink/55">
              Signed in as {user.email} · {projects.length} project
              {projects.length === 1 ? '' : 's'} published
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {projects.length === 0 ? (
              <button
                type="button"
                onClick={handleSeed}
                disabled={busy}
                className="btn-sharp border-ink bg-white text-ink hover:bg-ink hover:text-white disabled:opacity-50"
              >
                Seed starter projects
              </button>
            ) : null}
            <button
              type="button"
              onClick={signOutUser}
              className="btn-sharp border-ink/30 bg-white text-ink/70 hover:border-ink hover:text-ink"
            >
              Sign out
            </button>
          </div>
        </div>

        {notice ? (
          <p className="mt-4 border border-ink/15 bg-white px-3 py-2 text-[12px] font-medium text-ink/70">
            {notice}
          </p>
        ) : null}
        {loadError ? (
          <p className="mt-4 border border-red-300 bg-red-50 px-3 py-2 text-[12px] text-red-700">
            {loadError} — publish your Firestore rules.
          </p>
        ) : null}

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <form onSubmit={handleSubmit} className="border border-ink bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-ink">
                {editingId ? 'Edit project' : 'Add a project'}
              </h3>
              {editingId ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45 underline underline-offset-4 hover:text-ink"
                >
                  Cancel edit
                </button>
              ) : null}
            </div>

            <div className="mt-4 grid gap-4">
              <div>
                <label className={LABEL_CLASS} htmlFor="admin-title">
                  Title
                </label>
                <input
                  id="admin-title"
                  className={FIELD_CLASS}
                  value={form.title}
                  onChange={updateField('title')}
                  placeholder="Fast-paced trend recap"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL_CLASS} htmlFor="admin-category">
                    Style / category
                  </label>
                  <select
                    id="admin-category"
                    className={FIELD_CLASS}
                    value={form.category}
                    onChange={updateField('category')}
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={LABEL_CLASS} htmlFor="admin-aspect">
                    Aspect ratio
                  </label>
                  <select
                    id="admin-aspect"
                    className={FIELD_CLASS}
                    value={form.aspect}
                    onChange={updateField('aspect')}
                  >
                    {ASPECTS.map((aspect) => (
                      <option key={aspect} value={aspect}>
                        {aspect}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL_CLASS} htmlFor="admin-type">
                    Media type
                  </label>
                  <select
                    id="admin-type"
                    className={FIELD_CLASS}
                    value={form.mediaType}
                    onChange={updateField('mediaType')}
                  >
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                  </select>
                </div>
                <div>
                  <label className={LABEL_CLASS} htmlFor="admin-order">
                    Sort order
                  </label>
                  <input
                    id="admin-order"
                    type="number"
                    min="0"
                    className={FIELD_CLASS}
                    value={form.order}
                    onChange={updateField('order')}
                    placeholder="1"
                  />
                </div>
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="admin-url">
                  Media URL (YouTube / Drive / Streamable / MP4 / image)
                </label>
                <input
                  id="admin-url"
                  className={FIELD_CLASS}
                  value={form.url}
                  onChange={updateField('url')}
                  placeholder="https://youtu.be/..."
                  required
                />
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="admin-thumb">
                  Custom thumbnail URL (optional)
                </label>
                <input
                  id="admin-thumb"
                  className={FIELD_CLASS}
                  value={form.thumbUrl}
                  onChange={updateField('thumbUrl')}
                  placeholder="https://.../thumb.jpg"
                />
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="admin-desc">
                  Short description
                </label>
                <textarea
                  id="admin-desc"
                  rows={3}
                  className={FIELD_CLASS}
                  value={form.description}
                  onChange={updateField('description')}
                  placeholder="Beat-synced cuts, kinetic captions, punchy sound design."
                />
              </div>

              <label className="flex items-center gap-2 text-[12px] font-semibold text-ink/70">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={updateField('featured')}
                  className="h-4 w-4 accent-[#e0a82e]"
                />
                Feature this piece
              </label>

              <button
                type="submit"
                disabled={busy}
                className="btn-sharp border-ink bg-ink text-white hover:bg-gold-500 hover:text-ink disabled:opacity-50"
              >
                {busy ? 'Saving…' : editingId ? 'Save changes' : 'Publish project'}
              </button>
            </div>
          </form>

          <div className="border border-ink bg-white">
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
              <h3 className="font-display text-base font-bold text-ink">Published</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/40">
                Live
              </span>
            </div>
            {sortedProjects.length === 0 ? (
              <p className="px-5 py-8 text-sm text-ink/50">
                Nothing published yet. Add a project or seed the starters.
              </p>
            ) : (
              <ul className="divide-y divide-ink/10">
                {sortedProjects.map((project) => (
                  <li key={project.id} className="flex items-start gap-3 px-5 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">
                        {project.title || 'Untitled'}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] uppercase tracking-[0.12em] text-ink/40">
                        {project.category} · {project.aspect} · #{project.order ?? 999}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(project)}
                        className="border border-ink/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/60 transition-colors hover:border-ink hover:text-ink"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(project)}
                        className="border border-red-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-red-600 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
