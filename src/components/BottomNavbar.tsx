import { useEffect, useRef, useState, type ReactNode } from "react";
import { NAV_ITEMS } from "../constants/constants";
import { Link, useLocation } from "react-router-dom";
import { LuSettings } from "react-icons/lu";
import { toggleTheme } from "../utils/toggleTheme";

export default function BottomNavbar(): ReactNode {
	const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
		JSON.parse(localStorage.getItem("is_dark") as string) ?? true
	);
	const settingsContainerRef = useRef<HTMLDivElement>(null);
	const location = useLocation();
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
		<>
			<div className="sticky gap-2 top-dvh flex lg:hidden justify-center items-center bottom-0 w-full z-50 p-2">
				<div className="glass flex p-1 rounded-full w-fit justify-center">
					{NAV_ITEMS.map((link, i) => (
						<Link
							to={link.path}
							className={`p-3 rounded-full ${
								location.pathname == link.path
									? "bg-white text-gray-900"
									: "opacity-80 group-hover:opacity-100"
							} transition duration-300`}
							key={i}
						>
							<link.icon className="text-lg" />
						</Link>
					))}
				</div>
				<div className="glass flex p-1 rounded-full w-fit justify-center">
					<div
						className={`p-3 rounded-full ${
							isSettingsOpen
								? "bg-white text-gray-900 pointer-events-none"
								: "opacity-80 group-hover:opacity-100"
						} transition duration-300 cursor-pointer`}
						onClick={() => setIsSettingsOpen((prev) => !prev)}
					>
						<LuSettings className="text-lg flex-none" />
					</div>
				</div>
				{isSettingsOpen && (
					<div
						className="fixed glass bottom-[70px] right-[20px] p-2 w-[200px] rounded-2xl overflow-hidden z-40"
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
			</div>
		</>
	);
}
