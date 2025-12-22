import { type ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Freelancers from "./pages/Freelancers";
import Freelancer from "./pages/Freelancer";
import Project from "./pages/Project";
import Invoices from "./pages/Invoices";
import Invoice from "./pages/Invoice";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Proposals from "./pages/Proposals";
import Proposal from "./pages/Proposal";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AccountSettings from "./pages/AccountSettings";
import Chat from "./components/Chat";

export default function App(): ReactNode {
	return (
		<>
			<Header />
			<Sidebar />
			<Chat />
			<section className={`flex pb-4 px-2 sm:px-8 lg:pl-[100px] text-white`}>
				<div className="flex w-full">
					<Routes>
						<Route index element={<Home />} />

						<Route path="/projects" element={<Projects />} />
						<Route path="/projects/:id" element={<Project />} />

						<Route path="/freelancers" element={<Freelancers />}>
							<Route path=":id" element={<Freelancer />} />
						</Route>

						<Route path="/invoices" element={<Invoices />}>
							<Route path=":id" element={<Invoice />} />
						</Route>

						<Route path="/profile/:id" element={<Profile />}>
							<Route path="edit" element={<EditProfile />} />
							<Route path="settings" element={<AccountSettings />} />
						</Route>

						<Route path="/pending-proposals" element={<Proposals />}>
							<Route path=":id" element={<Proposal />} />
						</Route>
					</Routes>
				</div>
			</section>
		</>
	);
}
