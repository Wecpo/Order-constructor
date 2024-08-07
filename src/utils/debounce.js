export function debouce(func, delay) {
  let timeoutId = 0;
  return function () {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(func, delay);
  };
}
