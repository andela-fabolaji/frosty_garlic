const calculatePrime = n => {
  let prime = 1;
  for (let i = n; i > 1; i--) {
    let isPrime = true;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      prime = i;
      break;
    }
  }
  return prime;
};

module.exports = calculatePrime;