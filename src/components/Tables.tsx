import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";
import { Link } from "react-router-dom";
import { parseAmount } from "../utils/parse";
import moment from "moment";
import { LuFileSearch } from "react-icons/lu";
import {
	currencySymbols,
	invoicesStatusColor,
	projectStatusColor,
	transactionStatusColor,
} from "../constants/constants";
import type {
	IInvoice,
	IProject,
	IProposal,
	TTransactionStatus,
} from "../interface/Data.interface";
import { TransferMethodIcon } from "../utils/ActivityIcon";
import { getProgressPercentageWithRespect2Date } from "../utils/date";

export function ActiveProjectsTable(): ReactNode {
	const { projectsController, freelancersController } = useContext(
		Context
	) as IContext;
	return (
		<div className="flex-none overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
			<table className="min-w-max w-full">
				<thead className="glass sticky top-0 z-20">
					<tr>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Title
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Freelancers
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Budget
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Deadline
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-600">
					{projectsController?.active.map((project, i) => (
						<tr key={i}>
							<td className="px-4 py-2 text-sm text-white hover:underline max-w-[200px] font-semibold">
								<Link to={`/projects/${project.project_id}`}>
									{project.title}
								</Link>
							</td>
							<td className="px-4 py-2 text-sm flex -space-x-3">
								{project.freelancer_ids.map((fr, i) => (
									<Link to={`/freelancers/${fr}`} key={i}>
										<img
											src={freelancersController.getFreelancer(fr).profile_pic}
											alt="fr"
											className="w-7 rounded-full"
											loading="lazy"
										/>
									</Link>
								))}
							</td>
							<td className="px-4 py-2 text-sm text-white">
								${parseAmount(project.budget)}
							</td>
							<td className="px-4 py-2 text-sm">
								{new Date(project.due_date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function PendingProposalsOverviewTable(): ReactNode {
	const { proposalsController, projectsController, freelancersController } =
		useContext(Context) as IContext;
	return (
		<div className="flex-none overflow-x-auto max-h-[250px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
			<table className="min-w-max w-full">
				<thead className="glass sticky top-0 z-20">
					<tr>
						<th className="p-2 text-left text-xs opacity-70 font-medium">
							Freelancer
						</th>
						<th className="p-2 text-left text-xs opacity-70 font-medium">
							Project
						</th>
						<th className="p-2 text-left text-xs opacity-70 font-medium">
							Received
						</th>
						<th className="p-2 text-left text-xs opacity-70 font-medium"></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-600">
					{proposalsController.pending.map((proposal, i) => (
						<tr key={i}>
							<td className="p-2 text-sm text-white max-w-[200px]">
								<Link
									to={`/freelancers/${proposal.freelancer_id}`}
									className="flex gap-1 items-center"
								>
									<img
										src={
											freelancersController.getFreelancer(
												proposal.freelancer_id
											).profile_pic
										}
										alt={proposal.freelancer_id}
										className="w-7 h-7 flex-none rounded-full"
									/>
									<div className="text-xs">
										<p className="font-normal">
											{
												freelancersController.getFreelancer(
													proposal.freelancer_id
												).name
											}
										</p>
										<p className="opacity-70 text-[10px]">
											{
												freelancersController.getFreelancer(
													proposal.freelancer_id
												).role
											}
										</p>
									</div>
								</Link>
							</td>
							<td className="px-4 py-2 text-xs flex -space-x-3 hover:underline max-w-[150px]">
								<Link to={`/projects/${proposal.project_id}`}>
									{
										projectsController.indexedProjects[proposal.project_id]
											.title
									}
								</Link>
							</td>
							<td className="px-4 py-2 text-xs text-white">
								{moment(proposal.submitted_at).fromNow()}
							</td>
							<td className="px-4 py-2">
								<Link to={`/proposals/${proposal.proposal_id}`}>
									<LuFileSearch className="transition duration-300 hover:text-blue-300" />
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function UpComingPendingInvoicesViewTable(): ReactNode {
	const { invoicesController, projectsController } = useContext(
		Context
	) as IContext;
	return (
		<div className="flex-none max-h-[250px] overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
			<table className="min-w-max w-full">
				<thead className="glass sticky top-0 z-20">
					<tr>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Project
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Amount
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Deadline
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium"></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-600">
					{invoicesController.invoices
						.filter((invoices) => invoices.status == "Pending")
						.map((invoice, i) => (
							<tr key={i}>
								<td className="px-4 py-2 text-sm text-white max-w-[150px]">
									<Link
										to={`/projects/${invoice.project_id}`}
										className="flex gap-1 items-center hover:underline text-xs"
									>
										<div className="line-clamp-1">
											{
												projectsController.indexedProjects[invoice.project_id]
													.title
											}
										</div>
									</Link>
								</td>
								<td className="px-4 py-2 text-xs flex -space-x-3">
									${parseAmount(invoice.amount)}
								</td>
								<td className="px-4 py-2 text-xs text-white">
									{moment(invoice.due_date).fromNow()}
								</td>
								<td className="px-4 py-2">
									<Link to={`/invoices/${invoice.invoice_id}`}>
										<LuFileSearch className="transition duration-300 hover:text-blue-300" />
									</Link>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export function ProjectsTable({
	projects,
}: {
	projects: IProject[];
}): ReactNode {
	const { freelancersController } = useContext(Context) as IContext;
	return (
		<div className="flex-none overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
			<table className="min-w-max w-full">
				<thead className="glass sticky top-0 z-20">
					<tr>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Title
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Freelancers
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Budget
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Starts
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Deadline
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Progress
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Status
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-600">
					{projects.map((project, i) => (
						<tr key={i}>
							<td className="px-4 py-2 text-sm text-white hover:underline max-w-[200px] font-semibold">
								<Link to={`/projects/${project.project_id}`}>
									{project.title}
								</Link>
							</td>
							<td className="px-4 py-2 text-sm flex -space-x-3">
								{project.freelancer_ids.map((fr, i) => (
									<Link to={`/freelancers/${fr}`} key={i}>
										<img
											src={freelancersController.getFreelancer(fr).profile_pic}
											alt="fr"
											className="w-7 rounded-full"
											loading="lazy"
										/>
									</Link>
								))}
							</td>
							<td className="px-4 py-2 text-sm text-white">
								{currencySymbols[project.currency]}
								{parseAmount(project.budget)}
							</td>
							<td className="px-4 py-2 text-sm">
								{new Date(project.start_date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}
							</td>
							<td className="px-4 py-2 text-sm">
								{new Date(project.due_date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}
							</td>
							<td className="px-4 py-2 text-sm">
								<div className="w-full glass rounded-full h-1.5">
									<div
										className="bg-white h-full rounded-full"
										style={{
											width: `${getProgressPercentageWithRespect2Date(
												new Date(project.start_date),
												new Date(project.due_date),
												new Date()
											)}%`,
										}}
									/>
								</div>
							</td>
							<td
								className={`px-4 py-2 text-sm ${
									projectStatusColor[project.status]
								}`}
							>
								{project.status}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function InvoicesTable({
	invoices,
}: {
	invoices: IInvoice[];
}): ReactNode {
	const { projectsController, transactionsController } = useContext(
		Context
	) as IContext;
	return (
		<div className="flex-none overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
			<table className="min-w-max w-full">
				<thead className="glass sticky top-0 z-20">
					<tr>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							ID
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Project
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Issue date
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Due date
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Amount
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Progress
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Status
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-600">
					{invoices.map((invoice, i) => (
						<tr key={i}>
							<td className="px-4 py-2 text-sm text-white hover:underline max-w-[200px] font-semibold">
								<Link to={`/invoices/${invoice.invoice_id}`}>
									{invoice.invoice_id}
								</Link>
							</td>
							<td className="px-4 py-2 text-sm text-white hover:underline max-w-[200px] font-semibold">
								<Link to={`/projects/${invoice.project_id}`}>
									{
										projectsController?.indexedProjects[invoice.project_id]
											.title
									}
								</Link>
							</td>
							<td className="px-4 py-2 text-sm">
								{new Date(invoice.issue_date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}
							</td>
							<td className="px-4 py-2 text-sm">
								{new Date(invoice.due_date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}
							</td>
							<td className="px-4 py-2 text-sm text-white">
								{currencySymbols[invoice.currency]}
								{parseAmount(invoice.amount)}
							</td>
							<td className="px-4 py-2 text-sm text-white">
								<div className="w-full glass rounded-full h-1.5">
									<div
										className="bg-white h-full rounded-full"
										style={{
											width: `${
												(
													(transactionsController.getCountOfTransactions(
														invoice.transaction_ids
													) /
														invoice.transaction_ids.length) *
													100
												).toFixed(0) ?? 0
											}%`,
										}}
									/>
								</div>
							</td>

							<td
								className={`px-4 py-2 text-sm ${
									invoicesStatusColor[
										transactionsController.getPaidAmountOfTransactions(
											invoice.transaction_ids
										) == invoice.amount
											? "Paid"
											: "Pending"
									]
								}`}
							>
								{transactionsController.getPaidAmountOfTransactions(
									invoice.transaction_ids
								) == invoice.amount
									? "Paid"
									: "Pending"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function ProposalsTabel({
	proposals,
}: {
	proposals: IProposal[];
}): ReactNode {
	const { projectsController, freelancersController } = useContext(
		Context
	) as IContext;
	return (
		<div className="flex-none overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
			<table className="min-w-max w-full">
				<thead className="glass sticky top-0 z-20">
					<tr>
						<th className="p-2 text-left text-xs opacity-70 font-medium">
							Freelancer
						</th>
						<th className="p-2 text-left text-xs opacity-70 font-medium">
							Project
						</th>
						<th className="p-2 text-left text-xs opacity-70 font-medium">
							Received
						</th>
						<th className="p-2 text-left text-xs opacity-70 font-medium">
							Amount
						</th>
						<th className="p-2 text-left text-xs opacity-70 font-medium">
							Estimated days
						</th>
						<th className="p-2 text-left text-xs opacity-70 font-medium">
							Status
						</th>
						<th className="p-2 text-left text-xs opacity-70 font-medium"></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-600">
					{proposals.map((proposal, i) => (
						<tr key={i}>
							<td className="p-2 text-sm text-white">
								<Link
									to={`/freelancers/${proposal.freelancer_id}`}
									className="flex gap-2 items-center"
								>
									<img
										src={
											freelancersController.getFreelancer(
												proposal.freelancer_id
											).profile_pic
										}
										alt={proposal.freelancer_id}
										className="w-10 h-10 flex-none rounded-full"
									/>
									<div className="text-sm">
										<p className="font-normal">
											{
												freelancersController.getFreelancer(
													proposal.freelancer_id
												).name
											}
										</p>
										<p className="opacity-70 text-xs">
											{
												freelancersController.getFreelancer(
													proposal.freelancer_id
												).role
											}
										</p>
									</div>
								</Link>
							</td>
							<td className="px-4 py-2 text-sm text-white hover:underline cursor-pointer font-semibold">
								<Link to={`/projects/${proposal.project_id}`}>
									{
										projectsController.indexedProjects[proposal.project_id]
											.title
									}
								</Link>
							</td>
							<td className="px-4 py-2 text-sm text-white">
								{moment(proposal.submitted_at).fromNow()}
							</td>
							<td className="px-4 py-2 text-sm text-white">
								{currencySymbols[proposal.bid.currency]}
								{parseAmount(proposal.bid.amount)}
							</td>
							<td className="px-4 py-2 text-sm text-white">
								{proposal.bid.estimated_days} days
							</td>
							<td
								className={`px-4 py-2 text-sm ${
									proposal.status == "Pending"
										? "text-yellow-300"
										: "text-green-300"
								}`}
							>
								{proposal.status}
							</td>
							<td className="px-4 py-2">
								<Link to={`/proposals/${proposal.proposal_id}`}>
									<LuFileSearch className="text-xl transition duration-300 hover:text-blue-300" />
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function TransactionsTable({
	invoice,
}: {
	invoice: IInvoice;
}): ReactNode {
	const { transactionsController } = useContext(Context) as IContext;
	return (
		<div className="flex-none overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
			<table className="min-w-max w-full">
				<thead className="glass sticky top-0 z-20">
					<tr>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							ID
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Method
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Date
						</th>

						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Amount
						</th>
						<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
							Status
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-600">
					{invoice.transaction_ids.map((tid, i) => (
						<tr key={i}>
							<td className="px-4 py-2 text-sm text-white max-w-[200px] font-semibold">
								{transactionsController.getTransaction(tid)?.transaction_id ??
									"_"}
							</td>
							<td className="px-4 py-2 text-sm text-white">
								<div className="flex gap-2 items-center">
									<TransferMethodIcon
										method={
											transactionsController.getTransaction(tid)?.method ??
											"PayPal"
										}
										className="text-lg"
									/>
									{transactionsController.getTransaction(tid)?.method ?? "_"}
								</div>
							</td>
							<td className="px-4 py-2 text-sm">
								{!transactionsController.isPaid(tid)
									? "_"
									: new Date(
											transactionsController.getTransaction(tid)?.date as string
									  ).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
									  }) ?? "_"}
							</td>
							<td className="px-4 py-2 text-sm text-white">
								{
									currencySymbols[
										transactionsController.getTransaction(tid)
											?.currency as string
									]
								}
								{parseAmount(
									transactionsController.getTransaction(tid)?.amount as number
								)}
							</td>

							<td
								className={`px-4 py-2 text-sm ${
									transactionStatusColor[
										transactionsController.isPaid(tid)
											? "Completed"
											: ("Pending" as string as TTransactionStatus)
									]
								}`}
							>
								{transactionsController.isPaid(tid)
									? "Completed"
									: ("Pending" as string)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
