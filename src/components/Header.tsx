import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { LuBell, LuMessageSquare, LuSearch } from "react-icons/lu";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";
import { Link } from "react-router-dom";
import RecentActivitiesContainer from "./RecentActivitiesContainer";
import logo from "../assets/workflow.svg";

export default function Header(): ReactNode {
	const { profileController, setIsChatOpen } = useContext(Context) as IContext;
	const [isActivityOpen, setIsActivityOpen] = useState<boolean>(false);

	const activityContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				activityContainerRef.current &&
				!activityContainerRef.current.contains(event.target as Node)
			) {
				setIsActivityOpen(false); // close container
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	return (
		<div className="sticky top-0 w-full p-2 sm:py-4 sm:px-8 z-50">
			<div className="glass p-1 pl-4 rounded-full flex justify-between items-center">
				<Link to={"/"} className="flex gap-2 items-center cursor-pointer">
					<img src={logo} alt="workflow" className="h-6" />
					<p className="text-xl font-semibold">
						<span>Work</span>
						<span className="italic">Flow</span>
					</p>
				</Link>
				<div className="relative hidden md:flex ">
					<LuSearch className="absolute left-2 top-[50%] translate-y-[-50%]" />
					<input
						type="text"
						placeholder="Search..."
						className="text-sm p-2.5 aspect-[16/1] pl-8 glass rounded-full font-light outline-0"
					/>
				</div>
				<div className="flex items-center gap-2">
					<div
						className="text-lg glass-head-btn relative cursor-pointer text-gray-400 hover:text-white transition duration-300 p-3 rounded-full"
						onClick={() => setIsChatOpen(true)}
					>
						<LuMessageSquare />
						<span className="text-xs absolute bg-green-400 rounded-sm text-white top-[3px] right-[3px] w-[7px] h-[7px]"></span>
					</div>
					<div
						className="text-lg glass-head-btn relative cursor-pointer text-gray-400 hover:text-white transition duration-300 p-3 rounded-full"
						onClick={() => setIsActivityOpen((prev) => !prev)}
					>
						<LuBell />
						<span className="text-xs absolute bg-red-400 rounded-sm text-white top-[3px] right-[3px] w-[7px] h-[7px]"></span>
					</div>
					<Link
						to={`/profile/${profileController.profileView.client_id}`}
						className="w-10 cursor-pointer"
					>
						<img
							src={profileController.profileView.profile_pic}
							alt={profileController.profileView.client_id}
							loading="lazy"
							className="rounded-full"
						/>
					</Link>
				</div>
			</div>

			{isActivityOpen && (
				<div
					className="absolute h-20 w-[350px] right-8 z-50"
					ref={activityContainerRef}
				>
					<RecentActivitiesContainer isNotification={true} />
				</div>
			)}
		</div>
	);
}
