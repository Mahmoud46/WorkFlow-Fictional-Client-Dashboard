import { useContext, useState, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { ProposalsTabel } from "../components/Tables";

import type { IContext } from "../interface/Context.interface";
import { Context } from "../context/Context";
import type { TPropsalStatus } from "../interface/Data.interface";
import { LuFilter } from "react-icons/lu";

export default function Proposals(): ReactNode {
	const { proposalsController } = useContext(Context) as IContext;
	const [proposalStatus, setProposalStatus] = useState<"All" | TPropsalStatus>(
		"Pending"
	);
	return (
		<>
			<div className="flex gap-2 flex-col w-full glass rounded-2xl p-2 sm:p-4 min-h-[90dvh]">
				<div className="flex gap-2 items-center justify-between">
					<h1 className="text-4xl">{proposalStatus} Proposals</h1>
					<div className="glass relative flex pr-2 rounded-full text-base cursor-pointer">
						<LuFilter className="absolute top-[50%] translate-y-[-50%] left-2 opacity-70 text-base" />
						<select
							name=""
							id=""
							className="py-2 outline-0 pl-7 cursor-pointer text-sm"
							onChange={(e) =>
								setProposalStatus(e.target.value as "All" | TPropsalStatus)
							}
							value={proposalStatus}
						>
							<option value="All" className="text-gray-950">
								All
							</option>
							<option value="Pending" className="text-gray-950">
								Pending
							</option>
							<option value="Accepted" className="text-gray-950">
								Accepted
							</option>
						</select>
					</div>
				</div>

				{proposalStatus == "Pending" && (
					<ProposalsTabel proposals={proposalsController.pending} />
				)}
				{proposalStatus == "Accepted" && (
					<ProposalsTabel proposals={proposalsController.accepted} />
				)}
				{proposalStatus == "All" && (
					<ProposalsTabel proposals={proposalsController.proposals} />
				)}
			</div>
			<Outlet />
		</>
	);
}
