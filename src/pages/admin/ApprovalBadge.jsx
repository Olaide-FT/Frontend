function ApprovalBadge({ status }) {
  const normalizedStatus =
    String(status || "pending").toLowerCase();

  const styles = {
    approved:
      "bg-green-50 text-green-700",
    active:
      "bg-green-50 text-green-700",
    pending:
      "bg-amber-50 text-amber-700",
    rejected:
      "bg-red-50 text-red-700",
    suspended:
      "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 font-body text-[10px] font-semibold capitalize ${
        styles[normalizedStatus] ||
        "bg-primary/5 text-primary/60"
      }`}
    >
      {normalizedStatus}
    </span>
  );
}

export default ApprovalBadge;