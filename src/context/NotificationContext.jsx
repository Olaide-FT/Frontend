import { createContext, useCallback, useContext, useState } from "react";
import NotificationModal from "../components/common/NotificationModal";

const NotificationContext = createContext(null);

/* Wraps the app and renders a single NotificationModal instance.Children call `useNotification()` to show notifications.*/
export function NotificationProvider({ children }) {
  const [modal, setModal] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
    autoClose: 0,
  });

  const notify = useCallback(
    ({ type = "info", title = "", message = "", autoClose = 0 }) => {
      setModal({ open: true, type, title, message, autoClose });
    },
    []
  );

  /** Convenience shortcuts */
  const success = useCallback(
    (message, opts = {}) => notify({ type: "success", message, ...opts }),
    [notify]
  );

  const error = useCallback(
    (message, opts = {}) => notify({ type: "error", message, ...opts }),
    [notify]
  );

  const info = useCallback(
    (message, opts = {}) => notify({ type: "info", message, ...opts }),
    [notify]
  );

  const warning = useCallback(
    (message, opts = {}) => notify({ type: "warning", message, ...opts }),
    [notify]
  );

  const close = useCallback(
    () => setModal((prev) => ({ ...prev, open: false })),
    []
  );

  return (
    <NotificationContext.Provider value={{ notify, success, error, info, warning }}>
      {children}

      <NotificationModal
        open={modal.open}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        autoClose={modal.autoClose}
        onClose={close}
      />
    </NotificationContext.Provider>
  );
}


export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used inside NotificationProvider.");
  return ctx;
}
