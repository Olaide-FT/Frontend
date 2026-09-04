function Loader({ size = "md", fullScreen = false }) {
  const sizes = { sm: "h-4 w-4", md: "h-7 w-7", lg: "h-10 w-10" };
  return (
    <div className={fullScreen ? "flex min-h-screen items-center justify-center bg-background" : "flex items-center justify-center py-10"}>
      <div className={`${sizes[size]} animate-spin rounded-full border-2 border-primary/15 border-t-accent`} />
    </div>
  );
}
export default Loader;
