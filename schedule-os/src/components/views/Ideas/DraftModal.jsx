import { useState } from 'react';
import Modal from '../../shared/Modal';
import { draftLinkedInPost } from '../../../api/anthropic';

export default function DraftModal({ open, onClose, idea }) {
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');

  async function handleDraft() {
    if (!idea) return;
    setLoading(true);
    setError('');
    setDraft('');
    try {
      const text = await draftLinkedInPost(idea.text);
      setDraft(text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setDraft('');
    setError('');
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Draft LinkedIn Post">
      {idea && (
        <div>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>Idea: {idea.text}</p>
          {!draft && !loading && (
            <button onClick={handleDraft} style={{
              padding: '8px 16px', background: '#534AB7', color: '#fff',
              borderRadius: 6, fontSize: 14, fontWeight: 600, marginBottom: 12,
            }}>
              Generate draft
            </button>
          )}
          {loading && (
            <div style={{ padding: '16px 0', color: '#6b7280', fontSize: 14 }}>
              Drafting post...
            </div>
          )}
          {error && (
            <div style={{ color: '#dc2626', fontSize: 13, padding: '8px 12px', background: '#fef2f2', borderRadius: 6, marginBottom: 12 }}>
              {error}
            </div>
          )}
          {draft && (
            <div>
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                style={{
                  width: '100%', minHeight: 200, padding: '10px 12px',
                  border: '0.5px solid #e5e7eb', borderRadius: 6, fontSize: 13,
                  resize: 'vertical', outline: 'none',
                }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button
                  onClick={() => navigator.clipboard.writeText(draft)}
                  style={{ padding: '6px 12px', border: '0.5px solid #e5e7eb', borderRadius: 6, fontSize: 13 }}
                >
                  Copy
                </button>
                <button onClick={handleDraft} style={{ padding: '6px 12px', border: '0.5px solid #e5e7eb', borderRadius: 6, fontSize: 13 }}>
                  Regenerate
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
