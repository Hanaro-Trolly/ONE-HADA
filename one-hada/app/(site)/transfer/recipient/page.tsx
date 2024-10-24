'use client';

import { useState } from 'react';
import dummy from '@/c-dummy/account_d.json';
import BankOption from '@/components/molecules/BankOption';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function RecipientPage({
  searchParams,
}: {
  searchParams: { account_id: string };
}) {

  const router = useRouter();

  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isBankOptionsOpen, setIsBankOptionsOpen] = useState(false);

  const { account_id } = searchParams;

  const handleBankChange = (bankId: string) => {
    setSelectedBank(bankId);
    setIsBankOptionsOpen(false);
  };

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountNumber(event.target.value);
  };

  const handleClick = () => {
    if (selectedBank && accountNumber) {
      router.push(`/transfer/amount?account_id=${account_id}&bank=${selectedBank}&recipient_number=${accountNumber}`);
    } else {
      alert('은행과 계좌번호를 모두 입력해주세요.');
    }
  };

  type Account = {
    account_id: string;
    user_id: string;
    account_number: number;
    balance: number;
    account_type: string;
    bank: string;
    account_name: string;
  };

  type Bank = {
    bank_id: string;
    bank_name: string;
    bank_code: string;
    logo_url: string;
  };

  const recipientAccounts: Account[] = dummy.recipent_accounts;
  const banks: Bank[] = dummy.banks;

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-center font-bold text-2xl mb-6'>
        누구에게 보낼까요? {account_id}
      </h1>
      <div className='bg-gray-100 p-4 rounded-lg mb-6'>
        <button
          onClick={() => setIsBankOptionsOpen(!isBankOptionsOpen)}
          className='w-full mb-4 p-2 border border-gray-300 rounded'
        >
          {selectedBank
            ? banks.find((bank) => bank.bank_id === selectedBank)?.bank_name
            : '은행을 선택해주세요'}
        </button>

        {isBankOptionsOpen && (
          <div className='absolute bg-white border border-gray-300 rounded shadow-lg p-4 mt-2 w-80'>
            <div className='flex flex-col gap-2'>
              {banks.map((bank) => (
                <BankOption
                  key={bank.bank_id}
                  bankId={bank.bank_id}
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
          className='w-full mb-4 p-2 border border-gray-300 rounded'
        />

        <Button id='223' onClick={handleClick}>다음</Button>

        {/* 수취인 목록 */}
        <div className='flex flex-col gap-4'>
          {recipientAccounts.map((account) => (
            <div
              key={account.account_id}
              className='flex items-center bg-[#bfe4da] p-4 rounded-lg cursor-pointer hover:bg-[#a3d2c7]'
            >
              <div className='flex flex-col'>
                <span className='font-medium text-lg'>
                  {account.account_name}
                </span>
                <span className='text-sm text-gray-600'>
                  {account.account_number}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}