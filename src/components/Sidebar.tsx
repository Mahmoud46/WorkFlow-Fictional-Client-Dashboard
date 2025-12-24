import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { LuSettings, LuLogOut, LuArrowDown, LuSparkles } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";
import { toggleTheme } from "../utils/toggleTheme";
import { NAV_ITEMS } from "../constants/constants";

export default function Sidebar(): ReactNode {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
		JSON.parse(localStorage.getItem("is_dark") as string) ?? true
	);
	const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
	const { freelancers } = useContext(Context) as IContext;
	const location = useLocation();
	const settingsContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				settingsContainerRef.current &&
				!settingsContainerRef.current.contains(event.target as Node)
			) {
				setIsSettingsOpen(false); // close container
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (!isDarkTheme) document.documentElement.classList.add("light");
	}, [isDarkTheme]);

	return (
		<aside
			className={`fixed left-0 h-[100dvh] flex-col p-2 pl-8 gap-2 z-50 hidden lg:flex`}
		>
			<ul className="rounded-full flex flex-col glass p-1">
				{NAV_ITEMS.map((item, i) => (
					<li className="" key={i}>
						<Link
							to={item.path}
							className={`flex justify-start items-center transition duration-300 ${
								location.pathname == item.path
									? "bg-white text-gray-950 hover:text-gray-950"
									: "opacity-70 text-white hover:opacity-100"
							}  overflow-hidden p-3 rounded-full w-full`}
						>
							<item.icon className="text-lg flex-none" />
						</Link>
					</li>
				))}
			</ul>
			<ul className="rounded-full flex flex-col glass p-1 gap-1">
				<div className="flex flex-col items-center">
					{freelancers.slice(0, 3).map((fr, i) => (
						<li key={i} className={`w-10 ${i > 0 ? "-mt-5" : ""}`}>
							<div>
								<img
									src={fr.profile_pic}
									alt={fr.name}
									loading="lazy"
									className="rounded-full shadow-sm"
								/>
							</div>
						</li>
					))}
				</div>
				<li>
					<Link
						to="/freelancers"
						className="flex justify-start items-center transition duration-300 opacity-70 text-white hover:opacity-100 overflow-hidden p-3 rounded-full w-ful cursor-pointer"
					>
						<LuArrowDown />
					</Link>
				</li>
			</ul>
			<ul className="rounded-full flex flex-col glass p-1">
				<li>
					<div className="flex justify-start items-center transition duration-300 text-white opacity-70 hover:opacity-100 overflow-hidden p-3 rounded-full w-ful cursor-pointer">
						<LuSparkles />
					</div>
				</li>
				<li>
					<div
						className={`flex justify-start items-center transition duration-300 cursor-pointer ${
							isSettingsOpen
								? "bg-white text-gray-950 hover:text-gray-950 pointer-events-none"
								: "opacity-70 text-white hover:opacity-100"
						}  overflow-hidden p-3 rounded-full w-full`}
						onClick={() => setIsSettingsOpen((prev) => !prev)}
					>
						<LuSettings className="text-lg flex-none" />
					</div>
				</li>
				<li>
					<div className="flex justify-start items-center transition duration-300 text-white opacity-70 hover:opacity-100 overflow-hidden p-3 rounded-full w-ful cursor-pointer">
						<LuLogOut />
					</div>
				</li>
			</ul>
			{isSettingsOpen && (
				<div
					className="absolute glass bottom-[210px] left-[90px] p-2 w-[200px] rounded-2xl overflow-hidden z-40"
					ref={settingsContainerRef}
				>
					<div className="flex w-full flex-col gap-2">
						<p className="font-semibold">Toggle Theme</p>
						<div className="flex pl-5 w-full justify-between">
							<p>Dark</p>
							<div
								className="glass h-6 w-12 rounded-full overflow-hidden relative cursor-pointer"
								onClick={() => {
									toggleTheme();
									setIsDarkTheme((prev) => !prev);
								}}
							>
								<span
									className={`h-4.5 w-4.5 absolute rounded-full top-1/2 -translate-y-1/2 transition-transform duration-300 ${
										isDarkTheme
											? "translate-x-6.5 bg-white"
											: "translate-x-0.5 glass"
									}`}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</aside>
	);
}
