import { useContext, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";
import {
	LuCalendarClock,
	LuCalendarPlus,
	LuCheck,
	LuClock,
	LuCreditCard,
	LuFolderX,
	LuLoader,
	LuMapPin,
	LuMessageSquare,
	LuMilestone,
	LuPlus,
	LuRocket,
	LuUser,
	LuUserPlus,
	LuUsers,
	LuUserX,
	LuWallet,
	LuX,
} from "react-icons/lu";
import { projectStatusColor } from "../constants/constants";
import { getProgressPercentageWithRespect2Date } from "../utils/date";
import type { TProjectStatus } from "../interface/Data.interface";
import RecentActivitiesContainer from "../components/RecentActivitiesContainer";

export default function Project(): ReactNode {
	const { id } = useParams();
	const {
		projectsController,
		freelancersController,
		transactionsController,
		setChatParticipantId,
		setIsChatOpen,
	} = useContext(Context) as IContext;

	const [activeTab, setActiveTab] = useState<"Milestones" | "Freelancers">(
		"Milestones"
	);

	const [milestoneIndex, setMilestoneIndex] = useState<number>(-1);

	return (
		<>
			{projectsController.include(id as string) && (
				<div className="gap-4 glass rounded-2xl flex w-full p-2 sm:p-4 min-h-[90dvh]">
					<div className="flex-1 flex flex-col">
						<div className="">
							<p
								className={`text-sm ${
									projectStatusColor[
										projectsController.getProject(id as string).status
									]
								}`}
							>
								{projectsController.getProject(id as string).status}
							</p>
							<h1 className="text-3xl font-semibold">
								{projectsController.getProject(id as string).title}
							</h1>
							<p className="text-lg">
								{projectsController.getProject(id as string).description}
							</p>

							<div className="flex text-sm gap-2 items-center rounded-full overflow-hidden mt-2 mb-1">
								<div className="flex items-center gap-1">
									<LuCalendarPlus className="text-blue-300 text-base" />
									<span>
										{new Date(
											projectsController.getProject(id as string).start_date
										).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</span>
								</div>
								<div className="flex items-center gap-1">
									<LuCalendarClock className="text-orange-300 text-base" />
									<span>
										{new Date(
											projectsController.getProject(id as string).due_date
										).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</span>
								</div>
							</div>

							<p className="flex text-lg font-semibold items-center gap-2">
								<LuWallet className="text-xl" />
								<span>
									{projectsController
										.getProject(id as string)
										.budget.toLocaleString("en-US", {
											style: "currency",
											currency: projectsController.getProject(id as string)
												.currency,
										})}
								</span>
							</p>
							<div className="w-full glass rounded-full h-1.5 mt-2">
								<div
									className="bg-white h-full rounded-full"
									style={{
										width: `${getProgressPercentageWithRespect2Date(
											new Date(
												projectsController.getProject(id as string).start_date
											),
											new Date(
												projectsController.getProject(id as string).due_date
											),
											new Date()
										)}%`,
									}}
								/>
							</div>
							<p className="opacity-70 text-sm">
								#
								{projectsController
									.getProject(id as string)
									.categories.join(" #")}
							</p>
							<div className="flex -space-x-5 mb-1 mt-2">
								{projectsController
									.getProject(id as string)
									.freelancer_ids.map((id, i) => (
										<Link to={`/freelancers/${id}`} key={i}>
											<img
												src={
													freelancersController.getFreelancer(id).profile_pic
												}
												className="w-10 flex-none rounded-full"
												loading="lazy"
											/>
										</Link>
									))}
								<div className="bg-white text-gray-900 cursor-pointer h-10 w-10 rounded-full flex items-center justify-center text-lg glass">
									<LuPlus />
								</div>
							</div>
						</div>
						<div className="">
							<div className="flex gap-4">
								<p
									className={`flex items-center gap-2 text-base cursor-pointer p-2 transition duration-300 ${
										activeTab == "Milestones"
											? "border-b-2 border-white"
											: "opacity-70 border-0"
									}`}
									onClick={() => setActiveTab("Milestones")}
								>
									<LuMilestone className="text-lg" />
									<span>Milestone</span>
								</p>
								<p
									className={`flex items-center gap-2 text-base cursor-pointer p-2 transition duration-300 ${
										activeTab == "Freelancers"
											? "border-b-2 border-white"
											: "opacity-70 border-0"
									}`}
									onClick={() => setActiveTab("Freelancers")}
								>
									<LuUsers className="text-lg" />
									<span>Freelancers</span>
								</p>
							</div>

							{activeTab == "Milestones" && (
								<div className="p-4 flex flex-col gap-2">
									<div className="w-full h-20 flex items-center">
										<div className="">
											<div
												className={`${
													projectsController.getProject(id as string).status !=
													"Pending"
														? `${
																projectStatusColor[
																	"Completed" as TProjectStatus
																]
														  }`
														: "glass"
												} bg-white rounded-full p-2 relative`}
											>
												<p className="absolute -top-5 -left-1 text-xs text-center w-[50px] font-semibold">
													{projectsController
														.getProject(id as string)
														.start_date.split("-")
														.splice(1)
														.reverse()
														.join("/")}
												</p>
												<LuRocket className="text-2xl" />
											</div>
										</div>
										<div className="flex-1 h-2 glass relative">
											{projectsController
												.getProject(id as string)
												.milestones.map((mls, i) => (
													<div
														key={i}
														className={`absolute top-1/2 -translate-y-1/2 `}
														style={{
															left: `${getProgressPercentageWithRespect2Date(
																new Date(
																	projectsController.getProject(
																		id as string
																	).start_date
																),
																new Date(
																	projectsController.getProject(
																		id as string
																	).due_date
																),
																new Date(mls.due_date)
															).toFixed(0)}%`,
														}}
													>
														<div
															className={`absolute ${
																i % 2 == 0 ? "-top-5" : "-bottom-5"
															} -left-2 text-xs text-center w-[50px] font-semibold `}
														>
															{mls.due_date
																.split("-")
																.splice(1)
																.reverse()
																.join("/")}
														</div>
														<div
															className={` bg-white rounded-full p-2 cursor-pointer relative`}
															onClick={() => setMilestoneIndex(i)}
														>
															{milestoneIndex == i && (
																<span className="w-1.5 h-1.5 bg-red-500 absolute rounded-full top-0.5 right-0.5"></span>
															)}

															{mls.status == "Completed" && (
																<LuCheck
																	className={projectStatusColor[mls.status]}
																/>
															)}
															{mls.status == "In Progress" && (
																<LuLoader
																	className={projectStatusColor[mls.status]}
																/>
															)}
															{mls.status == "Pending" && (
																<LuClock
																	className={projectStatusColor[mls.status]}
																/>
															)}
														</div>
													</div>
												))}
											<div
												className="h-full bg-white rounded-r-full"
												style={{
													width: `${getProgressPercentageWithRespect2Date(
														new Date(
															projectsController.getProject(
																id as string
															).start_date
														),
														new Date(
															projectsController.getProject(
																id as string
															).due_date
														),
														new Date()
													)}%`,
												}}
											></div>
										</div>
										<div className="relative">
											<div
												className={
													"glass rounded-full p-2 text-xs w-10 h-10 text-center flex items-center font-semibold justify-center relative overflow-hidden"
												}
											>
												<span
													className={
														projectStatusColor[
															projectsController.getProject(id as string).status
														]
													}
												>
													{getProgressPercentageWithRespect2Date(
														new Date(
															projectsController.getProject(
																id as string
															).start_date
														),
														new Date(
															projectsController.getProject(
																id as string
															).due_date
														),
														new Date()
													).toFixed(0)}
													%
												</span>
												<div
													className="absolute w-full bg-white -z-10 bottom-0"
													style={{
														height: `${getProgressPercentageWithRespect2Date(
															new Date(
																projectsController.getProject(
																	id as string
																).start_date
															),
															new Date(
																projectsController.getProject(
																	id as string
																).due_date
															),
															new Date()
														).toFixed(0)}%`,
													}}
												></div>
											</div>
											<p className="absolute -top-5 -left-1 text-xs text-center w-[50px] font-semibold">
												{projectsController
													.getProject(id as string)
													.due_date.split("-")
													.splice(1)
													.reverse()
													.join("/")}
											</p>
										</div>
									</div>

									{milestoneIndex >= 0 && (
										<div className="glass p-4 rounded-xl overflow-hidden flex gap-4">
											{projectsController.getProject(id as string).milestones[
												milestoneIndex
											].status == "Completed" && (
												<LuCheck
													className={`flex-none text-2xl ${
														projectStatusColor[
															projectsController.getProject(id as string)
																.milestones[milestoneIndex].status
														]
													}`}
												/>
											)}
											{projectsController.getProject(id as string).milestones[
												milestoneIndex
											].status == "Pending" && (
												<LuClock
													className={`flex-none text-2xl ${
														projectStatusColor[
															projectsController.getProject(id as string)
																.milestones[milestoneIndex].status
														]
													}`}
												/>
											)}
											{projectsController.getProject(id as string).milestones[
												milestoneIndex
											].status == "In Progress" && (
												<LuLoader
													className={`flex-none text-2xl ${
														projectStatusColor[
															projectsController.getProject(id as string)
																.milestones[milestoneIndex].status
														]
													}`}
												/>
											)}
											<div className="flex-1">
												<p
													className={`${
														projectStatusColor[
															projectsController.getProject(id as string)
																.milestones[milestoneIndex].status
														]
													} text-xs`}
												>
													{
														projectsController.getProject(id as string)
															.milestones[milestoneIndex].status
													}
												</p>
												<p className="text-lg font-semibold mb-1">
													{
														projectsController.getProject(id as string)
															.milestones[milestoneIndex].title
													}
												</p>
												<p className="flex justify-between items-end border-b border-gray-600 pb-2">
													<div className="flex items-center gap-1 text-sm">
														<LuCalendarClock className="text-orange-300 text-base" />
														<span>
															{new Date(
																projectsController.getProject(
																	id as string
																).milestones[milestoneIndex].due_date
															).toLocaleDateString("en-US", {
																year: "numeric",
																month: "short",
																day: "numeric",
															})}
														</span>
													</div>
													{projectsController.getProject(id as string)
														.milestones[milestoneIndex].freelancer_id != "" && (
														<div className="flex items-center -space-x-2.5">
															<Link
																to={`/freelancers/${
																	projectsController.getProject(id as string)
																		.milestones[milestoneIndex].freelancer_id
																}`}
																className="w-8 h-8 rounded-full"
															>
																<img
																	src={
																		freelancersController.getFreelancer(
																			projectsController.getProject(
																				id as string
																			).milestones[milestoneIndex].freelancer_id
																		).profile_pic
																	}
																	alt={
																		projectsController.getProject(id as string)
																			.milestones[milestoneIndex].freelancer_id
																	}
																	loading="lazy"
																	className="w-full rounded-full"
																/>
															</Link>
															<div className="bg-white text-gray-900 cursor-pointer h-8 w-8 rounded-full flex items-center justify-center text-lg glass">
																<LuPlus />
															</div>
														</div>
													)}
												</p>
												<div className="flex flex-col gap-4 py-2">
													{projectsController
														.getProject(id as string)
														.milestones[milestoneIndex].tasks.map((task, i) => (
															<div key={i} className="flex gap-3 items-center">
																{task.status == "Completed" && (
																	<LuCheck
																		className={`flex-none text-base ${
																			projectStatusColor[task.status]
																		}`}
																	/>
																)}
																{task.status == "Pending" && (
																	<LuClock
																		className={`flex-none text-base ${
																			projectStatusColor[task.status]
																		}`}
																	/>
																)}
																{task.status == "In Progress" && (
																	<LuLoader
																		className={`flex-none text-base ${
																			projectStatusColor[task.status]
																		}`}
																	/>
																)}
																<div
																	className={
																		task.status != "Pending" ? "" : "opacity-80"
																	}
																>
																	<p>{task.description}</p>
																	<p className="flex items-center gap-1 text-xs">
																		<LuCalendarClock className="text-orange-300 text-sm" />
																		<span>
																			{new Date(
																				task.due_date
																			).toLocaleDateString("en-US", {
																				year: "numeric",
																				month: "short",
																				day: "numeric",
																			})}
																		</span>
																	</p>
																</div>
															</div>
														))}
												</div>
											</div>
											<div
												className="-translate-y-2 translate-x-2 glass h-fit p-1 rounded-full cursor-pointer"
												onClick={() => setMilestoneIndex(-1)}
											>
												<LuX />
											</div>
										</div>
									)}
									{milestoneIndex == -1 && (
										<div className="p-10 flex flex-col text-center items-center">
											<LuMilestone className="text-4xl" />
											<p className="max-w-[300px] text-sm mt-2">
												No milestone is currently selected. Choose one from the
												timeline bar.
											</p>
										</div>
									)}
								</div>
							)}

							{activeTab == "Freelancers" && (
								<>
									{projectsController.getProject(id as string).freelancer_ids
										.length > 0 && (
										<div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] p-4">
											{projectsController
												.getProject(id as string)
												.milestones.map((mls, i) => (
													<div
														key={i}
														className="glass flex gap-2 p-2 rounded-2xl overflow-hidden relative"
													>
														<div
															className={`relative flex-none h-15 w-15  p-0.5 rounded-full ${
																freelancersController.getFreelancer(
																	mls.freelancer_id
																).is_online
																	? "border border-green-400 glass-head-btn"
																	: "glass"
															}`}
														>
															<img
																src={
																	freelancersController.getFreelancer(
																		mls.freelancer_id
																	).profile_pic
																}
																alt={
																	freelancersController.getFreelancer(
																		mls.freelancer_id
																	).freelancer_id
																}
																loading="lazy"
																className="rounded-full"
															/>
															{freelancersController.getFreelancer(
																mls.freelancer_id
															).is_online && (
																<span className="w-1.5 h-1.5 bg-green-400 absolute rounded-full top-[5px] right-[5px]"></span>
															)}
														</div>
														<div className="flex-1">
															<p className="text-base font-semibold">
																{
																	freelancersController.getFreelancer(
																		mls.freelancer_id
																	).name
																}
															</p>
															<p className="opacity-70 text-xs">
																{
																	freelancersController.getFreelancer(
																		mls.freelancer_id
																	).role
																}
															</p>
															<p className="text-sm">{mls.title}</p>
															<div className="flex text-xs items-center gap-1 mt-1">
																<LuMapPin />
																<p>
																	{
																		freelancersController.getFreelancer(
																			mls.freelancer_id
																		).location
																	}
																</p>
															</div>
														</div>
														<div className="flex items-start gap-2 w-fit absolute top-2 right-2">
															<Link
																to={`/freelancers/${
																	freelancersController.getFreelancer(
																		mls.freelancer_id
																	).freelancer_id
																}`}
																className="flex glass items-center rounded-full overflow-hidden p-2 cursor-pointer"
															>
																<LuUser />
															</Link>
															<button
																className="flex items-center rounded-full overflow-hidden p-2 cursor-pointer bg-white text-gray-950"
																onClick={() => {
																	setChatParticipantId(mls.freelancer_id);
																	setIsChatOpen((prev) =>
																		prev ? prev : !prev
																	);
																}}
															>
																<LuMessageSquare />
															</button>
														</div>
													</div>
												))}
										</div>
									)}

									{projectsController.getProject(id as string).freelancer_ids
										.length == 0 && (
										<div className="flex flex-col items-center p-10 ">
											<LuUserX className="text-4xl" />
											<p className="text-sm max-w-[400px] text-center mt-2">
												No freelancers have joined this project yet. Invite one
												to get started.
											</p>
											<button className="flex gap-1 mt-2 items-center bg-white text-gray-900 py-1 px-2 rounded-full cursor-pointer text-sm">
												<LuUserPlus className="text-base" />
												Collaborate
											</button>
										</div>
									)}
								</>
							)}
						</div>
					</div>
					<div className="gap-2 flex-col hidden xl:flex">
						<div className="p-4 gap-2 columns-2">
							<div className="flex break-inside-avoid items-center gap-4 glass p-1 rounded-2xl min-w-[195px] max-w-[200px] mb-2">
								<LuCreditCard className="ml-1 text-xl flex-none" />
								<div className="flex-1">
									<p className="text-xs opacity-70">Total Spent</p>

									<p className="">
										{transactionsController
											.getProjectExpensesUp2Now(id as string)
											.toLocaleString("en-US", {
												style: "currency",
												currency: "USD",
											})}
									</p>

									<p className="text-xs">
										<span className="text-green-300">
											{(
												(transactionsController.getProjectExpensesUp2Now(
													id as string
												) /
													projectsController.getProject(id as string).budget) *
												100
											).toFixed(0)}
											%
										</span>{" "}
										of total budget
									</p>
								</div>
							</div>
							<div className="flex break-inside-avoid items-center gap-4 glass p-1 rounded-2xl min-w-[195px] max-w-[200px] mb-2">
								<LuMilestone className="ml-1 text-xl flex-none" />
								<div className="flex-1">
									<p className="text-xs opacity-70">Completed Milestones</p>

									<p className="">
										{
											projectsController
												.getProject(id as string)
												.milestones.filter((mls) => mls.status == "Completed")
												.length
										}
									</p>

									<p className="text-xs">
										<span className="text-green-300">
											{(
												(projectsController
													.getProject(id as string)
													.milestones.filter((mls) => mls.status == "Completed")
													.length /
													projectsController.getProject(id as string).milestones
														.length) *
												100
											).toFixed(0)}
											%
										</span>{" "}
										of milestones
									</p>
								</div>
							</div>
							<div className="flex break-inside-avoid items-center gap-4 glass p-1 rounded-2xl min-w-[195px] max-w-[200px] mb-2">
								<LuUsers className="ml-1 text-xl flex-none" />
								<div className="flex-1">
									<p className="text-xs opacity-70">Active Freelancers</p>

									<p className="">
										{
											projectsController
												.getProject(id as string)
												.milestones.filter(
													(mls) =>
														mls.status != "Completed" && mls.freelancer_id != ""
												).length
										}
									</p>

									<p className="text-xs">
										<span className="text-green-300">
											{(
												((projectsController.getProject(id as string)
													.freelancer_ids.length -
													projectsController
														.getProject(id as string)
														.milestones.filter(
															(mls) => mls.status == "Completed"
														).length) /
													projectsController.getProject(id as string).milestones
														.length) *
												100
											).toFixed(0)}
											%
										</span>{" "}
										of Freelancers
									</p>
								</div>
							</div>
						</div>
						<div className="flex">
							<div className="w-[420px] px-4">
								<RecentActivitiesContainer
									isProject={true}
									projectId={
										projectsController.getProject(id as string).project_id
									}
								/>
							</div>
						</div>
					</div>
				</div>
			)}

			{!projectsController.include(id as string) && (
				<div className="flex w-full p-4 h-[80dvh] items-center justify-center">
					<div className="glass rounded-2xl p-10 flex flex-col items-center">
						<LuFolderX className="text-4xl mb-4" />
						<p className="text-sm max-w-[400px] text-center">
							The project you’re trying to access may have been deleted or
							doesn’t exist.
						</p>
						<Link
							to={"/projects"}
							className="mt-2 text-sm px-4 py-1 rounded-full bg-white text-gray-900"
						>
							Back to Projects
						</Link>
					</div>
				</div>
			)}
		</>
	);
}
