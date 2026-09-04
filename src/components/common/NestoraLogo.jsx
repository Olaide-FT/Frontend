function NestoraLogo({ className = "", dark = false, color }) {
  const resolvedColor = color || (dark ? "#C9A45C" : "#C9A45C");

  return (
    <span
      className={`inline-flex items-center ${className}`}
      style={{ color: resolvedColor }}
    >
      <span className="font-body text-2xl font-extrabold tracking-tight">
        Nestora
      </span>
    </span>
  );
}

export default NestoraLogo;
