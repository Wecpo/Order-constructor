export function debounce(func, delay) {
  let timeoutId = 0;

  return () => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(func, delay);
  };
}
