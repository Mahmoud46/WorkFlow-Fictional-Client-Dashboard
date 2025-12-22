import { useContext, type ReactNode } from "react";
import { CgClose } from "react-icons/cg";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";
import {
	LuCalendarPlus,
	LuCalendarSync,
	LuCheck,
	LuDownload,
	LuFileX,
	LuFolder,
	LuMapPin,
	LuMessageSquare,
	LuPaperclip,
	LuStar,
	LuUser,
	LuWallet,
	LuX,
} from "react-icons/lu";
import { FileIcon } from "../utils/ActivityIcon";

export default function Proposal(): ReactNode {
	const {
		proposalsController,
		freelancersController,
		projectsController,
		setChatParticipantId,
		setIsChatOpen,
	} = useContext(Context) as IContext;
	const { id } = useParams();
	return (
		<div className="min-w-[300px] w-[90%] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[100px] h-[80dvh] top-30 fixed flex items-start justify-center z-20">
			{proposalsController.include(id as string) && (
				<div className="glass md:w-[70%] max-h-[90%] overflow-auto p-4 rounded-2xl flex gap-2 flex-col">
					<div className="sticky top-0 flex w-full flex-col">
						<div className="flex justify-between items-center">
							<p className={`text-sm text-yellow-300`}>
								{proposalsController.getProposal(id as string).status}
							</p>
							<Link
								to="/pending-proposals"
								className="glass w-fit h-fit rounded-full p-1 text-base"
							>
								<CgClose />
							</Link>
						</div>
						<div className="">
							<p className="text-2xl font-semibold mb-0.5">
								{
									projectsController.getProject(
										proposalsController.getProposal(id as string).project_id
									).title
								}
							</p>
							<p className="flex gap-2 text-sm items-center">
								<LuCalendarPlus className="text-blue-300" />
								<span>
									{new Date(
										proposalsController.getProposal(id as string).submitted_at
									).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									})}
								</span>
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-4 glass p-2 rounded-2xl overflow-hidden overflow-y-auto">
						<div className="flex gap-4 items-start md:items-center justify-between flex-wrap flex-col md:flex-row">
							<div className="flex gap-4 items-start md:items-center">
								<div
									className={`relative flex-none h-15 w-15  p-0.5 rounded-full ${
										freelancersController.getFreelancer(
											proposalsController.getProposal(id as string)
												.freelancer_id
										).is_online
											? "border border-green-400 glass-head-btn"
											: "glass"
									}`}
								>
									<img
										src={
											freelancersController.getFreelancer(
												proposalsController.getProposal(id as string)
													.freelancer_id
											).profile_pic
										}
										alt={
											freelancersController.getFreelancer(
												proposalsController.getProposal(id as string)
													.freelancer_id
											).freelancer_id
										}
										loading="lazy"
										className="rounded-full"
									/>
									{freelancersController.getFreelancer(
										proposalsController.getProposal(id as string).freelancer_id
									).is_online && (
										<span className="w-1.5 h-1.5 bg-green-400 absolute rounded-full top-[5.4px] right-[5.4px]"></span>
									)}
								</div>
								<div className="">
									<p className="font-semibold">
										{
											freelancersController.getFreelancer(
												proposalsController.getProposal(id as string)
													.freelancer_id
											).name
										}
									</p>
									<p className="text-sm">
										{
											freelancersController.getFreelancer(
												proposalsController.getProposal(id as string)
													.freelancer_id
											).role
										}
									</p>
									<div className="flex md:gap-4 items-start md:items-center text-sm flex-wrap flex-col md:flex-wrap">
										<div className="flex items-center gap-1">
											<LuMapPin />
											<p>
												{
													freelancersController.getFreelancer(
														proposalsController.getProposal(id as string)
															.freelancer_id
													).location
												}
											</p>
										</div>
										<div className="flex items-center gap-1">
											<LuStar className="text-yellow-400" />
											<p>
												{
													freelancersController.getFreelancer(
														proposalsController.getProposal(id as string)
															.freelancer_id
													).rating
												}
												<span className="text-xs">/5</span>
											</p>
											<p>
												(
												{
													freelancersController.getFreelancer(
														proposalsController.getProposal(id as string)
															.freelancer_id
													).total_votes
												}
												)
											</p>
										</div>
										<div className="flex items-center gap-1">
											<LuFolder className="" />
											<p>
												{
													freelancersController.getFreelancer(
														proposalsController.getProposal(id as string)
															.freelancer_id
													).total_projects_participated
												}{" "}
												projects
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-row text-sm gap-2 mt-2 self-end md:self-auto md:flex-col">
								<Link
									to={`/freelancers/${
										proposalsController.getProposal(id as string).freelancer_id
									}`}
									className="flex glass items-center gap-1 p-1 rounded-full overflow-hidden pl-2 pr-3 py-0.5 cursor-pointer"
								>
									<LuUser />
									<span>Profile</span>
								</Link>
								<button
									className="flex items-center gap-1 p-1 rounded-full overflow-hidden pl-2 pr-3 py-0.5 cursor-pointer bg-white text-gray-950"
									onClick={() => {
										setChatParticipantId(
											proposalsController.getProposal(id as string)
												.freelancer_id
										);
										setIsChatOpen((prev) => (prev ? prev : !prev));
									}}
								>
									<LuMessageSquare />
									<span>Chat</span>
								</button>
							</div>
						</div>

						<div className="border-t border-gray-600 sm:ml-18 pt-4 flex flex-col gap-4">
							<p>
								{proposalsController.getProposal(id as string).cover_letter}
							</p>

							<div className="flex gap-2 flex-wrap w-full">
								<div className="flex flex-col gap-1 glass w-fit p-2 rounded-2xl flex-1">
									<p className="font-semibold">Bid details</p>

									<div className="flex gap-4 glass-mod w-fit rounded-xl overflow-hidden px-2 py-0.5">
										<div className="flex items-center gap-2">
											<LuWallet />
											<div className="">
												<p className="text-xs opacity-70">Amount</p>
												<p className="text-sm">
													{proposalsController
														.getProposal(id as string)
														.bid.amount.toLocaleString("en-US", {
															style: "currency",
															currency: "USD",
														})}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<LuCalendarSync />
											<div className="">
												<p className="text-xs opacity-70">Estimated days</p>
												<p className="text-sm">
													{
														proposalsController.getProposal(id as string).bid
															.estimated_days
													}{" "}
													days
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="glass rounded-2xl p-2 flex flex-col gap-2 flex-1 flex-wrap">
									<p className="flex gap-2 items-center font-semibold">
										<LuPaperclip /> <span>Attachments</span>
									</p>
									<div className="flex flex-wrap flex-col w-full">
										{proposalsController.getProposal(id as string)
											.attachments &&
											proposalsController
												.getProposal(id as string)
												.attachments?.map((attachment, i) => (
													<div
														key={i}
														className="flex items-center gap-2 glass p-2 rounded-xl group w-full"
													>
														<FileIcon
															fileName={attachment.file_name}
															className="text-3xl"
														/>
														<div className="flex-1">
															<p>{attachment.file_name}</p>
															<p className="opacity-70 text-xs">365 KB</p>
														</div>
														<div className="p-1 cursor-pointer rounded-full overflow-hidden text-sm flex items-center gap-1 opacity-0 transition duration-300 hover:bg-white hover:text-gray-900 px-2 group-hover:opacity-100">
															<LuDownload />
															<span>Download</span>
														</div>
													</div>
												))}
										{!proposalsController.getProposal(id as string)
											.attachments && (
											<p className="text-center text-xs">
												No attachments were added to this proposal.
											</p>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="flex justify-end gap-2 mt-1">
						<button
							className="flex items-center gap-1 py-0.5 px-3 rounded-full 
                         bg-green-500/20 text-white
                         border border-green-500/30 
                         backdrop-blur-md 
                         hover:bg-green-500/30 
                         transition cursor-pointer text-sm"
						>
							<LuCheck className="text-lg" />
							Accept
						</button>
						<button
							className="flex items-center gap-1 py-0.5 px-3 rounded-full 
                         bg-red-500/20 text-white 
                         border border-red-500/30 
                         backdrop-blur-md 
                         hover:bg-red-500/30 
                         transition cursor-pointer text-sm"
						>
							<LuX className="text-lg" />
							Reject
						</button>
					</div>
				</div>
			)}
			{!proposalsController.include(id as string) && (
				<div className="glass w-fit max-h-[90%] overflow-auto p-4 rounded-2xl flex gap-2 flex-col">
					<div className="sticky top-0 flex w-full justify-end">
						<Link
							to="/pending-proposals"
							className="glass w-fit h-fit rounded-full p-1 text-base"
						>
							<CgClose />
						</Link>
					</div>
					<div className="flex flex-col items-center p-10 gap-4">
						<LuFileX className="text-4xl" />
						<p className="text-sm max-w-[400px] text-center">
							The proposal you’re looking for doesn’t exist or has been removed.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
