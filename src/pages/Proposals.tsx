import { useContext, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { ProposalsTabel } from "../components/Tables";

import type { IContext } from "../interface/Context.interface";
import { Context } from "../context/Context";

export default function Proposals(): ReactNode {
	const { proposalsController } = useContext(Context) as IContext;
	return (
		<>
			<div className="flex gap-2 flex-col w-full glass rounded-2xl p-2 sm:p-4 min-h-[90dvh]">
				<div className="flex gap-2 items-center justify-between">
					<h1 className="text-4xl">Pending Proposals</h1>
				</div>

				<ProposalsTabel proposals={proposalsController.pending} />
			</div>
			<Outlet />
		</>
	);
}
