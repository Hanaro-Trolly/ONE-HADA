type MenuSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function MenuSection({ title, children }: MenuSectionProps) {
  return (
    <div
      id={title}
      className='bg-white shadow-md rounded-xl mb-4 p-4 flex flex-col'
    >
      <h2 className='font-semibold pb-2'>{title}</h2>
      <hr />
      <div className=''>{children}</div>
    </div>
  );
}
