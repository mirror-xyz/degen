Object.defineProperty(window, 'URL', {
  writable: true,
  value: {
    createObjectURL: jest.fn(),
  },
})
