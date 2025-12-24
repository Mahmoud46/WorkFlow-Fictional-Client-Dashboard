import type { IconType } from "react-icons";
import type {
	TInvoiceStatus,
	TProjectStatus,
	TTransactionStatus,
} from "../interface/Data.interface";
import {
	LuHouse,
	LuFolder,
	LuUsers,
	LuCreditCard,
	LuFileText,
} from "react-icons/lu";

export const NAV_ITEMS: { title: string; icon: IconType; path: string }[] = [
	{ title: "Home", icon: LuHouse, path: "/" },
	{ title: "Projects", icon: LuFolder, path: "/projects" },
	{ title: "Freelancers", icon: LuUsers, path: "/freelancers" },
	{ title: "Payments & Invoices", icon: LuCreditCard, path: "/invoices" },
	{ title: "Proposals", icon: LuFileText, path: "/pending-proposals" },
];

export const monthsAbbName: string[] = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export const monthsFullName: Record<string, string> = {
	Jan: "January",
	Feb: "February",
	Mar: "March",
	Apr: "April",
	May: "May",
	Jun: "June",
	Jul: "July",
	Aug: "August",
	Sep: "September",
	Oct: "October",
	Nov: "November",
	Dec: "December",
};

export const currencySymbols: Record<string, string> = {
	USD: "$", // US Dollar
	EUR: "€", // Euro
	JPY: "¥", // Japanese Yen
	GBP: "£", // British Pound Sterling
	CNY: "¥", // Chinese Yuan Renminbi
	AUD: "A$", // Australian Dollar
	CAD: "C$", // Canadian Dollar
	CHF: "CHF", // Swiss Franc
	HKD: "HK$", // Hong Kong Dollar
	NZD: "NZ$", // New Zealand Dollar
};

export const currencyRates: Record<string, number> = {
	USD: 1, // 1 USD = 1 USD
	EUR: 1.17, // 1 EUR = 1.17 USD
	JPY: 0.0068, // 1 JPY = 0.0068 USD
	GBP: 1.26, // 1 GBP = 1.26 USD
	CNY: 0.14, // 1 CNY = 0.14 USD
	AUD: 0.64, // 1 AUD = 0.64 USD
	CAD: 0.75, // 1 CAD = 0.75 USD
	CHF: 1.1, // 1 CHF = 1.10 USD
	HKD: 0.13, // 1 HKD = 0.13 USD
	NZD: 0.6, // 1 NZD = 0.60 USD
};

export const projectStatusColor: Record<TProjectStatus, string> = {
	Completed: "text-green-300",
	"In Progress": "text-blue-300",
	Pending: "text-yellow-300",
};

export const invoicesStatusColor: Record<TInvoiceStatus, string> = {
	Paid: "text-green-300",
	Pending: "text-yellow-300",
};

export const transactionStatusColor: Record<TTransactionStatus, string> = {
	Completed: "text-green-300",
	Pending: "text-yellow-300",
};
