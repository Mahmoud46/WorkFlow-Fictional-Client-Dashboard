import { useContext, useState, type ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";
import {
	LuClock,
	LuFolder,
	LuMapPin,
	LuMessageSquare,
	LuStar,
	LuUser,
} from "react-icons/lu";

export default function Freelancers(): ReactNode {
	const {
		projectsController,
		freelancers,
		setChatParticipantId,
		setIsChatOpen,
	} = useContext(Context) as IContext;
	const [projectsTitlesSelectd, setProjectsTitlesSelected] =
		useState<string>("All");
	return (
		<>
			<div className="flex gap-2 flex-col w-full glass rounded-2xl p-2 sm:p-4 min-h-[90dvh]">
				<div className="flex justify-between flex-wrap gap-2">
					<h1 className="text-4xl">Fleelancers</h1>
					<div className="glass relative flex pr-2 rounded-full text-base cursor-pointer">
						<LuFolder className="absolute top-[50%] translate-y-[-50%] left-2 opacity-70 text-base" />
						<select
							name=""
							id=""
							className="outline-0 p-2 pl-7 cursor-pointer text-sm"
							onChange={(e) => setProjectsTitlesSelected(e.target.value)}
							value={projectsTitlesSelectd}
						>
							<option value="All" className="text-gray-950">
								All Projects
							</option>
							{projectsController?.projects.map((project, i) => (
								<option
									value={project.project_id}
									key={i}
									className="text-gray-950"
								>
									{project.title}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
					{freelancers
						.filter(
							(frl) =>
								projectsController?.freelancersIds.includes(
									frl.freelancer_id
								) &&
								(projectsTitlesSelectd == "All"
									? frl
									: projectsController
											.getProject(projectsTitlesSelectd)
											?.freelancer_ids.includes(frl.freelancer_id))
						)
						.map((frl, i) => (
							<div
								key={i}
								className="glass flex gap-2 p-2 rounded-2xl overflow-hidden"
							>
								<div
									className={`relative flex-none h-20 w-20 p-0.5 rounded-full ${
										frl.is_online
											? "border border-green-400 glass-head-btn"
											: "glass"
									}`}
								>
									<img
										src={frl.profile_pic}
										alt={frl.freelancer_id}
										loading="lazy"
										className="rounded-full"
									/>
									{frl.is_online && (
										<span className="w-2 h-2 bg-green-400 absolute rounded-full top-[7px] right-[7px]"></span>
									)}
								</div>
								<div className="">
									<p className="text-xl font-semibold">{frl.name}</p>
									<p>{frl.role}</p>
									<p className="text-xs line-clamp-2 opacity-70">
										{frl.skills.join(" | ")}
									</p>
									<div className="flex text-sm items-center gap-1 mt-1">
										<LuMapPin />
										<p>{frl.location}</p>
									</div>
									<div className="flex items-center gap-3 text-sm">
										<div className="flex items-center gap-1">
											<LuClock />
											<p className="">
												<span className="text-xs">$</span>
												{frl.hourly_rate}
												<span className="text-xs">/hr</span>
											</p>
										</div>
										<div className="flex items-center gap-1">
											<LuStar className="text-yellow-400" />
											<p>
												{frl.rating}
												<span className="text-xs">/5</span>
											</p>
										</div>
									</div>
									<div className="flex text-sm gap-2 mt-2">
										<Link
											to={`/freelancers/${frl.freelancer_id}`}
											className="flex glass items-center gap-1 p-1 rounded-full overflow-hidden pl-2 pr-3 py-0.5 cursor-pointer"
										>
											<LuUser />
											<span>Profile</span>
										</Link>
										<button
											className="flex items-center gap-1 p-1 rounded-full overflow-hidden pl-2 pr-3 py-0.5 cursor-pointer bg-white text-gray-950"
											onClick={() => {
												setChatParticipantId(frl.freelancer_id);
												setIsChatOpen((prev) => (prev ? prev : !prev));
											}}
										>
											<LuMessageSquare />
											<span>Chat</span>
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			<Outlet />
		</>
	);
}
