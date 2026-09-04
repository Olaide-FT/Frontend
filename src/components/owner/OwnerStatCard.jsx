function OwnerStatCard({ label, value, description, icon: Icon }) {
  return
  <div className="rounded-xl border border-primary/10 bg-white p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="font-body text-xs font-medium text-primary/45">{label}</p>
        <p className="mt-3 font-body text-3xl font-extrabold tracking-tight text-primary">{value}</p>
      </div>
      {Icon && <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary"><Icon size={18} /></div>}
    </div>
    <p className="mt-3 font-body text-xs text-primary/40">{description}</p>
  </div>;
}
export default OwnerStatCard;
