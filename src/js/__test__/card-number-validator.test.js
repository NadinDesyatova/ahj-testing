import { cardNumberValidator } from "../card-number-validator";

test("should throw error if card-number length less then 13", () => {
  const expected = "Incorrect card number";

  const incorrectNumber = function () {
    cardNumberValidator("");
  };

  expect(incorrectNumber).toThrow(expected);
});

test("should throw error if card-number length more then 19", () => {
  const expected = "Incorrect card number";

  const incorrectNumber = function () {
    cardNumberValidator("01234567890123456789");
  };

  expect(incorrectNumber).toThrow(expected);
});

test("should throw error if card-number length is 17", () => {
  const expected = "Incorrect card number";

  const incorrectNumber = function () {
    cardNumberValidator("01234567890123456");
  };

  expect(incorrectNumber).toThrow(expected);
});

test("should throw error if the card-number was not checked by the Luhn algorithm", () => {
  const expected = "Incorrect card number";

  const incorrectNumber = function () {
    cardNumberValidator("5499694592545839");
  };

  expect(incorrectNumber).toThrow(expected);
});

test("should be true if the card-number was checked by the Luhn algorithm", () => {
  const result = cardNumberValidator("3533036491804179");

  expect(result).toBe(true);
});
