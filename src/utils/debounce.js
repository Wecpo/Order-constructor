export const debounce = (func, delay) => {
  let timeoutId = 0;

  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
};
