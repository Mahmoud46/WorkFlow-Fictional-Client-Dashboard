import { useContext, useState, type ReactNode } from "react";
import { CgClose } from "react-icons/cg";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";
import { TransactionsTable } from "../components/Tables";
import type { IInvoice } from "../interface/Data.interface";
import {
	LuCalendarClock,
	LuCalendarPlus,
	LuCopy,
	LuCopyCheck,
	LuFileX,
	LuWallet,
} from "react-icons/lu";
import { currencySymbols, invoicesStatusColor } from "../constants/constants";
import { parseAmount } from "../utils/parse";

export default function Invoice(): ReactNode {
	const { transactionsController, invoicesController, projectsController } =
		useContext(Context) as IContext;

	const [isCopied, setIsCopied] = useState<boolean>(false);
	const { id } = useParams();
	return (
		<div className="min-w-[300px] w-[90%] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[100px] h-[80dvh] top-30 fixed flex items-start justify-center z-10">
			{invoicesController.include(id as string) && (
				<div className="glass md:w-[70%] max-h-[90%] overflow-auto p-4 rounded-2xl flex gap-2 flex-col">
					<div className="sticky top-0 flex flex-col w-full">
						<div className="flex justify-between items-center w-full">
							<p
								className={`text-sm ${
									invoicesStatusColor[
										invoicesController.getInvoice(id as string).status
									]
								}`}
							>
								{invoicesController.getInvoice(id as string).status}
							</p>
							<Link
								to="/invoices"
								className="glass w-fit h-fit rounded-full p-1 text-base"
							>
								<CgClose />
							</Link>
						</div>
						<div className="">
							<h1 className="text-xl flex gap-2 items-center mb-2 flex-wrap">
								<span>
									{
										projectsController.getProject(
											invoicesController.getInvoice(id as string).project_id
										).title
									}
								</span>
								<span className="glass flex items-center gap-2 py-0 px-2 rounded-full overflow-hidden text-base">
									<i className="not-italic max-w-[150px] overflow-x-auto">
										{invoicesController.getInvoice(id as string).invoice_id}
									</i>

									<button
										className="cursor-pointer"
										onClick={() => {
											navigator.clipboard.writeText(id as string);
											setIsCopied(true);
											setTimeout(() => {
												setIsCopied(false);
											}, 2000);
										}}
									>
										{isCopied ? (
											<LuCopyCheck className="text-green-300" />
										) : (
											<LuCopy className="opacity-70 transition duration-300 hover:opacity-100" />
										)}
									</button>
								</span>
							</h1>
							<div className="flex items-center gap-4 text-sm">
								<div className="flex items-center gap-2">
									<LuCalendarPlus className="text-blue-300" />
									<span>
										{new Date(
											invoicesController.getInvoice(id as string).issue_date
										).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<LuCalendarClock className="text-orange-300" />
									<span>
										{new Date(
											invoicesController.getInvoice(id as string).due_date
										).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</span>
								</div>
							</div>
							<div className="flex gap-2 items-center">
								<LuWallet className="opacity-70" />
								<span className="font-semibold text-lg">
									{
										currencySymbols[
											invoicesController.getInvoice(id as string).currency
										]
									}
									{parseAmount(
										invoicesController.getInvoice(id as string).amount
									)}
								</span>
							</div>
							<div className="">
								<div className="flex justify-end">
									<div className="flex items-center">
										<p
											className={
												transactionsController.getPaidAmountOfTransactions(
													invoicesController.getInvoice(id as string)
														.transaction_ids
												) == invoicesController.getInvoice(id as string).amount
													? "text-green-300 font-semibold"
													: "text-yellow-300 font-semibold"
											}
										>
											{transactionsController
												.getPaidAmountOfTransactions(
													invoicesController.getInvoice(id as string)
														.transaction_ids
												)
												.toLocaleString("en-US", {
													style: "currency",
													currency: "USD",
												})}
										</p>
										<p className="text-sm opacity-70">
											<span className="ml-1 text-xs">/</span>
											{parseAmount(
												invoicesController.getInvoice(id as string).amount
											)}
										</p>
									</div>
								</div>
								<div className="w-full glass rounded-full h-1.5">
									<div
										className="bg-white h-full rounded-full"
										style={{
											width: `${
												(
													(transactionsController.getCountOfTransactions(
														invoicesController.getInvoice(id as string)
															.transaction_ids
													) /
														invoicesController.getInvoice(id as string)
															.transaction_ids.length) *
													100
												).toFixed(0) ?? 0
											}%`,
										}}
									/>
								</div>
							</div>
						</div>
					</div>
					<TransactionsTable
						invoice={invoicesController.getInvoice(id as string) as IInvoice}
					/>
				</div>
			)}

			{!invoicesController.include(id as string) && (
				<div className="glass w-fit max-h-[90%] overflow-auto p-4 rounded-2xl flex gap-2 flex-col">
					<div className="sticky top-0 flex w-full justify-end">
						<Link
							to="/invoices"
							className="glass w-fit h-fit rounded-full p-1 text-base"
						>
							<CgClose />
						</Link>
					</div>
					<div className="flex flex-col items-center p-10 gap-4">
						<LuFileX className="text-4xl" />
						<p className="text-sm max-w-[400px] text-center">
							The invoice you’re looking for doesn’t exist or has been removed.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
