import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, RefreshCcw } from "lucide-react";
import NestoraLogo from "../../components/common/NestoraLogo";
import { resendOtp, verifyEmail } from "../../services/authService";

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialEmail =
    location.state?.email ||
    new URLSearchParams(location.search).get("email") ||
    "";

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !otp) {
      setError("Please enter your email and OTP code.");
      return;
    }

    setLoading(true);

    try {
      const response = await verifyEmail({
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      });

      setSuccess(response?.message || "Email verified successfully.");
      setVerified(true);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to verify your email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    setError("");
    setSuccess("");
    setResending(true);

    try {
      const response = await resendOtp(email.trim().toLowerCase());
      setSuccess(response?.message || "A new OTP has been sent to your email.");
      setOtp("");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to send a new OTP. Please try again."
      );
    } finally {
      setResending(false);
    }
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
              Security check
            </p>
            <h1 className="mt-4 max-w-sm font-heading text-5xl font-bold leading-tight text-white">
              One more step.
            </h1>
            <p className="mt-5 max-w-md font-body text-base leading-7 text-white/65">
              We sent a one-time password to your email. Enter it below to verify your account and continue.
            </p>
          </div>

          <p className="font-body text-xs text-white/35">© {new Date().getFullYear()} Nestora</p>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="lg:hidden">
            <NestoraLogo className="text-primary" />
          </div>

          <div className="mt-8 lg:mt-10">
            <Link
              to="/"
              className="mb-6 inline-flex items-center font-body text-sm font-semibold text-primary/60 hover:text-accent"
            >
              Back to Home
            </Link>

            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Verify account
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-primary">Check your inbox</h2>
            <p className="mt-2 font-body text-sm text-primary/50">
              Enter the OTP sent to {email || "your email"}.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 font-body text-sm text-green-700">
              {success}
            </div>
          )}

          {!verified ? (
            <form onSubmit={handleVerify} className="mt-7 space-y-5">
              <div>
                <label className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary/60">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary/60">
                  OTP Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  placeholder="Enter 6-digit code"
                  className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-5 py-3.5 font-body text-sm font-semibold text-white disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify Email"}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resending}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/10 px-5 py-3.5 font-body text-sm font-semibold text-primary disabled:opacity-60"
              >
                <RefreshCcw size={16} />
                {resending ? "Sending..." : "Resend OTP"}
              </button>
            </form>
          ) : (
            <div className="mt-7">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 font-body text-sm font-semibold text-white"
              >
                Go to Login
                <ArrowRight size={17} />
              </button>
            </div>
          )}

          <p className="mt-6 text-center font-body text-sm text-primary/50">
            Back to <Link to="/register" className="font-semibold text-primary">Create account</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default VerifyEmail;
