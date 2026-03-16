import { useState } from 'react';
import PillarBadge from '../../shared/PillarBadge';
import useAppStore from '../../../store/useAppStore';
import DraftModal from './DraftModal';

export default function IdeaCard({ idea }) {
  const deleteIdea = useAppStore(s => s.deleteIdea);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14 }}>{idea.text}</p>
          <div style={{ marginTop: 6, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <PillarBadge pillarId={idea.pillar} />
            <span style={{ fontSize: 11, color: '#9ca3af' }}>
              {new Date(idea.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              padding: '4px 10px', background: '#534AB7', color: '#fff',
              borderRadius: 5, fontSize: 12, fontWeight: 600,
            }}
          >
            Draft post
          </button>
          <button
            onClick={() => deleteIdea(idea.id)}
            style={{ padding: '4px 8px', color: '#9ca3af', fontSize: 16, lineHeight: 1 }}
          >
            ×
          </button>
        </div>
      </div>
      <DraftModal open={modalOpen} onClose={() => setModalOpen(false)} idea={idea} />
    </>
  );
}
