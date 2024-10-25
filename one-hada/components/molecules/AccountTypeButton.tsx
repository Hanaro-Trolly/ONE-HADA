// // import { ChevronRight } from 'lucide-react';
// // import { Button } from '../ui/button';
// // type AccountTypeButtonProps = {
// //     account_type : string;
// // };
// // export default function AccountTypeButton()
// import { ChevronRight } from 'lucide-react';
// import { Button } from '../ui/button';
// type AccountTypeButtonProps = {
//   account_type: string;
// };
// export default function AccountTypeButton({
//   account_type,
// }: AccountTypeButtonProps) {
//   console.log(`🚀 ~ account_type:`, account_type);
//   return (
//     <>
//       <div
//       // key={id}
//       // className='bg-white shadow-md rounded-lg border-l-[10px] border-[#AEDBCE] m-4 mx-6 p-4 px-5 h-20 flex justify-between'
//       >
//         {/* <div className='flex flex-col gap-1'>
//           <h1 className='font-medium text-lg'>{name}</h1>
//           <label className='font-light text-gray-500 text-sm'>{date}</label>
//         </div> */}
//         <div>
//           <Button
//             id={account_type}
//             className='rounded-full bg-[#61B89F] hover:bg-[#377b68]'
//           >
//             {account_type}
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// }
import { ButtonHTMLAttributes } from 'react';

type AccountTypeButtonProps = {
  account_type: string;
  onClick: () => void;
  children: React.ReactNode; // children 속성 추가
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function AccountTypeButton({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  account_type,
  onClick,
  children,
  ...rest
}: AccountTypeButtonProps) {
  return (
    <button
      onClick={onClick}
      className='px-4 py-2 bg-[#61B89F] text-white rounded-md hover:bg-[#377b68]'
      {...rest}
    >
      {children}
    </button>
  );
}
