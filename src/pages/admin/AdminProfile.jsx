import { useAuth } from "../../context/AuthContext";

function AdminProfile() {
  const { user } = useAuth();

  return (
    <section className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Administration
        </p>

        <h1 className="mt-2 font-heading text-4xl font-bold text-primary">
          Admin Profile
        </h1>

        <div className="mt-8 rounded-xl border border-primary/10 bg-white p-6 sm:p-8">
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
                Administrator
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-body text-xs text-primary/40">
                First Name
              </p>

              <p className="mt-1 font-body text-sm font-medium text-primary">
                {user?.firstName || "—"}
              </p>
            </div>

            <div>
              <p className="font-body text-xs text-primary/40">
                Last Name
              </p>

              <p className="mt-1 font-body text-sm font-medium text-primary">
                {user?.lastName || "—"}
              </p>
            </div>

            <div>
              <p className="font-body text-xs text-primary/40">
                Email
              </p>

              <p className="mt-1 font-body text-sm font-medium text-primary">
                {user?.email || "—"}
              </p>
            </div>

            <div>
              <p className="font-body text-xs text-primary/40">
                Role
              </p>

              <p className="mt-1 font-body text-sm font-medium capitalize text-primary">
                {user?.role || "Admin"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminProfile;