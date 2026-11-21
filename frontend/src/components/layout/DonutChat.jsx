import "./DonutChart.css";

// Dependency-free donut chart. segments: [{ label, value, color }]
export default function DonutChart({ segments, centerValue, centerLabel, size = 170 }) {
    const total = segments.reduce((sum, s) => sum + s.value, 0);
    const r = 15.9155; // circumference = 100, so values map directly to percentages
    let offset = 25; // start at 12 o'clock

    return (
        <div className="donut">
            <div className="donut__ring" style={{ width: size, height: size }}>
                <svg viewBox="0 0 36 36" role="img" aria-label={`${centerValue} ${centerLabel}`}>
                    <circle className="donut__track" cx="18" cy="18" r={r} />
                    {total > 0 &&
                        segments.map((s) => {
                            const pct = (s.value / total) * 100;
                            const circle = pct > 0 && (
                                <circle
                                    key={s.label}
                                    className="donut__seg"
                                    cx="18"
                                    cy="18"
                                    r={r}
                                    stroke={s.color}
                                    strokeDasharray={`${pct} ${100 - pct}`}
                                    strokeDashoffset={offset}
                                />
                            );
                            offset -= pct;
                            return circle;
                        })}
                </svg>
                <div className="donut__center">
                    <strong>{centerValue}</strong>
                    <span>{centerLabel}</span>
                </div>
            </div>

            <ul className="donut__legend">
                {segments.map((s) => (
                    <li key={s.label}>
                        <span className="donut__dot" style={{ background: s.color }} />
                        {s.label}
                        <b>{s.value}</b>
                    </li>
                ))}
            </ul>
        </div>
    );
}