'use client';

// import BankIcon from '@/components/molecules/BankIcon';
import BankOption from '@/components/molecules/BankOption';
import { Button } from '@/components/ui/button';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
import useApi from '@/hooks/useApi';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
// import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Account } from '@/lib/datatypes';

export default function RecipientPage({
  searchParams,
}: {
  searchParams: { account_id: string };
}) {
  const router = useRouter();
  // const { data: session } = useSession(); // 세션에서 sessionId 가져오기
  // const userId = session?.user?.id; // sessionId를 세션에서 가져온다고 가정

  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isBankOptionsOpen, setIsBankOptionsOpen] = useState(false);
  // const { data: transactions } = useApi<Transaction>('transaction');
  // const filteredTransactions =
  //   transactions?.filter(
  //     (transaction) => transaction.sender_account_id === userId
  //   ) || [];

  const { account_id } = searchParams;

  const handleBankChange = (bank: string) => {
    setSelectedBank(bank);
    setIsBankOptionsOpen(false);
  };

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountNumber(event.target.value);
  };

  const handleClick = () => {
    const matchingAccount = recipientAccounts.find(
      (account) =>
        account.account_number.toString() === accountNumber &&
        account.bank === selectedBank
    );

    if (matchingAccount) {
      router.push(
        `/transfer/amount?account_id=${account_id}&recipient=${matchingAccount.user_id}&bank=${matchingAccount.bank}&recipient_number=${matchingAccount.account_number}`
      );
    } else {
      alert('일치하는 계좌가 없습니다.');
    }
  };

  // const handleClick2 = (account: Account) => {
  //   router.push(
  //     `/transfer/amount?account_id=${account_id}&recipient=${account.user_id}&bank=${account.bank}&recipient_number=${account.account_number}`
  //   );
  // };

  const { data: recipientAccounts } = useApi<Account>('account');
  type Bank = {
    bank_id: string;
    bank_name: string;
  };

  // Declare banks array directly
  const banks: Bank[] = [
    { bank_id: 'bank1', bank_name: '하나은행' },
    { bank_id: 'bank2', bank_name: '국민은행' },
    { bank_id: 'bank3', bank_name: '신한은행' },
    { bank_id: 'bank4', bank_name: '우리은행' },
    { bank_id: 'bank5', bank_name: '농협은행' },
    { bank_id: 'bank6', bank_name: '카카오뱅크' },
    { bank_id: 'bank7', bank_name: '토스뱅크' },
    { bank_id: 'bank8', bank_name: '제일은행' },
    { bank_id: 'bank9', bank_name: '기업은행' },
    { bank_id: 'bank10', bank_name: 'JP모건' },
    { bank_id: 'bank11', bank_name: 'HSBC' },
    { bank_id: 'bank12', bank_name: '도이치뱅크' },
    { bank_id: 'bank13', bank_name: 'BNP파리바' },
  ];

  return (
    <div
      style={{ height: 'calc(100vh - 56px)' }}
      className='flex flex-col justify-between items-center px-6 pb-6'
    >
      <div>
        <div className='tossface-icon text-[4rem] pt-10 text-center'>✉️</div>
        <h1 className='text-center font-medium text-xl pt-4 mb-10'>
          누구에게 보낼까요?
        </h1>
        <div className=' p-8 rounded-xl mb-6'>
          <button
            onClick={() => setIsBankOptionsOpen(!isBankOptionsOpen)}
            className='w-full mb-8 p-2  border-b-2 '
          >
            {selectedBank ? (
              banks.find((bank) => bank.bank_name === selectedBank)?.bank_name
            ) : (
              <div className='flex items-center'>
                <span className='flex-1 text-gray-400'>
                  은행을 선택해주세요
                </span>
                <ChevronDownIcon className='size-4 text-gray-400'></ChevronDownIcon>
              </div>
            )}
          </button>

          {isBankOptionsOpen && (
            <div className='absolute bg-white border border-gray-300  shadow-lg p-4 mt-2 w-[272px] overflow-auto h-60'>
              <div className='grid grid-cols-3 gap-2 mb-6 w-full'>
                {banks.map((bank) => (
                  <BankOption
                    key={bank.bank_id}
                    bankName={bank.bank_name}
                    selected={selectedBank === bank.bank_id}
                    onClick={handleBankChange}
                  />
                ))}
              </div>
            </div>
          )}

          <input
            type='text'
            placeholder='계좌번호를 입력해주세요'
            value={accountNumber}
            onChange={handleAccountNumberChange}
            className='w-full bg-transparent mb-4 p-2 border-b-2 rounded focus:ring-0 focus:outline-none text-center focus:bg-transparent'
          />
        </div>
      </div>

      {/* <div className='flex flex-col gap-4'>
        {recipientAccounts.map((account) => (
          <Button
            key={account.id}
            id='222'
            variant={'ghost'}
            className='w-full h-full'
            onClick={() => handleClick2(account)}
          >
            <AccountCard
              key={account.id}
              id={account.id}
              accountType={account.account_type}
              accountNumber={account.account_number}
              bank={account.bank}
              user_id={account.user_id}
            />
          </Button>
        ))}
      </div> */}

      {/* <Select onValueChange={setSelectedAccount}>
        <SelectTrigger
          id='gender'
          className='w-[300px] h-20 text-md data-[placeholder]:text-gray-400 data-[placeholder]:font-light bg-white rounded-xl shadow-none focus:outline-none focus:ring-0 border-0 ring-0'
        >
          <SelectValue placeholder='계좌를 선택해주세요' />
        </SelectTrigger>
        <SelectContent className='focus:outline-none'>
          {filteredTransactions.map((transaction) => (
            <SelectItem
              key={transaction.id}
              value={transaction.id}
              className='bg-white focus:outline-none'
            >
              <div className='w-full p-2'>
                <div className='w-full rounded-lg flex flex-col'>
                  <div className='flex items-center gap-4'>
                    <BankIcon bankId={account.bank} />
                    <div className='flex flex-col'>
                      <h1 className='font-medium text-left text-lg'>
                        {transaction.receiver_viewer}
                      </h1>
                      <label className='font-light text-gray-500 text-left text-sm'>
                        {`${account.bank} • ${account.account_number}`}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
      <Button
        id='221'
        className='w-full h-10 text-white text-lg bg-main-green  py-3 rounded mt-6 focus:bg-[#479e86] hover:bg-[#479e86] transition'
        onClick={() => handleClick()}
      >
        다음
      </Button>
    </div>
  );
}
