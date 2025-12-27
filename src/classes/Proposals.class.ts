import type { IProposal } from "../interface/Data.interface";

interface IPendingProposalsStats {
	total_proposals: number;
	recent_proposals: number;
}

export class Proposals {
	proposals: IProposal[];
	pending: IProposal[];
	accepted: IProposal[];
	pendingProposalsStat: IPendingProposalsStats;
	protected indexedProposals: Record<string, IProposal>;
	protected proposalsIds: string[];

	constructor() {
		this.proposals = [];
		this.pending = [];
		this.accepted = [];
		this.pendingProposalsStat = { total_proposals: 0, recent_proposals: 0 };
		this.indexedProposals = {};
		this.proposalsIds = [];
	}

	init(proposals: IProposal[]) {
		this.proposals = proposals;
		this.pending = proposals.filter((proposal) => proposal.status == "Pending");
		this.accepted = proposals.filter((proposal) => proposal.status == "Accepted");
		this.pendingProposalsStat = this.getPendingProposalsStats();
		this.indexedProposals = this.getIndexedProposals();
		this.proposalsIds = this.getProposalsIds();
	}

	protected getPendingProposalsStats(): IPendingProposalsStats {
		const pendingProposals: IProposal[] = [];
		let newPendingProposals: number = 0;

		for (const proposal of this.pending) {
			const date = new Date(proposal.submitted_at);
			const now = new Date();
			pendingProposals.push(proposal);
			if (
				date.getUTCFullYear() === now.getUTCFullYear() &&
				date.getUTCMonth() === now.getUTCMonth()
			)
				newPendingProposals += 1;
		}

		return {
			total_proposals: pendingProposals.length,
			recent_proposals: newPendingProposals,
		};
	}

	protected getProposalsIds(): string[] {
		const proposalsIds: string[] = [];
		for (const proposal of this.proposals)
			proposalsIds.push(proposal.proposal_id);

		return proposalsIds;
	}

	protected getIndexedProposals(): Record<string, IProposal> {
		const indexedProposals: Record<string, IProposal> = {};
		for (const proposal of this.proposals)
			indexedProposals[proposal.proposal_id] = proposal;

		return indexedProposals;
	}

	getProposal(proposalId: string): IProposal {
		return this.indexedProposals[proposalId];
	}

	include(proposalId: string): boolean {
		return this.proposalsIds.includes(proposalId);
	}
}

export const proposalsController = new Proposals();
