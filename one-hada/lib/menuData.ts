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
      { title: '전체계좌/거래내역', link: '/', id: 'accountHistory' },
      { title: '이체내역', link: '/', id: 'transferHistory' },
    ],
  },
  {
    title: '이체',
    items: [
      { title: '계좌이체', link: '/', id: 'transfer' },
      { title: '다계좌이체', link: '/', id: 'multiTransfer' },
      { title: '자동이체', link: '/', id: 'autoTransfer' },
      { title: '기부이체', link: '/', id: 'donationTransfer' },
      { title: '이체관리', link: '/', id: 'transferManagement' },
    ],
  },
  {
    title: '자산관리',
    items: [
      { title: '하나은행 자산', link: '/', id: 'hanaAsset' },
      { title: '하나은행 자산관리', link: '/', id: 'hanaAssetManagement' },
      { title: '마이데이터', link: '/', id: 'myData' },
      { title: '마이데이터 설정', link: '/', id: 'myDataSettings' },
      { title: '지출관리', link: '/', id: 'expenseManagement' },
      { title: '대출똑똑케어', link: '/', id: 'loanCare' },
      { title: '국민연금 계좌관리', link: '/', id: 'pensionAccount' },
      { title: '영업점 추천상품', link: '/', id: 'branchProducts' },
      { title: '오픈뱅킹', link: '/', id: 'openBanking' },
    ],
  },
  {
    title: '예적금',
    items: [
      { title: '입출금통장 가입', link: '/', id: 'checkingAccount' },
      { title: '적금 가입', link: '/', id: 'savings' },
      { title: '청약 가입', link: '/', id: 'subscription' },
      { title: '예금 가입', link: '/menu/deposit', id: 'deposit' },
      { title: '내아이통장 만들기', link: '/', id: 'childAccount' },
      { title: '예금관리', link: '/', id: 'depositManagement' },
      { title: '모임통장서비스', link: '/', id: 'groupAccount' },
      { title: '잔액충전서비스', link: '/', id: 'balanceCharge' },
    ],
  },
  {
    title: '퇴직연금',
    items: [
      { title: 'IRP/DC가입', link: '/', id: 'irpDc' },
      { title: '연금저축/IRP가져오기', link: '/', id: 'pensionTransfer' },
      { title: '연금현황/매도', link: '/', id: 'pensionStatus' },
      { title: '연금상품/매수', link: '/', id: 'pensionPurchase' },
      { title: '퇴직연금 상품운용', link: '/', id: 'pensionManagement' },
      { title: '퇴직연금 계좌관리', link: '/', id: 'pensionAccountManagement' },
      { title: '퇴직연금 거래조회', link: '/', id: 'pensionTransaction' },
      { title: '퇴직연금 전체메뉴', link: '/', id: 'pensionAllMenu' },
    ],
  },
  {
    title: '펀드',
    items: [
      { title: '펀드가입', link: '/', id: 'fundSubscription' },
      { title: '펀드관리', link: '/', id: 'fundManagement' },
    ],
  },
  {
    title: '신탁',
    items: [
      { title: '신탁가입', link: '/', id: 'trustSubscription' },
      { title: '신탁관리', link: '/', id: 'trustManagement' },
    ],
  },
  {
    title: 'ISA',
    items: [
      { title: '개인종합자산관리계좌 가입', link: '/', id: 'isaSubscription' },
      { title: '개인종합자산관리계좌 관리', link: '/', id: 'isaManagement' },
    ],
  },
  {
    title: '대출',
    items: [
      { title: '대출신청', link: '/menu/loan', id: 'loan' },
      { title: '대출관리', link: '/', id: 'loanManagement' },
      { title: '대출신청관리', link: '/', id: 'loanApplicationManagement' },
    ],
  },
  {
    title: '외환',
    items: [
      { title: '외화예금가입', link: '/', id: 'foreignDeposit' },
      { title: '외화예금관리', link: '/', id: 'foreignDepositManagement' },
      { title: 'FX마켓', link: '/', id: 'fxMarket' },
      { title: '환율', link: '/', id: 'exchangeRate' },
      { title: '외화매매/환전', link: '/', id: 'foreignExchange' },
      { title: '외화송금', link: '/', id: 'foreignRemittance' },
      { title: '외화송금받기', link: '/', id: 'foreignReceive' },
      { title: '외화결제카드', link: '/', id: 'foreignCard' },
      { title: '외환혜택라운지', link: '/', id: 'foreignBenefits' },
    ],
  },
  {
    title: '보험',
    items: [
      { title: '보험/노란우산 가입', link: '/menu/insurance', id: 'insurance' },
      { title: '보험관리', link: '/', id: 'insuranceManagement' },
    ],
  },
  {
    title: '공과금',
    items: [
      { title: '공과금납부', link: '/', id: 'billPayment' },
      { title: '공과금관리', link: '/', id: 'billManagement' },
    ],
  },
  {
    title: '번호표/출금/결제',
    items: [
      { title: '모바일번호표', link: '/', id: 'mobileTicket' },
      { title: 'ATM/영업점 출금', link: '/', id: 'atmWithdraw' },
      { title: '해외ATM 출금', link: '/', id: 'overseasWithdraw' },
      { title: '결제', link: '/', id: 'payment' },
    ],
  },
  {
    title: '카드',
    items: [
      { title: '카드신청', link: '/', id: 'cardApplication' },
      { title: '이용내역/명세서', link: '/', id: 'cardHistory' },
      { title: '내카드/이용한도', link: '/', id: 'cardLimit' },
    ],
  },
  {
    title: '하나금융그룹',
    items: [
      { title: '그룹자산 통합조회', link: '/', id: 'groupAsset' },
      { title: '하나머니', link: '/', id: 'hanaMoney' },
      { title: '하나증권', link: '/', id: 'hanaStock' },
      { title: '하나카드', link: '/', id: 'hanaCard' },
      { title: '하나캐피탈', link: '/', id: 'hanaCapital' },
      { title: '하나생명', link: '/', id: 'hanaLife' },
      { title: '하나손해보험', link: '/', id: 'hanaInsurance' },
      { title: '하나저축은행', link: '/', id: 'hanaSavings' },
      { title: '제휴사 연계대출 조회결과', link: '/', id: 'partnerLoan' },
    ],
  },
  {
    title: '사업자/시니어/VIP/YOUNG',
    items: [
      { title: '개인사업자', link: '/', id: 'business' },
      { title: '시니어', link: '/', id: 'senior' },
      { title: 'VIP', link: '/', id: 'vip' },
      { title: 'YOUNG', link: '/', id: 'young' },
    ],
  },
  {
    title: '이벤트/스포츠',
    items: [
      { title: '혜택/이벤트', link: '/', id: 'benefits' },
      { title: '티켓예매', link: '/', id: 'ticket' },
      { title: '스포츠', link: '/', id: 'sports' },
      { title: '하나원큐 축구Play', link: '/', id: 'soccerPlay' },
    ],
  },
  {
    title: '생활',
    items: [
      { title: '생활편의', link: '/', id: 'convenience' },
      { title: '생활정보', link: '/', id: 'information' },
      { title: '생활금융', link: '/', id: 'lifeFinance' },
    ],
  },
];
