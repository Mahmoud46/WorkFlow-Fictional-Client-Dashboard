import { useContext, useState, type ReactNode } from "react";
import { ProjectsTable } from "../components/Tables";
import type { TProjectStatus } from "../interface/Data.interface";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";
import FilterProjects from "../components/Filters";
import { DisplayViewListGrid } from "../components/DisplayView";
import { Link } from "react-router-dom";
import {
	LuArrowDown,
	LuCalendarClock,
	LuCalendarPlus,
	LuWallet,
} from "react-icons/lu";
import { currencySymbols, projectStatusColor } from "../constants/constants";
import { parseAmount } from "../utils/parse";
import ProjectsStats from "../components/ProjectsStats";
import { getProgressPercentageWithRespect2Date } from "../utils/date";

export default function Projects(): ReactNode {
	const [projectStatus, setProjectStatus] = useState<TProjectStatus | "All">(
		"All"
	);
	const [isGrid, setIsGrid] = useState<boolean>(false);
	const { projectsController, freelancersController } = useContext(
		Context
	) as IContext;

	return (
		<div className="flex gap-2 flex-col w-full glass rounded-2xl p-2 sm:p-4 min-h-[90dvh]">
			<div className="flex flex-col gap-2">
				<h1 className="text-4xl">Projects</h1>
				<ProjectsStats />
				<div className="flex items-center gap-2 justify-end">
					<FilterProjects
						setProjectStatus={setProjectStatus}
						projectStatus={projectStatus}
					/>
					<DisplayViewListGrid isGrid={isGrid} setIsGrid={setIsGrid} />
				</div>
			</div>

			{!isGrid && projectsController && (
				<ProjectsTable
					projects={projectsController?.projects.filter((project) =>
						projectStatus == "All" ? project : project.status == projectStatus
					)}
				/>
			)}
			{isGrid && projectsController && (
				<div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
					{projectsController.projects
						.filter((project) =>
							projectStatus == "All" ? project : project.status == projectStatus
						)
						.map((project, i) => (
							<div
								key={i}
								className="glass p-1 pl-2 rounded-xl overflow-hidden"
							>
								<div className="flex w-full justify-between">
									<span
										className={`text-xs ${projectStatusColor[project.status]}`}
									>
										{project.status}
									</span>
									<Link
										to={`/projects/${project.project_id}`}
										className="self-start rotate-225 text-sm glass rounded-full cursor-pointer p-1"
									>
										<LuArrowDown />
									</Link>
								</div>
								<div className="flex flex-col">
									<Link
										to={`/projects/${project.project_id}`}
										className="text-lg line-clamp-1"
									>
										{project.title}
									</Link>
									<p className="line-clamp-2 text-sm opacity-70">
										{project.description}
									</p>
									<div className="flex text-xs gap-2 items-center rounded-full overflow-hidden mt-2 mb-1">
										<div className="flex items-center gap-1">
											<LuCalendarPlus className="text-blue-300" />
											<span>
												{new Date(project.start_date).toLocaleDateString(
													"en-US",
													{
														year: "numeric",
														month: "short",
														day: "numeric",
													}
												)}
											</span>
										</div>
										<div className="flex items-center gap-1">
											<LuCalendarClock className="text-orange-300" />
											<span>
												{new Date(project.due_date).toLocaleDateString(
													"en-US",
													{
														year: "numeric",
														month: "short",
														day: "numeric",
													}
												)}
											</span>
										</div>
									</div>

									<div className="flex items-center gap-2 text-sm">
										<LuWallet className="opacity-70" />
										<p className="font-semibold">
											<span className="text-xs">
												{currencySymbols[project.currency]}
											</span>
											{parseAmount(project.budget)}
										</p>
									</div>
									<div className="w-full glass rounded-full h-1.5 mt-2">
										<div
											className="bg-white h-full rounded-full"
											style={{
												width: `${getProgressPercentageWithRespect2Date(
													new Date(project.start_date),
													new Date(project.due_date),
													new Date()
												)}%`,
											}}
										/>
									</div>
									<div className="flex -space-x-3 mb-1 mt-2">
										{project.freelancer_ids.map((id, i) => (
											<Link to={`/freelancers/${id}`} key={i}>
												<img
													src={
														freelancersController.getFreelancer(id)?.profile_pic
													}
													className="w-7 flex-none rounded-full"
													loading="lazy"
												/>
											</Link>
										))}
									</div>
								</div>
							</div>
						))}
				</div>
			)}
		</div>
	);
}
