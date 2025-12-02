import AddCategories from "./AddCategories";
import EntertainmentCategories from "./EntertainmentCategories";
import FoodCategories from "./FoodCategories";
import { GiftsCategories } from "./GiftsCategories";
import GroceriesCategories from "./GroceriesCategories";
import MedicineCategories from "./MedicineCategories";
import { RentCategories } from "./RentCategories";
import SavingsCategories from "./SavingsCategories";
import TransportCategories from "./TransportCategories";

export const iconsCategories = {
    Food : FoodCategories,
    Transport: TransportCategories,
    Medicine: MedicineCategories,
    Groceries: GroceriesCategories,
    Rent : RentCategories,
    Gifts: GiftsCategories,
    Savings: SavingsCategories,
    Entertainment: EntertainmentCategories,
    Add: AddCategories
}
export type IconKey = keyof typeof iconsCategories;