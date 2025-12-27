import type { ReactNode } from "react";
import type { TProjectStatus } from "../interface/Data.interface";
import { LuFilter } from "react-icons/lu";

export default function FilterProjects({
	setProjectStatus,
	projectStatus,
}: {
	setProjectStatus: React.Dispatch<
		React.SetStateAction<TProjectStatus | "All">
	>;
	projectStatus: TProjectStatus | "All";
}): ReactNode {
	return (
		<div className="flex glass relative rounded-full overflow-hidden pr-1">
			<LuFilter className="absolute text-base top-[50%] -translate-y-[50%] left-2 opacity-70" />
			<select
				name=""
				id=""
				onChange={(e) =>
					setProjectStatus(e.target.value as TProjectStatus | "All")
				}
				value={projectStatus}
				className="p-2 pl-8 text-sm cursor-pointer outline-0"
			>
				<option value="All" className="text-gray-950">
					All
				</option>
				<option value="In Progress" className="text-gray-950">
					In Progress
				</option>
				<option value="Pending" className="text-gray-950">
					Pending
				</option>
				<option value="Completed" className="text-gray-950">
					Completed
				</option>
			</select>
		</div>
	);
}
