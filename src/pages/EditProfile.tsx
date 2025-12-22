import { useContext, useState, type ReactNode } from "react";
import {
	LuKeyRound,
	LuLock,
	LuLockOpen,
	LuMail,
	LuPenLine,
	LuUser,
	LuUserPen,
	LuX,
} from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";

export default function EditProfile(): ReactNode {
	const { profileController, client } = useContext(Context) as IContext;
	const navigate = useNavigate();
	// UI
	const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
	const [isEditButtonHidden, setIsEditButtonHidden] = useState<boolean>(true);

	// Form variables
	const [firstName, setFirstName] = useState<string>(client.name.split(" ")[0]);
	const [lastName, setLastName] = useState<string>(client.name.split(" ")[1]);
	const [emailAddress, setEmailAddress] = useState<string>(client.email);
	const [password, setPassword] = useState<string>(client.password);
	const [bio, setBio] = useState<string>(client.bio as string);

	return (
		<div className="min-w-[300px] w-[90%] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[100px] h-[80dvh] top-30 fixed flex items-start justify-center z-20">
			<div className="glass w-fit max-h-[90%] overflow-auto p-4 rounded-2xl flex gap-2 flex-col">
				<div className="sticky top-0 flex w-full justify-between border-b border-gray-600 pb-2">
					<div className="flex items-center gap-2 font-semibold">
						<LuUserPen className="text-xl" />
						<span>Edit Profile</span>
					</div>
					<Link
						to={`/profile/${profileController.profileView.client_id}`}
						className="glass w-fit h-fit rounded-full p-1 text-base"
					>
						<LuX />
					</Link>
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						profileController.update({
							name: `${firstName} ${lastName}`,
							email: emailAddress,
							password: password,
							bio: bio,
						});
						navigate(`/profile/${profileController.profileView.client_id}`);
					}}
				>
					<div className="flex flex-col gap-2">
						<div className="flex gap-2 flex-wrap">
							<input
								type="text"
								placeholder="First Name"
								className="glass p-2 rounded-full text-sm outline-0"
								id="first-name"
								value={firstName}
								required
								onChange={(e) => {
									setFirstName(e.target.value);
									if (
										e.target.value !=
										profileController.profileView.name.split(" ")[0]
									)
										setIsEditButtonHidden(false);
									else setIsEditButtonHidden(true);
								}}
								onKeyDown={(e) => e.key == " " && e.preventDefault()}
							/>
							<input
								type="text"
								placeholder="Last Name"
								className="glass p-2 rounded-full text-sm outline-0"
								id="last-name"
								required
								onKeyDown={(e) => e.key == " " && e.preventDefault()}
								value={lastName}
								onChange={(e) => {
									setLastName(e.target.value);
									if (
										e.target.value !=
										profileController.profileView.name.split(" ")[1]
									)
										setIsEditButtonHidden(false);
									else setIsEditButtonHidden(true);
								}}
							/>
						</div>
						<div className="flex relative">
							<LuMail className="absolute top-[50%] translate-y-[-50%] left-2" />
							<input
								type="email"
								name=""
								id="email"
								placeholder="Email"
								className="glass p-2 pl-8 rounded-full text-sm outline-0 w-full"
								required
								value={emailAddress}
								onChange={(e) => {
									setEmailAddress(e.target.value);
									if (e.target.value != profileController.profileView.email)
										setIsEditButtonHidden(false);
									else setIsEditButtonHidden(true);
								}}
							/>
						</div>
						<div className="flex relative">
							<LuKeyRound className="absolute top-[50%] translate-y-[-50%] left-2" />
							<input
								type={isPasswordHidden ? "password" : "text"}
								name=""
								id="password"
								placeholder="Password"
								className="glass p-2 px-8 rounded-full text-sm outline-0 w-full"
								required
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									if (e.target.value != profileController.profileView.password)
										setIsEditButtonHidden(false);
									else setIsEditButtonHidden(true);
								}}
							/>
							<div
								className=""
								onClick={() => setIsPasswordHidden((prev) => !prev)}
							>
								{isPasswordHidden && (
									<LuLockOpen className="absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer opacity-70 transition duration-300 hover:opacity-100" />
								)}
								{!isPasswordHidden && (
									<LuLock className="absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer opacity-70 transition duration-300 hover:opacity-100" />
								)}
							</div>
						</div>
						<div className="flex relative">
							<LuUser className="absolute top-3 left-2" />
							<textarea
								name=""
								id="bio"
								placeholder="Bio"
								className="glass p-2 pl-8 rounded-xl text-sm outline-0 w-full h-20 resize-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
								required
								value={bio}
								onChange={(e) => {
									setBio(e.target.value);
									if (e.target.value != profileController.profileView.bio)
										setIsEditButtonHidden(false);
									else setIsEditButtonHidden(true);
								}}
							/>
						</div>
					</div>
					{!isEditButtonHidden && (
						<button className="flex gap-2 items-center w-fit bg-white text-gray-900 rounded-full text-sm py-1 px-2 cursor-pointer justify-self-end mt-4">
							<LuPenLine />
							Update
						</button>
					)}
				</form>
			</div>
		</div>
	);
}
