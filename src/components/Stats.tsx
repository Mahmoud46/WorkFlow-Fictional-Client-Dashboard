import { useContext, type ReactNode } from "react";
import {
	LuArrowDown,
	LuCreditCard,
	LuFileClock,
	LuFolderOpen,
	LuUsers,
} from "react-icons/lu";

import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";
import { Link } from "react-router-dom";

export default function Stats(): ReactNode {
	const { projectsController, transactionsController, proposalsController } =
		useContext(Context) as IContext;

	return (
		<div className="flex gap-2 overflow-auto xl:flex-wrap">
			<div className="flex flex-none items-center gap-4 glass p-1 rounded-2xl min-w-[195px] max-w-[200px]">
				<LuFolderOpen className="ml-1 text-xl flex-none" />
				<div className="flex-1">
					<p className="text-xs opacity-70">Active Projects</p>
					<p className="font-medium">{projectsController?.active?.length}</p>
					<p className="text-xs">
						{projectsController && (
							<span className="text-green-300">
								{(
									((projectsController?.active?.length /
										projectsController?.projects.length) as number) * 100
								).toFixed(0)}
								%
							</span>
						)}{" "}
						of projects
					</p>
				</div>
				<Link
					to={"/projects"}
					className="self-start rotate-225 text-base glass rounded-full cursor-pointer p-1"
				>
					<LuArrowDown />
				</Link>
			</div>
			<div className="flex flex-none items-center gap-4 glass p-1 rounded-2xl min-w-[195px] max-w-[200px]">
				<LuUsers className="ml-1 text-xl flex-none" />
				<div className="flex-1">
					<p className="text-xs opacity-70">Hired Freelancers</p>
					<p className="">
						{projectsController.projectsFreelancers.total_freelancers}
					</p>
					<p className="text-xs">
						<span className="text-green-300">
							+{projectsController.projectsFreelancers.recently_hired}
						</span>{" "}
						this month
					</p>
				</div>
				<Link
					to={"/freelancers"}
					className="self-start rotate-225 text-base glass rounded-full cursor-pointer p-1"
				>
					<LuArrowDown />
				</Link>
			</div>
			<div className="flex  flex-none items-center gap-4 glass p-1 rounded-2xl min-w-[195px] max-w-[200px]">
				<LuCreditCard className="ml-1 text-xl flex-none" />
				<div className="flex-1">
					<p className="text-xs opacity-70">Total Spent</p>
					<p className="">
						$
						{new Intl.NumberFormat("en", {
							notation: "compact",
							maximumFractionDigits: 1,
						}).format(transactionsController.expenses.total as number)}
					</p>
					<p className="text-xs">
						<span className="text-green-300">
							+
							{(
								((transactionsController.expenses.current_month as number) /
									(transactionsController.expenses.total as number)) *
								100
							).toFixed(0)}
							%
						</span>{" "}
						this month
					</p>
				</div>
				<Link
					to={"/invoices"}
					className="self-start rotate-225 text-base glass rounded-full cursor-pointer p-1"
				>
					<LuArrowDown />
				</Link>
			</div>
			<div className="flex flex-none items-center gap-4 glass p-1 rounded-2xl min-w-[195px] max-w-[200px]">
				<LuFileClock className="ml-1 text-xl flex-none" />
				<div className="flex-1">
					<p className="text-xs opacity-70">Pending Proposals</p>
					<p className="">
						{proposalsController.pendingProposalsStat.total_proposals}
					</p>
					<p className="text-xs">
						<span className="text-green-300">
							+{proposalsController.pendingProposalsStat.recent_proposals}
						</span>{" "}
						this month
					</p>
				</div>
				<Link
					to={"/pending-proposals"}
					className="self-start rotate-225 text-base glass rounded-full cursor-pointer p-1"
				>
					<LuArrowDown />
				</Link>
			</div>
		</div>
	);
}
