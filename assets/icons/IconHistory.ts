import EntertainmentHistory from "./EntertainmentHistory";
import FoodHistory from "./FoodHistory";
import GiftsHistory from "./GiftsHistory";
import GroceriesHistory from "./GroceriesHistory";
import MedicineHistory from "./MedicineHistory";
import RentHistory from "./RentHistory";
import SalaryHistory from "./SalaryHistory";
import SavingsHistory from "./SavingsHistory";
import TransportHistory from "./TransportHistory";

export const icons = {
  Salary: SalaryHistory,
  Groceries : GroceriesHistory,
  Rent: RentHistory,
  Food: FoodHistory,
  Transport: TransportHistory,
  Gifts: GiftsHistory,
  Entertainmen: EntertainmentHistory,
  Medicinne: MedicineHistory,
  Savings: SavingsHistory,
};
export type IconKey = keyof typeof icons;