// components/BankIcon.tsx
import Image from 'next/image';

type BankIconProps = {
  bankId: string;
};

// eslint-disable-next-line react/prop-types
const BankIcon: React.FC<BankIconProps> = ({ bankId }) => {
  const getIconPath = (bankId: string) => {
    switch (bankId) {
      case '하나은행':
        return '/icons/icon-hana.png';
      case '국민은행':
        return '/icons/icon-kb.png';
      case '신한은행':
        return '/icons/icon-shinhan.png';
      // 기본 아이콘 설정
      default:
        return '/icons/icon-192x192.png';
    }
  };

  return (
    <Image
      src={getIconPath(bankId)}
      alt={`${bankId} 아이콘`}
      width={40}
      height={40}
      className='object-contain'
    />
  );
};

export default BankIcon;
