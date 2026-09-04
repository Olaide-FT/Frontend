import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getApiErrorMessage } from "../../utils/apiError";
import NestoraLogo from "../../components/common/NestoraLogo";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const data = await login({ email, password });
      const role = data?.user?.role?.toLowerCase();
      const from = location.state?.from?.pathname;
      if (from) return navigate(from, { replace: true });
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "owner") navigate("/owner/dashboard");
      else navigate("/");
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to sign in."));
    } finally { setLoading(false); }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-xl lg:grid-cols-[1.15fr_0.85fr]">
        <div className="hidden bg-primary p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <NestoraLogo className="text-white" />
          </div>

          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Welcome back
            </p>
            <h1 className="mt-4 max-w-sm font-heading text-5xl font-bold leading-tight text-white">
              Find your next smart move.
            </h1>
            <p className="mt-5 max-w-md font-body text-base leading-7 text-white/65">
              Sign in to manage listings, track buyers, and stay on top of your property journey.
            </p>
          </div>

          <p className="font-body text-xs text-white/35">© {new Date().getFullYear()} Nestora</p>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="lg:hidden">
            <NestoraLogo className="text-primary" />
          </div>

          <div className="mt-8 lg:mt-10">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Sign in
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-primary">Welcome back</h2>
            <p className="mt-2 font-body text-sm text-primary/50">
              Access your account to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            {error && <div className="rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-600">{error}</div>}

            <label className="block font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary/60">
              Email
              <input name="email" autoComplete="email" onChange={(e)=>setEmail(e.target.value)} type="email" required className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent" />
            </label>

            <label className="block font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary/60">
              Password
              <div className="relative mt-2">
                <input name="password" autoComplete="current-password" onChange={(e)=>setPassword(e.target.value)} type={showPassword ? "text" : "password"} required className="w-full rounded-lg border border-primary/10 px-4 py-3 pr-12 font-body text-sm outline-none focus:border-accent" />
                <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <button disabled={loading} className="w-full rounded-lg bg-primary px-5 py-3.5 font-body text-sm font-semibold text-white disabled:opacity-50">{loading ? "Signing in..." : "Sign In"}</button>
          </form>

          <p className="mt-6 text-center font-body text-sm text-primary/45">
            Don’t have an account? <Link to="/register" className="font-semibold text-primary">Create one</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
export default Login;
