export interface IClientProfileView {
	// Required for account & login
	client_id: string;
	email: string;
	password: string; // store hashed passwords
	account_status: "Verified" | "Unverified" | "Suspended";

	// Optional contact info
	phone_number?: string;
	profile_pic?: string;
	name: string;
	company?: string;
	location?: string;
	bio: string;
	website?: string;
	languages_spoken?: string[];
	timezone?: string;
	role: string;
	// Reviews / Feedback given by client to freelancers
	reviews_and_feedback: {
		freelancer_id: string;
		freelancer_name?: string;
		rating: number;
		comment: string;
	}[];

	// Account & Security Settings
	account_settings: {
		two_factor_auth: boolean;
		privacy_settings: {
			profile_visible_to: TProfileVisibleTo;
		};
		notification_settings: {
			email: boolean;
			platform: boolean;
		};
	};
}

export interface IFreelancer {
	freelancer_id: string;
	name: string;
	role: string;
	email: string;
	hourly_rate: number;
	skills: string[];
	location: string;
	profile_pic: string;
	description: string;
	rating?: number;
	total_votes?: number;
	total_projects_participated?: number;
	is_online?: boolean;
	social_media: {
		platform: string;
		link: string;
		prefix: string;
	}[];
}

export interface IInvoice {
	invoice_id: string;
	project_id: string;
	issue_date: string;
	due_date: string;
	status: TInvoiceStatus;
	amount: number;
	currency: TCurrency;
	transaction_ids: string[];
}

export interface IProject {
	project_id: string;
	client_id: string;
	title: string;
	description: string;
	status: TProjectStatus;
	start_date: string;
	due_date: string;
	budget: number;
	currency: TCurrency;
	categories: string[];
	freelancer_ids: string[];
	milestones: IMilestone[];
	invoices: string[];
	cover_image: string;
	freelancers: { freelancer_id: string; signed_at: string }[];
}

export interface IRecentActivityItem {
	activity_id: string; // unique ID for the activity
	type: TRecentActivityType;
	title: string; // short description
	project_id?: string; // optional, if related to a project
	freelancer_id?: string; // optional, if related to a freelancer
	amount?: number; // optional, for payments
	currency?: string; // optional, for payments
	rating?: number; // optional, for reviews
	date: string; // ISO date of activity
	details?: string; // optional extra information
}

export interface ITransaction {
	transaction_id: string;
	invoice_id: string;
	date: string;
	method: TPaymentMethod;
	amount: number;
	currency: TCurrency;
	status: TTransactionStatus;
}

export interface IProposal {
	proposal_id: string;
	project_id: string;
	client_id: string;
	freelancer_id: string;
	submitted_at: string;
	status: TPropsalStatus;
	cover_letter: string;
	bid: {
		amount: number;
		currency: TCurrency;
		estimated_days: number;
	};
	attachments?: {
		file_id: string;
		file_name: string;
		file_url: string;
	}[];
}

interface IMilestone {
	milestone_id: string;
	title: string;
	status: TProjectStatus;
	due_date: string;
	freelancer_id: string;
	tasks: {
		status: TProjectStatus;
		description: string;
		due_date: string;
	}[];
}

export interface IChat {
	chat_id: string;
	project_id: string;
	participants: string[];
	created_at: string;
	updated_at: string;
	is_group: boolean;
	messages: IMessage[];
}

export interface IMessage {
	id: string;
	chat_id: string;
	sender_id: string;
	content: string;
	type: "text";
	created_at: string;
	is_read: boolean;
}

export interface IClientPost {
	post_id: string; // Unique identifier for the post
	client_id: string; // ID of the client who posted
	title: string; // Title of the project/job
	subtitle: string;
	description: string; // Detailed description of the work
	budget: {
		min: number; // Minimum budget
		max: number; // Maximum budget
		currency: string; // e.g., "USD", "EUR", "EGP"
	};
	skills: string[]; // Required technical skills
	requirements: string[]; // Other requirements (experience, certifications, etc.)
	status: "Open" | "Closed"; // Post availability
	created_at: string; // ISO date string when post was created
	updated_at?: string; // Optional last updated date
	deadline?: string; // Optional deadline for the project
	location_type: "Remote" | "On-site" | "Hybrid"; // Work type
}

type TCurrency = "USD" | "EUR";
export type TProjectStatus = "Pending" | "In Progress" | "Completed";
export type TInvoiceStatus = "Paid" | "Pending";
export type TRecentActivityType =
	| "ProjectCreated"
	| "ProjectUpdated"
	| "PaymentMade"
	| "InvoiceReceived"
	| "FreelancerReviewed"
	| "MessageSent"
	| "Other";
export type TPaymentMethod =
	| "Cash"
	| "Bank Transfer"
	| "PayPal"
	| "Credit Card";
export type TTransactionStatus = "Completed" | "Pending";
export type TProfileVisibleTo = "Everyone" | "Freelancers Only" | "Private";
export type TPropsalStatus = "Pending" | "Accepted" | "Rejected";
