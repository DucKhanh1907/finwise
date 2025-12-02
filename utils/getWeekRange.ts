export const getCurrentWeekRange = () => {
  const today = new Date();
  const day = today.getDay(); // 0 (CN) → 6 (T7)

  // Chuẩn hoá để tuần bắt đầu từ Thứ 2 → CN
  const normalized = day === 0 ? 7 : day; // nếu CN (0) → 7

  // Ngày bắt đầu tuần (Thứ 2)
  const start = new Date(today);
  start.setHours(0, 0, 0, 0);
  start.setDate(today.getDate() - (normalized - 1));

  // Ngày kết thúc tuần (Chủ Nhật)
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};


export const getWeeksOfCurrentMonth = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const weeks: { start: Date; end: Date }[] = [];
  let start = new Date(firstDayOfMonth);

  // Nếu ngày đầu tiên của tháng không phải Thứ 2, đưa về Thứ 2 trước đó
  const day = start.getDay() === 0 ? 7 : start.getDay(); // CN=0 → 7
  start.setDate(start.getDate() - (day - 1));
  start.setHours(0, 0, 0, 0);

  while (start <= lastDayOfMonth) {
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    weeks.push({ start: new Date(start), end: new Date(end) });

    // Bắt đầu tuần tiếp theo
    start.setDate(start.getDate() + 7);
  }

  return weeks;
};

