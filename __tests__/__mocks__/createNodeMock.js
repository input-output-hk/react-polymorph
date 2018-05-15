export const createNodeMock = element => {
  if (element.type === 'input') {
    return {
      selectionStart: null,
      selectionEnd: null,
      focus() {},
      blur() {}
    };
  }
  return null;
}
