import { currencyRates, monthsAbbName } from "../constants/constants";
import type { ITransaction } from "../interface/Data.interface";
import { invoicesController } from "./Invoices.class";

interface IExpenses {
	total: number;
	current_month: number;
}

interface IMonthyExpense {
	month: string;
	amount: number;
}

interface IExpensesStats {
	peak: IMonthyExpense;
	lowest: IMonthyExpense;
	avg: number;
}

export class Transactions {
	transactions: ITransaction[];
	protected transactionsIds: string[];
	expenses: IExpenses;
	monthlyExpenses: IMonthyExpense[];
	expensesStats: IExpensesStats;
	protected indexedTransactions: Record<string, ITransaction>;

	constructor() {
		this.transactions = [];
		this.transactionsIds = [];
		this.expenses = { total: 0, current_month: 0 };
		this.monthlyExpenses = [];
		this.expensesStats = {
			peak: { month: "", amount: 0 },
			lowest: { month: "", amount: 0 },
			avg: 0,
		};
		this.indexedTransactions = {};
	}

	init(transactions: ITransaction[]) {
		this.transactions = transactions;
		this.transactionsIds = this.up2NowTransactions();
		this.expenses = this.getExpenses();
		this.monthlyExpenses = this.getMonthlyExpenses(2025); // Show data for 2025
		this.expensesStats = this.getExpensesStats();
		this.indexedTransactions = this.getIndexedTransactions();
	}

	protected up2NowTransactions(): string[] {
		const transactionsIds: string[] = [];
		const now = new Date();

		for (const transaction of this.transactions) {
			const transactionDate = new Date(transaction.date);
			if (now >= transactionDate) {
				transactionsIds.push(transaction.transaction_id);
			}
		}
		return transactionsIds;
	}

	getCountOfTransactions(trasnactionsIds: string[]): number {
		let count: number = 0;
		for (const id of trasnactionsIds)
			if (this.transactionsIds.includes(id)) count += 1;
		return count;
	}

	getPaidAmountOfTransactions(trasnactionsIds: string[]): number {
		let amount: number = 0;
		for (const id of trasnactionsIds)
			if (this.transactionsIds.includes(id))
				amount +=
					this.indexedTransactions[id].amount *
					currencyRates[this.indexedTransactions[id].currency];
		return amount;
	}

	protected getExpenses(): IExpenses {
		let totalAmount: number = 0;
		let currentMonthAmount: number = 0;

		const now = new Date();
		const currentYear = now.getFullYear();
		const currentMonth = now.getMonth();

		for (const transaction of this.transactions) {
			const transactionData = new Date(transaction.date);
			if (now > transactionData) {
				totalAmount += transaction.amount;
				const [year, month] = transaction.date.split("-");
				if (+year == currentYear && +month == currentMonth + 1)
					currentMonthAmount += transaction.amount;
			}
		}
		return { total: totalAmount, current_month: currentMonthAmount };
	}

	protected getMonthlyExpenses(
		currentYear: number = new Date().getFullYear()
	): IMonthyExpense[] {
		const totalExpensesPerMonth: Record<string, number> = {};

		const now = new Date();

		for (const transaction of this.transactions) {
			const transactionData = new Date(transaction.date);
			if (now > transactionData) {
				const [year, month] = transaction.date.split("-");
				if (+year == currentYear) {
					if (totalExpensesPerMonth[monthsAbbName[+month - 1]])
						totalExpensesPerMonth[monthsAbbName[+month - 1]] +=
							transaction.amount;
					else
						totalExpensesPerMonth[monthsAbbName[+month - 1]] =
							transaction.amount;
				}
			}
		}
		return Object.entries(totalExpensesPerMonth)
			.map(([month, amount]) => ({
				month,
				amount,
			}))
			.sort(
				(a, b) =>
					monthsAbbName.indexOf(a.month) - monthsAbbName.indexOf(b.month)
			);
	}

	protected getExpensesStats(): IExpensesStats {
		let peak: { month: string; amount: number } = {
			month: this.monthlyExpenses[0].month,
			amount: this.monthlyExpenses[0].amount,
		};
		let lowest: { month: string; amount: number } = {
			month: this.monthlyExpenses[0].month,
			amount: this.monthlyExpenses[0].amount,
		};
		let avg: number = 0;

		for (const month of this.monthlyExpenses) {
			if (peak.amount <= month.amount)
				peak = { month: month.month, amount: month.amount };
			if (lowest.amount >= month.amount)
				lowest = { month: month.month, amount: month.amount };

			avg += month.amount / this.monthlyExpenses.length;
		}

		return { peak: peak, lowest: lowest, avg: +avg.toFixed(0) };
	}

	protected getIndexedTransactions(): Record<string, ITransaction> {
		const indexedTransactions: Record<string, ITransaction> = {};
		for (const transaction of this.transactions)
			indexedTransactions[transaction.transaction_id] = transaction;

		return indexedTransactions;
	}

	getTransaction(transactionId: string): ITransaction {
		return this.indexedTransactions[transactionId];
	}

	isPaid(transactionId: string) {
		return this.transactionsIds.includes(transactionId);
	}

	getProjectExpensesUp2Now(projectId: string) {
		let totalExpenses: number = 0;

		for (const transactionId of this.transactionsIds) {
			if (
				invoicesController.getInvoice(
					this.indexedTransactions[transactionId].invoice_id
				).project_id == projectId
			)
				totalExpenses += this.indexedTransactions[transactionId].amount;
		}

		return totalExpenses;
	}
}

export const transactionsController = new Transactions();
