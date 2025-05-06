import "./ResourceBar.css";

export default function ResourceBar({ value, resourceName, max, min, color }) {
  // Ограничиваем значение в пределах 0-100
  const percentage = Math.max(min, Math.min(max, value)) / max * 100;

  return (
    <div className="bar-container">
      <span className="resource-name" style={{ color }}>{resourceName}</span>
      <div className="resource-bar">
        <div className="resource-fill" style={{ width: `${percentage}%`, backgroundColor: color }} />
        <span className="resource-label">{percentage}%</span>
      </div>
    </div>
  );
}
