export const buttons = [
  { label: '조회', targetId: '조회' },
  { label: '이체', targetId: '이체' },
  { label: '자산관리', targetId: '자산관리' },
  { label: '예적금', targetId: '예적금' },
  { label: '퇴직연금', targetId: '퇴직연금' },
  { label: '펀드', targetId: '펀드' },
  { label: '신탁', targetId: '신탁' },
  { label: 'ISA', targetId: 'ISA' },
  { label: '대출', targetId: '대출' },
  { label: '외환', targetId: '외환' },
  { label: '보험', targetId: '보험' },
  { label: '공과금', targetId: '공과금' },
  { label: '번호표/출금/결제', targetId: '번호표/출금/결제' },
  { label: '카드', targetId: '카드' },
  { label: '하나금융그룹', targetId: '하나금융그룹' },
  { label: '사업자/시니어/VIP/YOUNG', targetId: '사업자/시니어/VIP/YOUNG' },
  { label: '이벤트/스포츠', targetId: '이벤트/스포츠' },
  { label: '생활', targetId: '생활' },
];

export const menuData = [
  {
    title: '조회',
    items: [
      { title: '전체계좌/거래내역', link: '/' },
      { title: '이체내역', link: '/' },
    ],
  },
  {
    title: '이체',
    items: [
      { title: '계좌이체', link: '/' },
      { title: '다계좌이체', link: '/' },
      { title: '자동이체', link: '/' },
      { title: '기부이체', link: '/' },
      { title: '이체관리', link: '/' },
    ],
  },
  {
    title: '자산관리',
    items: [
      { title: '하나은행 자산', link: '/' },
      { title: '하나은행 자산관리', link: '/' },
      { title: '마이데이터', link: '/' },
      { title: '마이데이터 설정', link: '/' },
      { title: '지출관리', link: '/' },
      { title: '대출똑똑케어', link: '/' },
      { title: '국민연금 계좌관리', link: '/' },
      { title: '영업점 추천상품', link: '/' },
      { title: '오픈뱅킹', link: '/' },
    ],
  },
  {
    title: '예적금',
    items: [
      { title: '입출금통장 가입', link: '/' },
      { title: '적금 가입', link: '/' },
      { title: '청약 가입', link: '/' },
      { title: '예금 가입', link: '/' },
      { title: '내아이통장 만들기', link: '/' },
      { title: '예금관리', link: '/' },
      { title: '모임통장서비스', link: '/' },
      { title: '잔액충전서비스', link: '/' },
    ],
  },
  {
    title: '퇴직연금',
    items: [
      { title: 'IRP/DC가입', link: '/' },
      { title: '연금저축/IRP가져오기', link: '/' },
      { title: '연금현황/매도', link: '/' },
      { title: '연금상품/매수', link: '/' },
      { title: '퇴직연금 상품운용', link: '/' },
      { title: '퇴직연금 계좌관리', link: '/' },
      { title: '퇴직연금 거래조회', link: '/' },
      { title: '퇴직연금 전체메뉴', link: '/' },
    ],
  },
  {
    title: '펀드',
    items: [
      { title: '펀드가입', link: '/' },
      { title: '펀드관리', link: '/' },
    ],
  },
  {
    title: '신탁',
    items: [
      { title: '신탁가입', link: '/' },
      { title: '신탁관리', link: '/' },
    ],
  },
  {
    title: 'ISA',
    items: [
      { title: '개인종합자산관리계좌 가입', link: '/' },
      { title: '개인종합자산관리계좌 관리', link: '/' },
    ],
  },
  {
    title: '대출',
    items: [
      { title: '대출신청', link: '/' },
      { title: '대출관리', link: '/' },
      { title: '대출신청관리', link: '/' },
    ],
  },
  {
    title: '외환',
    items: [
      { title: '외화예금가입', link: '/' },
      { title: '외화예금관리', link: '/' },
      { title: 'FX마켓', link: '/' },
      { title: '환율', link: '/' },
      { title: '외화매매/환전', link: '/' },
      { title: '외화송금', link: '/' },
      { title: '외화송금받기', link: '/' },
      { title: '외화결제카드', link: '/' },
      { title: '외환혜택라운지', link: '/' },
    ],
  },
  {
    title: '보험',
    items: [
      { title: '보험/노란우산 가입', link: '/' },
      { title: '보험관리', link: '/' },
    ],
  },
  {
    title: '공과금',
    items: [
      { title: '공과금납부', link: '/' },
      { title: '공과금관리', link: '/' },
    ],
  },
  {
    title: '번호표/출금/결제',
    items: [
      { title: '모바일번호표', link: '/' },
      { title: 'ATM/영업점 출금', link: '/' },
      { title: '해외ATM 출금', link: '/' },
      { title: '결제', link: '/' },
    ],
  },
  {
    title: '카드',
    items: [
      { title: '카드신청', link: '/' },
      { title: '이용내역/명세서', link: '/' },
      { title: '내카드/이용한도', link: '/' },
    ],
  },
  {
    title: '하나금융그룹',
    items: [
      { title: '그룹자산 통합조회', link: '/' },
      { title: '하나머니', link: '/' },
      { title: '하나증권', link: '/' },
      { title: '하나카드', link: '/' },
      { title: '하나캐피탈', link: '/' },
      { title: '하나생명', link: '/' },
      { title: '하나손해보험', link: '/' },
      { title: '하나저축은행', link: '/' },
      { title: '제휴사 연계대출 조회결과', link: '/' },
    ],
  },
  {
    title: '사업자/시니어/VIP/YOUNG',
    items: [
      { title: '개인사업자', link: '/' },
      { title: '시니어', link: '/' },
      { title: 'VIP', link: '/' },
      { title: 'YOUNG', link: '/' },
    ],
  },
  {
    title: '이벤트/스포츠',
    items: [
      { title: '혜택/이벤트', link: '/' },
      { title: '티켓예매', link: '/' },
      { title: '스포츠', link: '/' },
      { title: '하나원큐 축구Play', link: '/' },
    ],
  },
  {
    title: '생활',
    items: [
      { title: '생활편의', link: '/' },
      { title: '생활정보', link: '/' },
      { title: '생활금융', link: '/' },
    ],
  },
];
