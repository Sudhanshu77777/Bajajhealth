// Fibonacci series up to n terms (n = how many numbers)
export function fibonacci(n) {
  if (!Number.isInteger(n) || n < 1) throw new Error("Invalid fibonacci input");
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const seq = [0, 1];
  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
 return seq.join(",");
}

// Filter primes from array
export function filterPrimes(arr) {
  if (!Array.isArray(arr) || arr.some(x => !Number.isInteger(x))) {
    throw new Error("Input must be array of integers");
  }

  return arr.filter(isPrime).join(",");
}

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

// GCD / HCF using Euclidean algorithm (multiple numbers)
export function gcdMultiple(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) throw new Error("Invalid input");
  if (numbers.some(x => !Number.isInteger(x) || x < 0)) throw new Error("Numbers must be non-negative integers");

  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = gcd(result, numbers[i]);
  }
  return result;
}

function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// LCM of multiple numbers = product / gcd (careful with overflow, but ok for assignment)
export function lcmMultiple(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) throw new Error("Invalid input");
  if (numbers.some(x => !Number.isInteger(x) || x <= 0)) throw new Error("Numbers must be positive integers");

  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = (result * numbers[i]) / gcd(result, numbers[i]);
  }
  return result;
}