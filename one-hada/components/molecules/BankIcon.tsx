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
      case '우리은행':
        return '/icons/icon-woori.png';
      case '카카오뱅크':
        return '/icons/icon-kakao.png';
      case '기업은행':
        return '/icons/icon-ibk.png';
      case '농협은행':
        return '/icons/icon-nh.png';
      case '제일은행':
        return '/icons/icon-sc.png';
      case '토스뱅크':
        return '/icons/icon-toss.png';
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
