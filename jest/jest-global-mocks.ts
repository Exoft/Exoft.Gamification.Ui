const mock = () => {
  let storage = {};
  return {
    getItem: (key: any) => (key in storage ? storage[key] : null),
    setItem: (key: any, value: any) => (storage[key] = value || ''),
    removeItem: (key: any) => delete storage[key],
    clear: () => (storage = {}),
  };
};
// browserMock.js
Object.defineProperty(window, 'body', {
  value: () => ({}),
});
Object.defineProperty(window, 'alert', {
  value: () => ({}),
});
Object.defineProperty(window, 'localStorage', {value: mock()});
Object.defineProperty(window, 'sessionStorage', {value: mock()});
Object.defineProperty(window, 'location', {value: {reload: () => ({})}});

// CSSDOM does not have transform, making all components with animations fail unless it's mocked out
Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
    enumerable: true,
    configurable: true,
  }),
});
