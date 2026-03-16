import Checkbox from '../../shared/Checkbox';
import useAppStore from '../../../store/useAppStore';

export default function MilestoneItem({ phaseId, milestone }) {
  const toggleMilestone = useAppStore(s => s.toggleMilestone);
  return (
    <div style={{ padding: '8px 0', borderBottom: '0.5px solid #f3f4f6' }}>
      <Checkbox
        checked={milestone.done}
        onChange={() => toggleMilestone(phaseId, milestone.id)}
        label={milestone.text}
      />
    </div>
  );
}
