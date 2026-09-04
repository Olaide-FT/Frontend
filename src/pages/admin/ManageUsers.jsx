import { useEffect, useState } from "react";
import {
  Users,
  UserRound,
  ShieldCheck,
} from "lucide-react";

import {
  getAllUsers,
  updateUserStatus,
} from "../../services/adminService";

import ApprovalBadge from "../../pages/admin/ApprovalBadge";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();

      setUsers( data?.users || data?.data || data ||[]);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id) => {
    try {
      const data = await updateUserStatus(id);

      // Backend returns the updated user with isActive boolean.
      // Reflect the new isActive value in local state.
      const updatedIsActive = data?.user?.isActive;

      setUsers((prev) =>
        prev.map((user) =>
          (user._id || user.id) === id ? { ...user, isActive: updatedIsActive } : user)
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update user."
      );
    }
  };

  return (
    <section className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          User Management
        </p>

        <h1 className="mt-2 font-heading text-4xl font-bold text-primary">
          Users
        </h1>

        <p className="mt-2 font-body text-sm text-primary/45">
          Manage registered buyers and property owners.
        </p>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-xl border border-primary/10 bg-white">
          {loading ? (
            <div className="space-y-3 p-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-20 animate-pulse rounded-lg bg-primary/5"
                />
              ))}
            </div>
          ) : users.length ? (
            <div className="divide-y divide-primary/10">
              {users.map((user) => {
                const userId =
                  user._id || user.id;

                const role =
                  String(
                    user.role || "buyer"
                  ).toLowerCase();

                return (
                  <div
                    key={userId}
                    className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/5 font-body text-sm font-semibold text-primary">
                        {user.firstName?.charAt(0)}
                        {user.lastName?.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-body text-sm font-semibold text-primary">
                          {user.firstName}{" "}
                          {user.lastName}
                        </h3>

                        <p className="mt-1 font-body text-xs text-primary/40">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-primary/5 px-3 py-1 font-body text-[10px] font-semibold capitalize text-primary/60">
                        {role}
                      </span>

                      <ApprovalBadge
                        status={
                          user.isActive === false
                            ? "suspended"
                            : "active"
                        }
                      />

                      {role !== "admin" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(userId)
                          }
                          className="rounded-lg border border-primary/10 px-4 py-2 font-body text-xs font-semibold text-primary"
                        >
                          {user.isActive === false
                            ? "Activate"
                            : "Suspend"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-6 py-20 text-center">
              <Users
                size={30}
                className="mx-auto text-primary/20"
              />

              <h2 className="mt-4 font-heading text-2xl font-bold text-primary">
                No users found
              </h2>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ManageUsers;