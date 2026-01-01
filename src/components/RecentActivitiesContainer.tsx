import { useContext, useEffect, useState, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";
import { ActivityIcon } from "../utils/ActivityIcon";
import moment from "moment";
import type { IRecentActivityItem } from "../interface/Data.interface";
import { getRecentActivities } from "../utils/count";
import {
	LuChevronDown,
	LuFolderSearch,
	LuHistory,
	LuStar,
	LuUserSearch,
} from "react-icons/lu";
import { currencySymbols } from "../constants/constants";
import { Link } from "react-router-dom";

export function ActivityCard({
	activity,
}: {
	activity: IRecentActivityItem;
}): ReactNode {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className="glass p-2 rounded-2xl flex flex-col items-start gap-2">
			<div className="flex items-start justify-between w-full">
				<div className="p-3 pl-0">
					<ActivityIcon type={activity.type} className="flex-none text-xl" />
				</div>

				<div className="text-sm flex-1">
					<p className="font-semibold">{activity.title}</p>
					<p className="text-xs opacity-70">
						{moment(activity.date).fromNow()}
					</p>
				</div>
				<button
					className={`glass p-1 rounded-full cursor-pointer transition duration-300 ml-2 ${
						isOpen ? "rotate-180" : "rotate-0"
					}`}
					onClick={() => setIsOpen((prev) => !prev)}
				>
					<LuChevronDown />
				</button>
			</div>
			{isOpen && (
				<div className="w-full text-sm px-2 pl-8">
					<div className="pt-2 border-t-1 border-gray-600">
						{activity.details && <p>{activity.details}</p>}
						{activity.amount && activity.currency && (
							<p className="">
								<span className="mr-2 text-sm font-normal">Amount:</span>
								<span className="text-xs font-normal">
									{currencySymbols[activity.currency]}
								</span>
								{activity.amount.toLocaleString("en-US")}
							</p>
						)}
						{activity.rating && (
							<div className="flex items-center gap-2">
								<LuStar fill="#fff" />
								<p className="text-base">{activity.rating}</p>
							</div>
						)}
					</div>
					<div className="mt-2 flex text-xs justify-end">
						{activity.project_id && (
							<Link
								to={`/projects/${activity.project_id}`}
								className="flex w-fit py-1 px-2 items-center gap-1 rounded-full overflow-hidden transition duration-300 hover:bg-white hover:text-gray-950"
							>
								<LuFolderSearch className="text-sm" />
								<span>View project</span>
							</Link>
						)}
						{activity.freelancer_id && (
							<Link
								to={`/freelancers/${activity.freelancer_id}`}
								className="flex w-fit py-1 px-2 items-center gap-1 rounded-full overflow-hidden transition duration-300 hover:bg-white hover:text-gray-950"
							>
								<LuUserSearch className="text-sm" />
								<span>View freelancer</span>
							</Link>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default function RecentActivitiesContainer({
	isNotification = false,
	isProject = false,
	projectId = "",
}: {
	isNotification?: boolean;
	isProject?: boolean;
	projectId?: string;
}): ReactNode {
	const { recentActivities } = useContext(Context) as IContext;
	const [activities, setActivities] = useState<IRecentActivityItem[]>([]);

	useEffect(() => {
		if (recentActivities) {
			setActivities(getRecentActivities(recentActivities, 2025));
		}
	}, [recentActivities]);
	return (
		<>
			<div className="flex flex-col gap-2 glass p-2 rounded-2xl">
				<p className="text-base font-semibold p-1">Recent Activities</p>
				{activities && (
					<div className="flex flex-col gap-2 h-[250px] overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
						{!isNotification &&
							!isProject &&
							activities.map((activity, i) => (
								<ActivityCard activity={activity} key={i} />
							))}
						{isNotification &&
							!isProject &&
							activities
								.slice(0, 3)
								.map((activity, i) => (
									<ActivityCard activity={activity} key={i} />
								))}

						{isProject &&
							projectId != "" &&
							activities.filter(
								(activity) =>
									activity.project_id && activity.project_id == projectId
							).length != 0 &&
							activities
								.filter(
									(activity) =>
										activity.project_id && activity.project_id == projectId
								)
								.map((activity, i) => (
									<ActivityCard activity={activity} key={i} />
								))}

						{isProject &&
							projectId != "" &&
							activities.filter(
								(activity) =>
									activity.project_id && activity.project_id == projectId
							).length == 0 && (
								<div className="p-10 flex flex-col items-center text-sm gap-2">
									<LuHistory className="text-4xl" />
									<p className="max-w-[250px] text-center">
										No activity has been recorded for this project.
									</p>
								</div>
							)}
					</div>
				)}
			</div>
		</>
	);
}
