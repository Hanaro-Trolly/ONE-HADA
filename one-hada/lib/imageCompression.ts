import pako from 'pako';

export const compressImage = (base64Image: string): string => {
  try {
    // base64 이미지에서 헤더 제거 및 바이너리 변환
    const binaryString = atob(base64Image.split(',')[1]);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // pako로 최대 압축
    const compressed = pako.deflate(bytes, {
      level: 9,
      memLevel: 9,
      strategy: 2,
      windowBits: 15,
    });

    return btoa(String.fromCharCode.apply(null, Array.from(compressed)));
  } catch (error) {
    console.error('이미지 압축 실패:', error);
    return '';
  }
};

export const decompressImage = (compressedData: string): string => {
  try {
    const binaryString = atob(compressedData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const decompressed = pako.inflate(bytes);
    const base64 = btoa(
      String.fromCharCode.apply(null, Array.from(decompressed))
    );
    return `data:image/webp;base64,${base64}`;
  } catch (error) {
    console.error('이미지 압축해제 실패:', error);
    return '';
  }
};
