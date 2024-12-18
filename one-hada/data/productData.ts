type menuDetail = {
  title: string;
  subButtons: string[];
  products: string[];
};

export const PRODUCT_LIST: Record<string, menuDetail> = {
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
  },
  loan: {
    title: '대출',
    subButtons: ['하나 전세금안심대출', '하나햇살론뱅크', '하나 청년전세론'],
    products: ['하나 전세금안심대출', '하나햇살론뱅크', '하나 청년전세론'],
  },
  insurance: {
    title: '보험',
    subButtons: [
      'iM 플러스변액연금보험',
      '시간에투자하는변액연금보험',
      'IBK5년든든연금보험',
    ],
    products: [
      'iM 플러스변액연금보험',
      '시간에투자하는변액연금보험',
      'IBK5년든든연금보험',
    ],
  },
};
