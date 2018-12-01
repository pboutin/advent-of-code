let divider, b, c;
let primes = 0;

// Get the bounds from the input
b = 93;
c = b;
b *= 100;
b += 100000;
c = b;
c += 17000;

for (let value = b; value <= c; value += 17) {
  divider = 2

  do {
    divider++
  } while (value % divider !== 0)

  if (value !== divider) primes++;
}

console.log(primes)
