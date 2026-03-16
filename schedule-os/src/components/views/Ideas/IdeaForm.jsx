import { useState } from 'react';
import { PILLARS } from '../../../data/pillars';
import useAppStore from '../../../store/useAppStore';

export default function IdeaForm() {
  const [text, setText] = useState('');
  const [pillar, setPillar] = useState('');
  const addIdea = useAppStore(s => s.addIdea);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    addIdea(text.trim(), pillar || null);
    setText('');
    setPillar('');
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New idea..."
        style={{
          flex: 1, minWidth: 200, padding: '8px 12px',
          border: '0.5px solid #e5e7eb', borderRadius: 6, fontSize: 14, outline: 'none',
        }}
      />
      <select
        value={pillar}
        onChange={e => setPillar(e.target.value)}
        style={{
          padding: '8px 12px', border: '0.5px solid #e5e7eb',
          borderRadius: 6, fontSize: 14, background: '#fff', outline: 'none',
        }}
      >
        <option value="">No pillar</option>
        {PILLARS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
      </select>
      <button type="submit" style={{
        padding: '8px 16px', background: '#185FA5', color: '#fff',
        borderRadius: 6, fontSize: 14, fontWeight: 600,
      }}>Add</button>
    </form>
  );
}
