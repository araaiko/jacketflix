export const changeViewport = (): void => {
  if (typeof window !== 'undefined') {
    // 375px未満ではviewport解除
    const viewport = document.querySelector('meta[name="viewport"]');
    const switchViewport = (): void => {
      const value = window.outerWidth > 375 ? 'width=device-width,initial-scale=1' : 'width=375';
      if (viewport?.getAttribute('content') !== value) {
        viewport?.setAttribute('content', value);
      }
    };
    addEventListener('resize', switchViewport, false);
    switchViewport();
  }
};
