module.exports = function countdown(tick) {
  let count = 3;
  tick(count);
  let timer = setInterval(_ => {
    count--;
    if (count === -1) {
      tick(`⏱️`);
      clearInterval(timer);
    } else tick(count);
  }, 1000);
};
