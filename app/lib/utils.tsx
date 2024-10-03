import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {DateRangeType} from "react-tailwindcss-datepicker/dist/types";
import moment from "moment";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const insideDateRange = (date: Date, range: DateRangeType) => {
  const startDate = moment(range.startDate).unix();
  const endDate = moment(range.endDate).unix();
  if(startDate !== null && endDate !== null) {
    return moment(date).unix() >= startDate && moment(date).unix() <= endDate;
  }
}