import Modal from '@/components/layout/Modal';
import { Button } from '@/components/ui/button';

export default function HistoryModalPage() {
  return (
    <Modal>
      <div className='flex flex-col gap-2 w-full'>
        <div className='w-full'>
          <h1 className='font-bold'>바로가기 등록</h1>
          <input
            placeholder='name...'
            className='border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-0 transition duration-200'
          ></input>
        </div>
        <div className='flex justify-between'>
          <Button id='cancle_historymodal'>취소</Button>
          <Button id='create_shortcut'>등록</Button>
        </div>
      </div>
    </Modal>
  );
}
