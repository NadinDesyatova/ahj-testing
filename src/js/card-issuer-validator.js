const issuers = [
  { name: "amex", start: [34, 37], digitsNumber: [15] },
  { name: "diners", start: [36], digitsNumber: [14] },
  {
    name: "discover",
    start: [6011, "622126-622925", 644, 645, 646, 647, 648, 649, 65],
    digitsNumber: [16, 19],
  },
  { name: "jcb", start: ["3528-3589"], digitsNumber: [16, 19] },
  {
    name: "mastercard",
    start: [51, 52, 53, 54, 55, "222100-272099"],
    digitsNumber: [16],
  },
  { name: "visa", start: [4], digitsNumber: [13, 16, 19] },
  { name: "mir", start: ["22"], digitsNumber: [16] },
];

export function cardIssuerValidator(cardNumber) {
  const strCardNumber = String(cardNumber);
  const firstSixDigits = Number([...strCardNumber].slice(0, 6).join(""));
  const firstFourDigits = Number([...strCardNumber].slice(0, 4).join(""));

  const result = issuers.find((issuer) => {
    const isCorrectNumber = issuer.digitsNumber.includes(strCardNumber.length);
    return issuer.start.some((start) => {
      if (typeof start === "string") {
        if (strCardNumber.startsWith("622") && start === "622126-622925") {
          return (
            firstSixDigits >= 622126 &&
            firstSixDigits <= 622925 &&
            isCorrectNumber
          );
        }

        if (strCardNumber.startsWith("35") && start === "3528-3589") {
          return (
            firstFourDigits >= 3528 &&
            firstFourDigits <= 3589 &&
            isCorrectNumber
          );
        }

        if (strCardNumber.startsWith("2") && start === "222100-272099") {
          return (
            firstSixDigits >= 222100 &&
            firstSixDigits <= 272099 &&
            isCorrectNumber
          );
        }

        if (strCardNumber.startsWith("2") && start === "22") {
          return firstSixDigits < 222100 && isCorrectNumber;
        }
      } else {
        return strCardNumber.startsWith(String(start)) && isCorrectNumber;
      }
    });
  });
  if (result) {
    return result.name;
  } else {
    throw new Error("Incorrect card number");
  }
}
