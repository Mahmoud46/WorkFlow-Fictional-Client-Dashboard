import { useContext, useState, type ReactNode } from "react";
import { Outlet } from "react-router-dom";

import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";
import { InvoicesTable } from "../components/Tables";
import type { TInvoiceStatus } from "../interface/Data.interface";
import { LuFilter } from "react-icons/lu";

export default function Invoices(): ReactNode {
	const [invoicesStatusSelected, setInvoicesStatusSelected] = useState<
		"All" | TInvoiceStatus
	>("All");
	const { invoicesController } = useContext(Context) as IContext;
	return (
		<>
			<div className="gap-4 flex-col glass rounded-2xl flex w-full p-2 sm:p-4 min-h-[90dvh]">
				<div className="flex gap-2 items-center justify-between">
					<h1 className="text-3xl sm:text-4xl">Payments and Invoices</h1>
					<div className="glass relative flex pr-2 rounded-full text-base cursor-pointer">
						<LuFilter className="absolute top-[50%] translate-y-[-50%] left-2 opacity-70 text-base" />
						<select
							name=""
							id=""
							className="py-2 outline-0 pl-7 cursor-pointer text-sm"
							onChange={(e) =>
								setInvoicesStatusSelected(
									e.target.value as "All" | TInvoiceStatus
								)
							}
						>
							<option value="All" className="text-gray-950">
								All
							</option>
							<option value="Paid" className="text-gray-950">
								Paid
							</option>
							<option value="Pending" className="text-gray-950">
								Pending
							</option>
						</select>
					</div>
				</div>

				<InvoicesTable
					invoices={invoicesController.invoices.filter((invoice) =>
						invoicesStatusSelected == "All"
							? invoice
							: invoice.status == invoicesStatusSelected
					)}
				/>
			</div>
			<Outlet />
		</>
	);
}
