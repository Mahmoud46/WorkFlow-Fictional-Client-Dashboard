import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";
import Stats from "../components/Stats";
import NowDateTime from "../components/NowDateTime";
import ExpensesGraph from "../components/ExpensesGraph";
import ProjectsStatusPieChartContainer from "../components/ProjectsStatusPieChartContainer";
import RecentActivitiesContainer from "../components/RecentActivitiesContainer";
import { LuArrowDown } from "react-icons/lu";
import {
	ActiveProjectsTable,
	PendingProposalsOverviewTable,
	UpComingPendingInvoicesViewTable,
} from "../components/Tables";
import { Link } from "react-router-dom";

export default function Home(): ReactNode {
	const { profileController, projectsController } = useContext(
		Context
	) as IContext;
	return (
		<>
			{projectsController.projects && (
				<div className="gap-2 glass rounded-2xl flex w-full p-2 sm:p-4">
					<div className="flex flex-1 max-w-full w-fit flex-col gap-2">
						<h1 className="text-2xl">
							Welcome back
							<br />
							<span className="text-4xl">
								{profileController.profileView.name}
							</span>
						</h1>
						<Stats />
						<div className="flex flex-col gap-2">
							<div className="flex gap-2 flex-col md:flex-row">
								<div className="flex-1">
									<ExpensesGraph />
								</div>
								<div className="max-w-[350px] flex xl:hidden">
									<ProjectsStatusPieChartContainer />
								</div>
							</div>
							<div className="glass rounded-2xl w-full">
								<div className="flex p-2 w-full justify-between">
									<p className="text-base font-semibold px-2">
										Active Projects
									</p>
									<Link
										to={"/projects"}
										className="self-start rotate-225 text-base glass rounded-full cursor-pointer p-1"
									>
										<LuArrowDown />
									</Link>
								</div>
								<div className="flex-none overflow-x-auto max-h-[250px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
									<ActiveProjectsTable />
								</div>
							</div>
							<div className="flex gap-2 flex-wrap">
								<div className="glass flex-1.5 h-full max-h-[300px] rounded-xl overflow-hidden">
									<div className="flex p-2 w-full justify-between">
										<p className="text-base font-semibold px-2">
											Pending Proposals
										</p>
										<Link
											to={"/pending-proposals"}
											className="self-start rotate-225 text-base glass rounded-full cursor-pointer p-1"
										>
											<LuArrowDown />
										</Link>
									</div>
									<PendingProposalsOverviewTable />
								</div>
								<div className="glass flex-1 h-full max-h-[300px] rounded-xl overflow-hidden min-w-[300px]">
									<div className="flex p-2 w-full justify-between">
										<p className="text-base font-semibold px-2">Invoices</p>
										<Link
											to={"/invoices"}
											className="self-start rotate-225 text-base glass rounded-full cursor-pointer p-1"
										>
											<LuArrowDown />
										</Link>
									</div>
									<UpComingPendingInvoicesViewTable />
								</div>
							</div>
						</div>
					</div>
					<div className="max-w-[350px] gap-2 hidden xl:flex flex-col flex-none">
						<NowDateTime />
						<ProjectsStatusPieChartContainer />
						<RecentActivitiesContainer />
					</div>
				</div>
			)}
		</>
	);
}
