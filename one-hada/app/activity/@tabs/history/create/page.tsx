import Modal from '@/components/layout/Modal';
import { Button } from '@/components/ui/button';

export default function HistoryModalPage() {
  return (
    <Modal>
      <div className='flex flex-col gap-2'>
        <div className='w-full'>
          <input
            placeholder='name...'
            className='border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-0 transition duration-200'
          ></input>
        </div>
        <div className='flex justify-between'>
          <Button>취소</Button>
          <Button>등록</Button>
        </div>
      </div>
    </Modal>
  );
}
