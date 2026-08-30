"use client";

import { useEffect, useState } from "react";
import type { Attraction } from "@/lib/types";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type AttractionForm = {
  name: string;
  description: string;
  image_url: string;
  sort_order: string;
  is_active: boolean;
};

const EMPTY_FORM: AttractionForm = {
  name: "",
  description: "",
  image_url: "",
  sort_order: "0",
  is_active: true,
};

export default function AdminAttractionsPage() {
  const [items, setItems] = useState<Attraction[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<AttractionForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  async function load() {
    setError(null);
    try {
      const res = await fetch("/api/admin/attractions");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setItems(data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load attractions.");
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot data fetch on mount
    load();
  }, []);

  function startNew() {
    setForm(EMPTY_FORM);
    setEditingId("new");
  }

  function startEdit(item: Attraction) {
    setForm({
      name: item.name,
      description: item.description || "",
      image_url: item.image_url || "",
      sort_order: String(item.sort_order ?? 0),
      is_active: item.is_active,
    });
    setEditingId(item.id);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const payload = {
      name: form.name,
      description: form.description,
      image_url: form.image_url || null,
      sort_order: Number(form.sort_order) || 0,
      is_active: form.is_active,
    };
    try {
      const isNew = editingId === "new";
      const res = await fetch(isNew ? "/api/admin/attractions" : `/api/admin/attractions/${editingId}`, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setEditingId(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save attraction.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this attraction card?")) return;
    try {
      const res = await fetch(`/api/admin/attractions/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setItems((prev) => prev?.filter((i) => i.id !== id) ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete attraction.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-maroon">Discover Ayodhya</h1>
          <p className="mt-1 text-sm text-charcoal-soft">
            The attraction cards shown on the homepage &ldquo;Discover Ayodhya&rdquo; section and
            the Location page.
          </p>
        </div>
        <button
          onClick={startNew}
          className="rounded-full bg-maroon px-5 py-2.5 text-sm font-label font-medium text-ivory hover:bg-maroon-deep"
        >
          + Add place
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {editingId && (
        <div className="mt-6 rounded-2xl border border-stone bg-white p-6 space-y-4">
          <h2 className="font-display text-lg text-charcoal">
            {editingId === "new" ? "Add a place" : "Edit place"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name">
              <input
                className="input"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </Field>
            <Field label="Sort order (lower shows first)">
              <input
                className="input"
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
              />
            </Field>
          </div>
          <Field label="Description">
            <textarea
              className="input min-h-20"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </Field>
          <ImageUploadField
            label="Photo"
            value={form.image_url}
            onChange={(url) => setForm((f) => ({ ...f, image_url: url }))}
          />
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
            />
            Visible on the website
          </label>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving || !form.name}
              className="rounded-full bg-maroon px-5 py-2.5 text-sm font-label font-medium text-ivory hover:bg-maroon-deep disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="rounded-full border border-stone px-5 py-2.5 text-sm font-label text-charcoal-soft"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {items && (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-stone bg-white p-4">
              <p className="font-display text-charcoal truncate">{item.name}</p>
              <p className="text-xs text-charcoal-soft mt-0.5">{!item.is_active && "Hidden"}</p>
              <div className="mt-3 flex gap-3">
                <button onClick={() => startEdit(item)} className="text-sm font-label text-maroon">
                  Edit
                </button>
                <button onClick={() => remove(item.id)} className="text-sm font-label text-charcoal-soft hover:text-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-sm text-charcoal-soft">No places yet.</p>}
        </div>
      )}

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid var(--color-stone);
          border-radius: 0.5rem;
          padding: 0.6rem 0.9rem;
          font-size: 0.875rem;
          color: var(--color-charcoal);
        }
        .input:focus {
          outline: none;
          border-color: var(--color-maroon);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-label text-charcoal-soft mb-1">{label}</span>
      {children}
    </label>
  );
}
