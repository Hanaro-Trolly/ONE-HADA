interface AdminSubmitButtonProps {
  onClick: () => void;
}

export default function AdminSubmitButton({ onClick }: AdminSubmitButtonProps) {
  return <button onClick={onClick}>등록</button>;
}
