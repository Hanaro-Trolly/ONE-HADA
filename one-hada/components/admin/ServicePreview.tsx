'use client';

interface ServicePreviewProps {
  userId: string;
}

export default function ServicePreview({ userId }: ServicePreviewProps) {
  return (
    <div className='h-[600px] w-full rounded-lg border'>
      <iframe
        src={`/?user=${encodeURIComponent(userId)}`} // URL에 userId 포함
        className='h-[calc(100%-40px)] w-full rounded-b-lg'
        sandbox='allow-same-origin allow-scripts'
      />
    </div>
  );
}
