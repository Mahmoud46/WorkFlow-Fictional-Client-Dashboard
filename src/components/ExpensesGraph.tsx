import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";

import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from "recharts";
import { monthsFullName } from "../constants/constants";
import { parseAmount } from "../utils/parse";
import { BiBarChart } from "react-icons/bi";
import { LuTrendingDown, LuTrendingUp } from "react-icons/lu";

export default function ExpensesGraph(): ReactNode {
	const { transactionsController } = useContext(Context) as IContext;

	return (
		<>
			<div className="flex p-4 pb-0 bg-theme-foreground w-fit h-fit rounded-xl glass flex-col lg:flex-row">
				<div className="flex-1 flex flex-col gap-2">
					<h2 className="text-base font-semibold ">
						Monthly Expenses Overview (2025)
					</h2>

					<p className="text-sm ">
						In 2025, monthly expenses averaged around $
						{parseAmount(transactionsController.expensesStats.avg)}, with{" "}
						{monthsFullName[transactionsController.expensesStats.peak.month]}{" "}
						recording the highest spending and{" "}
						{monthsFullName[transactionsController.expensesStats.lowest.month]}{" "}
						the lowest.
					</p>

					<div className="flex-1 max-h-[200px] min-h-[100px] aspect-5/2">
						{transactionsController.monthlyExpenses.length > 0 && (
							<ResponsiveContainer height={"100%"} width={"100%"}>
								<LineChart data={transactionsController.monthlyExpenses}>
									<CartesianGrid
										strokeOpacity={"20%"}
										strokeDasharray={"3 3"}
									/>
									<XAxis dataKey={"month"} tick={{ fontSize: 10 }} />
									<Tooltip
										contentStyle={{
											backgroundColor: "#1e293b70",
											border: "1px solid #1e293b50",
											color: "#f8fafc",
											borderRadius: "10px",
										}}
										wrapperStyle={{
											borderRadius: "12px",
										}}
										labelStyle={{
											color: "#ffffff",
											fontWeight: "bold",
										}}
										formatter={(value) => {
											return [`$${parseAmount(value as number)}`, "EXP"]; // [value, label]
										}}
										labelFormatter={(label) => `${monthsFullName[label]}`}
									/>
									<Line
										type={"monotone"}
										dataKey={"amount"}
										stroke="#ffffff"
										strokeWidth={"2px"}
									/>
								</LineChart>
							</ResponsiveContainer>
						)}
					</div>
				</div>

				<div className="flex flex-row lg:flex-col gap-2 pb-2 lg:pl-2 flex-wrap">
					<div className="flex items-center gap-2 glass p-1 rounded-xl w-fit min-w-[80px] sm:min-w-[100px]">
						<LuTrendingUp className="text-green-400" />
						<div className="">
							<p className="text-xs opacity-70">
								{
									monthsFullName[
										transactionsController.expensesStats.peak.month
									]
								}
							</p>
							<p className="text-sm">
								${parseAmount(transactionsController.expensesStats.peak.amount)}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 glass p-1 rounded-xl w-fit min-w-[80px] sm:min-w-[100px]">
						<LuTrendingDown className="text-red-400" />
						<div className="">
							<p className="text-xs opacity-70">
								{
									monthsFullName[
										transactionsController.expensesStats.lowest.month
									]
								}
							</p>
							<p className="text-sm">
								$
								{parseAmount(
									transactionsController.expensesStats.lowest.amount
								)}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 glass p-1 rounded-xl w-fit min-w-[80px] sm:min-w-[100px]">
						<BiBarChart className="text-yellow-300 flex-none" />
						<div className="flex-none">
							<p className="text-xs opacity-70">Monthly Average</p>
							<p className="text-sm">
								${parseAmount(transactionsController.expensesStats.avg)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
