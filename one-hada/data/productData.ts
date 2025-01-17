type menuDetail = {
  title: string;
  subButtons: string[];
  products: string[];
  details: string[];
  oneline: string[];
  images: string[];
};

export const PRODUCT_LIST: Record<string, menuDetail> = {
  none: {
    title: '',
    subButtons: [],
    products: [],
    details: [],
    oneline: [],
    images: [],
  },
  deposit: {
    title: '예금',
    subButtons: [
      '3·6·9 정기예금',
      '행복knowhow 연금예금',
      '고단위 플러스(금리연동형)',
    ],
    products: [
      '3·6·9 정기예금',
      '행복knowhow 연금예금',
      '고단위 플러스(금리연동형)',
    ],
    details: [
      '3개월마다, 기쁜 날마다, 고금리의 즐거움을 드립니다.3개월마다, 기쁜 날마다 언제든지 필요할 때 찾을 수 있고 찾을 땐 언제나 높은 금리의 즐거움까지 누릴 수 있는 정기 예금입니다.',
      '노후자금, 생활자금, 재투자자금까지! 행복knowhow 연금예금으로 설계하세요!',
      '이자 지급 방법도 내 맘대로! 이자 지급 시기도 내 맘대로!',
    ],
    oneline: [
      '3개월마다 높은 금리로 찾을 수 있는 예금',
      '노후와 생활자금을 한번에 설계하는 연금',
      '이자 지급방식을 자유롭게 선택하는 예금',
    ],
    images: [
      '/detail/365_deposit.png',
      '/detail/happy_knownknown.png',
      '/detail/plus.png',
    ],
  },
  loan: {
    title: '대출',
    subButtons: ['하나 전세금안심대출', '하나햇살론뱅크', '하나 청년전세론'],
    products: ['하나 전세금안심대출', '하나햇살론뱅크', '하나 청년전세론'],
    details: [
      '주택도시보증공사의 전세자금대출특약보증과 전세보증금반환보증의 결합상품으로 보증서를 담보로 전세대출 지원하고 반환보증을 통해 임대차계약 만료 시 전세보증금을 안전하게 반환하여 대출금을 상환할 수 있는 상품입니다.',
      '정책서민금융상품을 이용한 손님 대상으로 고금리대출을 반복 이용하지 않고, 신용도 상승을 통해 제도권 금융에 안착할 수 있도록 징검다리 역할을 수행하는 서민금융진흥원 보증부 정책서민금융상품',
      '청년층 주거비용 경감을 위해 임차보증금의 90%이내, 최대 2억원까지(전세,반전세 계약 모두 가능합니다)',
    ],
    oneline: [
      '전세보증금 안전 반환 보장 대출',
      '서민을 위한 저금리 징검다리 대출',
      '청년 맞춤형 90% 전월세 대출',
    ],
    images: [
      '/detail/hana_ansim.png',
      '/detail/hana_dari.png',
      '/detail/hana_youth.png',
    ],
  },
  insurance: {
    title: '보험',
    subButtons: [
      '하나 골프보험(방카)',
      'TOP3 VIP 안심보험',
      '손안에 골라담는 암보험',
    ],
    products: [
      '하나 골프보험(방카)',
      'TOP3 VIP 안심보험',
      '손안에 골라담는 암보험',
    ],
    details: [
      '18홀 이상을 보유한 국내소재 정규 골프장에서 발생된 사고에 대해서 보장!',
      '고령화 시대에 꼭 필요한 장해 간병비를 매월 보장받을 수 있는 상품',
      '꼭 필요한 보장만 선택해서 내가 직접 설계하는 암보험',
    ],
    oneline: [
      '오늘은 홀인원 예감! 출발전에 간편 가입!',
      '고령화 시대에 꼭 필요!',
      '갖고싶은 보장만 골라담는 암보험!',
    ],
    images: [
      '/detail/hana_golf.png',
      '/detail/hana_vip.png',
      '/detail/hana_cancer.png',
    ],
  },
};
