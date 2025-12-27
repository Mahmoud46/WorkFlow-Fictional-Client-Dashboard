import { currencyRates } from "../constants/constants";
import type { IProject, TProjectStatus } from "../interface/Data.interface";
import { isInCurrentMonth } from "../utils/date";

interface IProjectStatusCategoryWithColor {
	category: TProjectStatus;
	count: number;
	color: string;
}

interface IProjectsFreelancers {
	total_freelancers: number;
	recently_hired: number;
}

export class Projects {
	projects: IProject[];
	completed: IProject[];
	pending: IProject[];
	active: IProject[];
	freelancersIds: string[];
	indexedProjects: Record<string, IProject>;
	projectStatusCategoryWithColor: IProjectStatusCategoryWithColor[];
	projectsFreelancers: IProjectsFreelancers;
	indexedFreelancersProjects: Record<string, IProject[]>;
	protected projectsIds: string[];

	constructor() {
		this.projects = [];
		this.completed = [];
		this.pending = [];
		this.active = [];
		this.freelancersIds = [];
		this.indexedProjects = {};
		this.projectStatusCategoryWithColor = [];
		this.projectsFreelancers = { total_freelancers: 0, recently_hired: 0 };
		this.indexedFreelancersProjects = {};
		this.projectsIds = [];
	}

	init(projects: IProject[]) {
		this.projects = projects;
		this.completed = projects.filter(
			(project) => project.status == "Completed"
		);
		this.pending = projects.filter((project) => project.status == "Pending");
		this.active = projects.filter((project) => project.status == "In Progress");
		this.freelancersIds = this.getFreelancersIds();
		this.indexedProjects = this.getIndexedProjects();
		this.projectStatusCategoryWithColor = [
			{ category: "Completed", count: this.completed.length, color: "#00C49F" },
			{ category: "Pending", count: this.pending.length, color: "#FFBB28" },
			{ category: "In Progress", count: this.active.length, color: "#0088FE" },
		];

		this.projectsFreelancers = this.getProjectsFreelancers();
		this.indexedFreelancersProjects = this.getIndexedFreelancersProjects();
		this.projectsIds = this.getProjectsIds();
	}

	countTotal(): number {
		return this.projects.length;
	}

	countPending(): number {
		return this.pending.length;
	}

	countActive(): number {
		return this.active.length;
	}

	countCompleted(): number {
		return this.completed.length;
	}

	totalBudgetUSD(): number {
		let budget: number = 0;
		for (const project of this.projects)
			budget += project.budget * currencyRates[project.currency];
		return budget;
	}

	protected getFreelancersIds(): string[] {
		const freelancersIds: string[] = [];
		for (const project of this.projects) {
			freelancersIds.push(...project.freelancer_ids);
		}
		return [...new Set(freelancersIds)];
	}

	protected getIndexedProjects(): Record<string, IProject> {
		const indexedProjects: Record<string, IProject> = {};
		for (const project of this.projects)
			indexedProjects[project.project_id] = project;
		return indexedProjects;
	}

	protected getProjectsIds(): string[] {
		const projectsIds: string[] = [];
		for (const project of this.projects) projectsIds.push(project.project_id);
		return projectsIds;
	}

	getProject(projectId: string): IProject {
		return this.indexedProjects[projectId];
	}

	countCompletedProjectMilestones(project: IProject): number {
		let counter: number = 0;
		for (const milestone of project.milestones)
			if (milestone.status == "Completed") counter += 1;

		return counter;
	}

	protected getProjectsFreelancers(): IProjectsFreelancers {
		const totalFreelancers: string[] = [];
		const recentlyHired: string[] = [];

		for (const project of this.projects) {
			if (project.status == "Completed") continue;
			totalFreelancers.push(...project.freelancer_ids);

			for (const freelancer of project.freelancers)
				if (isInCurrentMonth(freelancer.signed_at))
					recentlyHired.push(freelancer.freelancer_id);
		}

		return {
			total_freelancers: [...new Set(totalFreelancers)].length,
			recently_hired: [...new Set(recentlyHired)].length,
		};
	}

	protected getIndexedFreelancersProjects(): Record<string, IProject[]> {
		const indexedFreelancersProjects: Record<string, IProject[]> = {};
		for (const freelancerId of this.freelancersIds) {
			indexedFreelancersProjects[freelancerId] = [];

			for (const project of this.projects)
				if (project.freelancer_ids.includes(freelancerId))
					indexedFreelancersProjects[freelancerId].push(project);
		}
		return indexedFreelancersProjects;
	}

	getFreelancerProjects(freelancerId: string): IProject[] {
		return this.indexedFreelancersProjects[freelancerId];
	}

	include(projectId: string): boolean {
		return this.projectsIds.includes(projectId);
	}
}

export const projectsController = new Projects();
