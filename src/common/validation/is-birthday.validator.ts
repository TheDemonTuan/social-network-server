export const isBirthDay = (day: number, month: number, year: number) => {
  const now = new Date();

  if (year < 1900 || year > now.getFullYear()) return "Năm không hợp lệ.";

  // Check if the month is valid.

  if (month < 1 || month > 12) {
    return "Tháng không hợp lệ.";
  }

  // Check if the day is valid.

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month == 2 && year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
    daysInMonth[1] = 29;
  }
  if (day < 1 || day > daysInMonth[month - 1]) {
    return "Ngày không hợp lệ.";
  }

  // Check if the birthday is in the past.

  const birthday = new Date(year, month - 1, day);

  if (birthday > now) {
    return "Ngày sinh không thể lớn hơn ngày hiện tại.";
  }

  return '';
};
