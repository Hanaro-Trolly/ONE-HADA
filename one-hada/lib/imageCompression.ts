import pako from 'pako';

export const compressImage = (base64Image: string): string => {
  try {
    const binaryString = atob(base64Image.split(',')[1]);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const compressed = pako.deflate(bytes);
    const compressedArray = Array.from(compressed);
    return btoa(String.fromCharCode.apply(null, compressedArray));
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
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error('이미지 압축해제 실패:', error);
    return '';
  }
};
