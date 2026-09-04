import { useAuth } from "./context/AuthContext";
import Loader from "./components/common/Loader";
import BackToTop from "./components/common/BackToTop";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { loading } = useAuth();
  if (loading) return <Loader size="lg" fullScreen />;
  return (
    <>
      <AppRoutes />
      <BackToTop />
    </>
  );
}

export default App;
