export default function calculatePercentage(num1, num2) {
  if (num2 === 0) {
    return 0;
  }

  return Math.round((num1 / num2) * 100);
}
