import html2canvas from 'html2canvas';

interface CaptureOptions {
  width?: number;
  height?: number;
  scale?: number;
  quality?: number;
  selector?: string;
}

export const captureScreenshot = async ({
  width = 375,
  height = 670,
  scale = 1,
  quality = 0.6,
  selector = 'main',
}: CaptureOptions = {}) => {
  try {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element with selector '${selector}' not found`);
    }

    const canvas = await html2canvas(element as HTMLElement, {
      width,
      height,
      scale,
    });

    return canvas.toDataURL('image/webp', quality);
  } catch (error) {
    console.error('스크린샷 캡처 중 오류:', error);
    return null;
  }
};
