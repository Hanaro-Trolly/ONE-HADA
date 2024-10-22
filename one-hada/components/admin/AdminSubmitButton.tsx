interface AdminSubmitButtonProps {
  onClick: () => void;
}

const AdminSubmitButton = ({ onClick }: AdminSubmitButtonProps) => {
  return <button onClick={onClick}>등록</button>;
};

export default AdminSubmitButton;
