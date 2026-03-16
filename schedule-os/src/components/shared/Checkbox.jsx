export default function Checkbox({ checked, onChange, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
      <input type="checkbox" checked={checked} onChange={onChange}
        style={{ width: 16, height: 16, cursor: 'pointer', accentColor: '#185FA5' }} />
      {label && <span style={{ fontSize: 14, textDecoration: checked ? 'line-through' : 'none', color: checked ? '#9ca3af' : 'inherit' }}>{label}</span>}
    </label>
  );
}
