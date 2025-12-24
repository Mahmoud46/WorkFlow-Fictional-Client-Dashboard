import { useContext, type ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";
import type { IContext } from "../interface/Context.interface";
import { Context } from "../context/Context";
import {
	LuBadgeCheck,
	LuBriefcaseBusiness,
	LuBuilding,
	LuCalendarClock,
	LuContact,
	LuGlobe,
	LuLanguages,
	LuListChecks,
	LuMail,
	LuMapPin,
	LuMessageSquareText,
	LuNewspaper,
	LuPhone,
	LuStar,
	LuUserCog,
	LuUserPen,
	LuWallet,
	LuWrench,
} from "react-icons/lu";
import { currencySymbols } from "../constants/constants";
import moment from "moment";

export default function Profile(): ReactNode {
	const { profileController, freelancersController, postsController } =
		useContext(Context) as IContext;

	return (
		<>
			<div className="gap-4 glass rounded-2xl flex w-full p-2 sm:p-4 min-h-[90dvh]">
				<div className="flex flex-col gap-4">
					<div className="flex gap-4">
						<div className="w-22 h-22 flex-none">
							<img
								src={profileController.profileView.profile_pic}
								alt={profileController.profileView.name}
								loading="lazy"
								className="w-full rounded-full"
							/>
						</div>
						<div className="">
							<h1 className="text-2xl flex items-start gap-2">
								<span>{profileController.profileView.name}</span>
								{profileController.profileView.account_status == "Verified" && (
									<LuBadgeCheck className="text-2xl text-green-400" />
								)}
							</h1>
							<p className="text-lg mb-2">
								{profileController.profileView.role}
							</p>
							<p className="text-base max-w-[700px] mb-2">
								{profileController.profileView.bio}
							</p>
							<div className="flex sm:gap-4 items-start sm:items-center text-sm flex-col sm:flex-row">
								<p className="flex gap-2 items-center">
									<LuBuilding className="flex-none text-base" />{" "}
									<span>{profileController.profileView.company}</span>
								</p>
								<p className="flex gap-2 items-center">
									<LuMapPin className="flex-none text-base" />{" "}
									<span>{profileController.profileView.location}</span>
								</p>
							</div>
							<div className="flex gap-2 mt-4">
								<Link
									to={`/profile/${profileController.profileView.client_id}/edit`}
									className="flex items-center gap-2 glass p-0.5 px-2 rounded-full text-sm"
								>
									<LuUserPen className="text-base" />
									<span>Edit</span>
								</Link>
								<Link
									to={`/profile/${profileController.profileView.client_id}/settings`}
									className="flex items-center gap-2 p-0.5 px-2 rounded-full text-sm bg-white text-gray-900 cursor-pointer"
								>
									<LuUserCog className="text-base" />
									<span>Settings</span>
								</Link>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<div className="">
							<p
								className={`flex items-center gap-2 text-base cursor-pointer p-2 transition duration-300 border-b-2 border-white w-fit`}
							>
								<LuNewspaper className="text-lg" />
								<span>My Posts</span>
							</p>
						</div>
						<div className="flex gap-2 flex-wrap">
							{postsController.posts.slice(0, 2).map((post, i) => (
								<div
									key={i}
									className="glass flex-1 p-2 rounded-xl flex flex-col gap-2"
								>
									<div className="flex gap-2 items-center">
										<div
											className={`relative glass-head-btn p-3 rounded-full ${
												post.status == "Open"
													? "border border-green-400"
													: "border border-red-400"
											}`}
										>
											<span className="w-1.5 h-1.5 bg-green-400 absolute rounded-full top-[3.5px] right-[3.5px]"></span>
											<LuBriefcaseBusiness className="text-2xl" />
										</div>
										<div className="">
											<h1 className="text-lg font-semibold">{post.title}</h1>
											<h2 className="text-sm">{post.subtitle}</h2>
											<p className="text-xs opacity-70">
												{moment(post.created_at).fromNow()}
											</p>
										</div>
									</div>

									<div className="flex flex-col gap-2">
										<p className="text-sm">{post.description}</p>

										<div className="flex gap-2.5 w-full overflow-auto glass p-1 rounded-lg">
											<div className="flex items-center gap-2 flex-none">
												<LuWallet />
												<div className="flex flex-col text-xs">
													<span>Budget</span>
													<span className="text-sm">
														{currencySymbols[post.budget.currency]}
														{post.budget.min.toLocaleString()} -{" "}
														{currencySymbols[post.budget.currency]}
														{post.budget.max.toLocaleString()}
													</span>
												</div>
											</div>
											{post.deadline && (
												<div className="flex items-center gap-2 flex-none">
													<LuCalendarClock />
													<div className="flex flex-col text-xs">
														<span className="opacity-70">Deadline</span>
														<span className="text-sm">
															{new Date(post.deadline).toLocaleDateString(
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
											)}
											<div className="flex items-center gap-2 flex-none">
												<LuMapPin />
												<div className="flex flex-col text-sm">
													<span className="text-xs opacity-70">
														Placement type
													</span>
													<span>{post.location_type}</span>
												</div>
											</div>
										</div>

										<div className="">
											<p className="flex gap-2 items-center font-semibold">
												<LuWrench /> <span>Skills</span>
											</p>
											<ul className="text-sm pl-10">
												{post.skills.map((skill, i) => (
													<li key={i} className="list-disc">
														{skill}
													</li>
												))}
											</ul>
										</div>
										<div className="">
											<p className="flex gap-2 items-center font-semibold">
												<LuListChecks /> <span>Requirements</span>
											</p>
											<ul className="text-sm pl-10">
												{post.requirements.map((req, i) => (
													<li key={i} className="list-disc">
														{req}
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="gap-2 flex-col p-2 flex-none max-w-[350px] hidden xl:flex">
					<div className="flex flex-col gap-4 glass p-4 rounded-2xl">
						<div className="">
							<div className="flex gap-2 font-semibold items-center mb-1">
								<LuLanguages className="text-lg" />
								<h1>Languages Spoken</h1>
							</div>
							<p className="pl-6 text-sm">
								{profileController.profileView.languages_spoken?.join(", ")}
							</p>
						</div>
						<div className="">
							<h1 className="flex items-center font-semibold gap-2 mb-1">
								<LuContact className="text-lg" />
								<span>Contacts</span>
							</h1>
							<div className="text-sm pl-6 flex flex-col gap-1">
								{profileController.profileView.phone_number && (
									<p className="flex items-center gap-2">
										<LuPhone className="text-base" />
										<a
											href={`tel:${profileController.profileView.phone_number.replace(
												/[^\d+]/g,
												""
											)}`}
										>
											{profileController.profileView.phone_number}
										</a>
									</p>
								)}
								<p className="flex items-center gap-2">
									<LuMail className="text-base" />
									<a
										href={`mailto:${profileController.profileView.email}`}
										className="hover:underline"
									>
										{profileController.profileView.email}
									</a>
								</p>
								<p className="flex items-center gap-2 hover:underline">
									<LuGlobe className="text-base" />
									<a href={profileController.profileView.website}>
										{profileController.profileView.website}
									</a>
								</p>
							</div>
						</div>
					</div>
					<div className="glass p-2 flex flex-col gap-2 rounded-2xl">
						<h2 className="flex gap-2 items-center font-semibold">
							<LuMessageSquareText className="text-lg" />{" "}
							<span>Reviews & Feedbacks</span>
						</h2>
						<div className="flex flex-col gap-2 max-h-[270px] overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
							{profileController.profileView.reviews_and_feedback.map(
								(rev, i) => (
									<div
										key={i}
										className="glass p-2 rounded-xl flex gap-4 items-start"
									>
										<div className="h-10 w-10 rounded-full flex-none relative">
											<div className="flex bg-white gap-1 px-1 font-semibold items-center text-gray-900 w-fit text-xs rounded-full absolute -bottom-1 -right-2 ">
												<LuStar className="text-xs" /> <span>{rev.rating}</span>
											</div>
											<img
												src={
													freelancersController.getFreelancer(rev.freelancer_id)
														.profile_pic
												}
												alt={rev.freelancer_id}
												className="w-full rounded-full"
											/>
										</div>
										<div className="text-sm flex-1">
											<p>{rev.comment}</p>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			</div>
			<Outlet />
		</>
	);
}
