import { cardIssuerValidator } from "../card-issuer-validator";

test("should throw error if the card-number is incorrect", () => {
  const expected = "Incorrect card number";

  const incorrectNumber = function () {
    cardIssuerValidator("0123456789012345");
  };

  expect(incorrectNumber).toThrow(expected);
});

test.each([
  { cardNumber: 346311427961754, name: "amex" },
  { cardNumber: 36657076713903, name: "diners" },
  { cardNumber: 6011186669126733, name: "discover" },
  { cardNumber: 3533084113739746, name: "jcb" },
  { cardNumber: 2720990013206187, name: "mastercard" },
  { cardNumber: 4532937720092172, name: "visa" },
  { cardNumber: 2202200223948454, name: "mir" },
])(
  "should return issure name '$name' if the card-number '$cardNumber' was checked by the validator",
  ({ cardNumber, name }) => {
    const result = cardIssuerValidator(cardNumber);

    expect(result).toBe(name);
  },
);
