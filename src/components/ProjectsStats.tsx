import { useContext, type ReactNode } from "react";
import {
	LuFolder,
	LuFolderCheck,
	LuFolderOpen,
	LuWallet,
} from "react-icons/lu";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";

export default function ProjectsStats(): ReactNode {
	const { projectsController, transactionsController } = useContext(
		Context
	) as IContext;

	return (
		<div className="flex gap-2 overflow-auto">
			<div className="flex items-center gap-4 glass p-1 rounded-2xl flex-1 min-w-fit max-w-[180px]">
				<LuFolder className="ml-1 text-xl flex-none" />
				<div className="flex-1">
					<p className="text-xs opacity-70">Total Projects</p>
					<p className="font-medium">
						{projectsController?.countTotal() as number}
					</p>
				</div>
			</div>
			<div className="flex items-center gap-4 glass p-1 rounded-2xl flex-1 min-w-fit max-w-[180px]">
				<LuFolderOpen className="ml-1 text-xl flex-none" />
				<div className="flex-1">
					<p className="text-xs opacity-70">Active Projects</p>
					<p className="font-medium">
						{projectsController?.countActive() as number}
					</p>
					<p className="text-xs">
						<span className="text-green-300">
							{(
								((projectsController?.countActive() as number) /
									(projectsController?.countTotal() as number)) *
								100
							).toFixed(0) ?? "_"}
							%
						</span>{" "}
						of total project
					</p>
				</div>
			</div>
			<div className="flex items-center gap-4 glass p-1 rounded-2xl flex-1 min-w-fit max-w-[180px]">
				<LuFolderCheck className="ml-1 text-xl flex-none" />
				<div className="flex-1">
					<p className="text-xs opacity-70">Completed Projects</p>
					<p className="font-medium">
						{projectsController?.countCompleted() as number}
					</p>
					<p className="text-xs">
						<span className="text-green-300">
							{(
								((projectsController?.countCompleted() as number) /
									(projectsController?.countTotal() as number)) *
								100
							).toFixed(0) ?? "_"}
							%
						</span>{" "}
						of total project
					</p>
				</div>
			</div>
			<div className="flex items-center gap-4 glass p-1 rounded-2xl flex-1 min-w-fit max-w-[180px]">
				<LuWallet className="ml-1 text-xl flex-none" />
				<div className="flex-1">
					<p className="text-xs opacity-70">Total Allocated Budget</p>
					<p className="">
						$
						{new Intl.NumberFormat("en", {
							notation: "compact",
							maximumFractionDigits: 1,
						}).format(projectsController?.totalBudgetUSD() as number)}
					</p>
					<p className="text-xs pr-2">
						<span className="text-green-300">
							{(
								((transactionsController.expenses.total as number) /
									(projectsController?.totalBudgetUSD() as number)) *
								100
							).toFixed(0)}
							%
						</span>{" "}
						spent across all projects
					</p>
				</div>
			</div>
		</div>
	);
}
