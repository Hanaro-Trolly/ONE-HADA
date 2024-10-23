export default function HistoryLayout({
  children,
  historymodal,
}: {
  children: React.ReactNode;
  historymodal: React.ReactNode;
}) {
  return (
    <>
      <div>{children}</div>
      <div>{historymodal}</div>
    </>
  );
}
