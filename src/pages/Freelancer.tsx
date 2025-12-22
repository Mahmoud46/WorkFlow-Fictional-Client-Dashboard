import { useContext, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";
import { CgClose } from "react-icons/cg";
import {
	LuBadgeCheck,
	LuCalendarClock,
	LuClock,
	LuFolder,
	LuFolderX,
	LuMapPin,
	LuMessageSquare,
	LuStar,
	LuUser,
	LuUserPlus,
	LuUserX,
} from "react-icons/lu";
import SocialIcon from "../utils/ActivityIcon";
import { projectStatusColor } from "../constants/constants";

export default function Freelancer(): ReactNode {
	const { id } = useParams();
	const {
		freelancersController,
		projectsController,
		setChatParticipantId,
		setIsChatOpen,
	} = useContext(Context) as IContext;

	return (
		<div className="min-w-[300px] w-[90%] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[100px] h-[80dvh] top-30 fixed flex items-start justify-center z-20">
			{freelancersController.include(id as string) && (
				<div className="glass md:w-[70%] max-h-[90%] overflow-auto p-4 rounded-2xl flex gap-2 flex-col [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
					<div className="sticky top-0 flex w-full justify-between z-30">
						<div className="flex items-center gap-2 text-sm font-semibold">
							<LuUser className="text-base" />
							{freelancersController.getFreelancer(id as string).name}
						</div>
						<Link
							to="/freelancers"
							className="glass w-fit h-fit rounded-full p-1 text-base"
						>
							<CgClose />
						</Link>
					</div>
					<div className="flex gap-4 flex-wrap">
						<div
							className={`relative flex-none h-25 w-25  p-0.5 rounded-full ${
								freelancersController.getFreelancer(id as string).is_online
									? "border border-green-400 glass-head-btn"
									: "glass"
							}`}
						>
							<img
								src={
									freelancersController.getFreelancer(id as string).profile_pic
								}
								alt={
									freelancersController.getFreelancer(id as string)
										.freelancer_id
								}
								loading="lazy"
								className="rounded-full"
							/>
							{freelancersController.getFreelancer(id as string).is_online && (
								<span className="w-2 h-2 bg-green-400 absolute rounded-full top-[10px] right-[10px]"></span>
							)}
						</div>
						<div className="flex flex-col">
							<h1 className="flex gap-1 text-3xl items-start font-semibold">
								{freelancersController.getFreelancer(id as string).name}{" "}
								<LuBadgeCheck className="text-2xl text-green-300" />
							</h1>
							<h2 className="text-xl">
								{freelancersController.getFreelancer(id as string).role}
							</h2>
							<p>
								{freelancersController.getFreelancer(id as string).description}
							</p>
							<p className="opacity-70 mt-2">
								{freelancersController
									.getFreelancer(id as string)
									.skills.join(" | ")}
							</p>
							<div className="mt-2 flex gap-2 sm:gap-4 overflow-auto flex-wrap">
								<p className="flex items-center gap-1.5">
									<LuMapPin className="text-base" />
									<span>
										{freelancersController.getFreelancer(id as string).location}
									</span>
								</p>
								<p className="flex items-center gap-1.5">
									<LuClock className="text-base" />
									<span>
										$
										{
											freelancersController.getFreelancer(id as string)
												.hourly_rate
										}
										<small>/hr</small>
									</span>
								</p>
								<p className="flex items-center gap-1.5">
									<LuStar className="text-base" />
									<span>
										{freelancersController.getFreelancer(id as string).rating}
										<small>/5</small>{" "}
										<small className="opacity-70">
											(
											{
												freelancersController.getFreelancer(id as string)
													.total_votes
											}{" "}
											votes)
										</small>
									</span>
								</p>
								<p className="flex items-center gap-1.5">
									<LuFolder className="text-base" />
									<span>
										{
											freelancersController.getFreelancer(id as string)
												.total_projects_participated
										}{" "}
										projects
									</span>
								</p>
							</div>
							<div className="mt-2 flex gap-2 sm:gap-4 overflow-auto flex-wrap">
								<button
									className="flex gap-1.5 items-center bg-white text-gray-900 py-0.5 px-2 text-sm rounded-full cursor-pointer"
									onClick={() => {
										setChatParticipantId(id as string);
										setIsChatOpen((prev) => (prev ? prev : !prev));
									}}
								>
									<LuMessageSquare /> Chat
								</button>

								<div className="flex gap-2 overflow-auto flex-wrap">
									{freelancersController
										.getFreelancer(id as string)
										.social_media.map((platform, i) => (
											<a
												href={platform.link}
												key={i}
												className="flex gap-1.5 items-center glass py-0.5 px-2 text-sm rounded-full cursor-pointer"
											>
												<SocialIcon platform={platform.platform} />
												{platform.platform}
											</a>
										))}
								</div>
							</div>
						</div>
					</div>
					<p className="text-base font-semibold">Project Engagements</p>
					{projectsController.freelancersIds.includes(id as string) && (
						<div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
							{projectsController
								.getFreelancerProjects(id as string)
								.map((project, i) => (
									<div
										key={i}
										className="glass p-1 pl-2 rounded-xl overflow-hidden"
									>
										{project.milestones
											.filter(
												(milestome) =>
													milestome.freelancer_id === (id as string)
											)
											.map((milestone, j) => (
												<div key={j}>
													<div className="flex w-full justify-between">
														<span
															className={`text-xs ${
																projectStatusColor[milestone.status]
															}`}
														>
															{milestone.status}
														</span>
													</div>
													<p className="text-lg font-semibold">
														{milestone.title}
													</p>

													<div className="flex flex-col gap-1">
														<Link
															to={`/projects/${project.project_id}`}
															className="text-base line-clamp-1"
														>
															{project.title}
														</Link>
														<div className="flex text-xs gap-2 items-center rounded-full overflow-hidden ">
															<div className="flex items-center gap-1">
																<LuCalendarClock className="text-orange-300 text-base" />
																<span>
																	{new Date(
																		milestone.due_date
																	).toLocaleDateString("en-US", {
																		year: "numeric",
																		month: "short",
																		day: "numeric",
																	})}
																</span>
															</div>
														</div>
													</div>
												</div>
											))}
									</div>
								))}
						</div>
					)}
					{!projectsController.freelancersIds.includes(id as string) && (
						<div className="flex flex-col items-center p-4">
							<LuFolderX className="text-4xl" />
							<p className="max-w-[400px] text-center text-sm mt-2">
								You haven’t collaborated with this freelancer yet. Send an
								invite to begin your first project.
							</p>
							<button className="flex gap-1 mt-2 items-center bg-white text-gray-900 py-1 px-2 rounded-full cursor-pointer text-sm">
								<LuUserPlus className="text-base" />
								Collaborate
							</button>
						</div>
					)}
				</div>
			)}

			{!freelancersController.include(id as string) && (
				<div className="glass w-fit max-h-[90%] overflow-auto p-4 rounded-2xl flex gap-2 flex-col">
					<div className="sticky top-0 flex w-full justify-end">
						<Link
							to="/freelancers"
							className="glass w-fit h-fit rounded-full p-1 text-base"
						>
							<CgClose />
						</Link>
					</div>
					<div className="flex flex-col items-center p-10 gap-4">
						<LuUserX className="text-4xl" />
						<p className="text-sm max-w-[400px] text-center">
							The freelancer you’re looking for doesn’t exist or may have
							removed their profile.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
