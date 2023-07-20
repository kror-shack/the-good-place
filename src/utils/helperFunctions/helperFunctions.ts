export function getCurrentDate(): string {
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const year = String(currentDate.getFullYear()).slice(-2);

  return `${day}-${month}-${year}`;
}

export function numberToWord(number: number): string {
  const numberWords = ["zero", "one", "two", "three", "four", "five"];

  if (number >= 0 && number <= 5) {
    return numberWords[number];
  } else {
    throw new Error("Invalid number. The number should be between 0 and 5.");
  }
}
