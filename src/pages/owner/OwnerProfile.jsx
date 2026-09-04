import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile, getCurrentUser } from "../../services/authService";
import { storage } from "../../utils/storage";

function OwnerProfile() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  useEffect(() => {
    if (!user) return;
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  }, [user]);

  // Ensure profile is refreshed from server if phone is missing locally
  useEffect(() => {
    const ensureProfile = async () => {
      if (!user || user?.phone) return;
      try {
        const profileResp = await getCurrentUser();
        const freshUser = profileResp?.user || profileResp?.data || profileResp || null;
        if (freshUser) {
          setUser(freshUser);
          storage.setUser(freshUser);
        }
      } catch (e) {
        // ignore
      }
    };
    ensureProfile();
  }, [user, setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await updateProfile(formData);

      // verify by fetching the current user from the server
      const profileResp = await getCurrentUser();
      const freshUser = profileResp?.user || profileResp?.data || profileResp || null;

      if (freshUser) {
        const payload = { ...user, ...freshUser };
        setUser(payload);
        storage.setUser(payload);
      }

      setSuccess("Profile updated successfully.");
      setIsEditing(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Account
        </p>

        <div className="mt-2 flex items-center justify-between gap-4">
          <h1 className="font-heading text-4xl font-bold text-primary">
            Owner Profile
          </h1>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-primary px-4 py-2 font-body text-sm font-semibold text-white"
            >
              Edit Profile
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-accent px-4 py-2 font-body text-sm font-semibold text-primary disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>

        <div className="mt-8 rounded-xl border border-primary/10 bg-white p-6 sm:p-8">
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 font-body text-sm text-green-700">
              {success}
            </div>
          )}

          <div className="flex items-center gap-4 border-b border-primary/10 pb-7">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-body text-xl font-semibold text-accent">
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </div>

            <div>
              <h2 className="font-body text-lg font-semibold text-primary">
                {user?.firstName} {user?.lastName}
              </h2>

              <p className="font-body text-sm capitalize text-primary/40">
                Property owner
              </p>
            </div>
          </div>

          {!isEditing ? (
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-body text-xs text-primary/40">First Name</p>
                <p className="mt-1 font-body text-sm font-medium text-primary">
                  {user?.firstName || "—"}
                </p>
              </div>

              <div>
                <p className="font-body text-xs text-primary/40">Last Name</p>
                <p className="mt-1 font-body text-sm font-medium text-primary">
                  {user?.lastName || "—"}
                </p>
              </div>

              <div>
                <p className="font-body text-xs text-primary/40">Email</p>
                <p className="mt-1 font-body text-sm font-medium text-primary">
                  {user?.email || "—"}
                </p>
              </div>

              <div>
                <p className="font-body text-xs text-primary/40">Phone</p>
                <p className="mt-1 font-body text-sm font-medium text-primary">
                  {user?.phone || "—"}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="font-body text-xs text-primary/40">Role</p>
                <p className="mt-1 font-body text-sm font-medium capitalize text-primary">
                  {user?.role || "Owner"}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-body text-xs text-primary/40">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="font-body text-xs text-primary/40">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="font-body text-xs text-primary/40">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="font-body text-xs text-primary/40">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default OwnerProfile;
