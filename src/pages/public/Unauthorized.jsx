import { ShieldX, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary"><ShieldX size={28} /></div>
        <p className="mt-6 font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">Access Restricted</p>
        <h1 className="mt-2 font-body text-4xl font-extrabold text-primary">Unauthorized</h1>
        <p className="mt-4 font-body text-sm leading-6 text-primary/45">You don't have permission to access this page.</p>
        <Link to="/" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-body text-xs font-semibold text-white"><ArrowLeft size={15} />Return Home</Link>
      </div>
    </section>
  );
}
export default Unauthorized;
