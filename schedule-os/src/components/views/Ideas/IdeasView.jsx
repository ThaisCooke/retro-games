import IdeaForm from './IdeaForm';
import IdeaCard from './IdeaCard';
import useAppStore from '../../../store/useAppStore';

export default function IdeasView() {
  const ideas = useAppStore(s => s.ideas);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Ideas</h1>
        <p style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>{ideas.length} ideas captured</p>
      </div>
      <IdeaForm />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ideas.length === 0 ? (
          <p style={{ color: '#9ca3af', fontSize: 14, textAlign: 'center', padding: '32px 0' }}>
            No ideas yet. Add your first one above.
          </p>
        ) : (
          ideas.slice().reverse().map(idea => <IdeaCard key={idea.id} idea={idea} />)
        )}
      </div>
    </div>
  );
}
