export function cardNumberValidator(cardNumber) {
  const cardNumbersSum = cardNumber.toString();
  const digitsNumber = cardNumber.length;
  if (
    digitsNumber < 13 ||
    digitsNumber > 19 ||
    [17, 18].includes(digitsNumber)
  ) {
    throw new Error("Incorrect card number");
  }
  let sum = 0;
  const parity = cardNumbersSum.length % 2;
  for (let i = 0; i < cardNumbersSum.length; i += 1) {
    let digit = Number(cardNumbersSum[i]);
    if (i % 2 === parity) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  if (Number(sum % 10) === 0) {
    return true;
  } else {
    throw new Error("Incorrect card number");
  }
}
