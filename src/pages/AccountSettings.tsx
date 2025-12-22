import { useContext, useEffect, useState } from "react";
import { LuBell, LuUserCog, LuX } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interface/Context.interface";
import type { TProfileVisibleTo } from "../interface/Data.interface";
import { PrivacyIcon } from "../utils/ActivityIcon";

export default function AccountSettings() {
	const { client, profileController } = useContext(Context) as IContext;

	const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(
		client.account_settings.two_factor_auth
	);

	const [emailNotify, setEmailNotify] = useState<boolean>(
		client.account_settings.notification_settings.email
	);

	const [platformNotify, setPlatformNotify] = useState<boolean>(
		client.account_settings.notification_settings.platform
	);

	const [profileVisible, setProfileVisible] = useState<TProfileVisibleTo>(
		client.account_settings.privacy_settings.profile_visible_to
	);

	useEffect(() => {
		setTwoFactorAuth(client.account_settings.two_factor_auth);
		setEmailNotify(client.account_settings.notification_settings.email);
		setPlatformNotify(client.account_settings.notification_settings.platform);
		setProfileVisible(
			client.account_settings.privacy_settings.profile_visible_to
		);
	}, [client]);

	return (
		<div className="min-w-[300px] w-[90%] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[100px] h-[80dvh] top-30 fixed flex items-start justify-center z-20">
			<div className="glass w-fit max-h-[90%] overflow-auto p-4 rounded-2xl flex gap-2 flex-col">
				<div className="sticky top-0 flex w-full justify-between border-b border-gray-600 pb-2">
					<div className="flex items-center gap-2 font-semibold">
						<LuUserCog className="text-xl" />
						<span>Account Settings</span>
					</div>
					<Link
						to={`/profile/${profileController.profileView.client_id}`}
						className="glass w-fit h-fit rounded-full p-1 text-base"
					>
						<LuX />
					</Link>
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex justify-between items-center">
						<p>Two Factor Authentication</p>
						<div
							className="glass h-6 w-12 rounded-full overflow-hidden relative cursor-pointer"
							onClick={() => {
								const st = twoFactorAuth ? false : true;
								setTwoFactorAuth(st);
								profileController.updateAccountSettings({
									two_factor_auth: st,
									privacy_settings: {
										profile_visible_to: profileVisible,
									},
									notification_settings: {
										email: emailNotify,
										platform: platformNotify,
									},
								});
							}}
						>
							<span
								className={`h-4.5 w-4.5 absolute rounded-full top-1/2 -translate-y-1/2 transition-transform duration-300 ${
									twoFactorAuth
										? "translate-x-6.5 bg-white"
										: "translate-x-0.5 glass"
								}`}
							/>
						</div>
					</div>
					<div className="flex justify-between items-center gap-4">
						<p>Profile visible</p>
						<div className="relative glass rounded-full pr-2 text-sm">
							<PrivacyIcon
								level={profileVisible}
								className="absolute left-2 top-1/2 -translate-y-1/2 text-base"
							/>
							<select
								className="cursor-pointer outline-0 p-1 pl-7"
								value={profileVisible}
								onChange={(e) => {
									setProfileVisible(e.target.value as TProfileVisibleTo);
									profileController.updateAccountSettings({
										two_factor_auth: twoFactorAuth,
										privacy_settings: {
											profile_visible_to: e.target.value as TProfileVisibleTo,
										},
										notification_settings: {
											email: emailNotify,
											platform: platformNotify,
										},
									});
								}}
							>
								<option value="Everyone" className="text-gray-900">
									Everyone
								</option>
								<option value="Freelancers Only" className="text-gray-900">
									Freelancers Only
								</option>
								<option value="Private" className="text-gray-900">
									Private
								</option>
							</select>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<p className="flex gap-2 items-center font-semibold">
							<LuBell className="text-lg" /> Notification Settings
						</p>
						<div className="flex items-center gap-4 justify-between pl-7">
							<div className="flex items-center gap-2">
								<p>Email</p>
								<div
									className="glass h-6 w-12 rounded-full overflow-hidden relative cursor-pointer"
									onClick={() => {
										const st = emailNotify ? false : true;
										setEmailNotify(st);
										profileController.updateAccountSettings({
											two_factor_auth: twoFactorAuth,
											privacy_settings: {
												profile_visible_to: profileVisible,
											},
											notification_settings: {
												email: st,
												platform: platformNotify,
											},
										});
									}}
								>
									<span
										className={`h-4.5 w-4.5 absolute rounded-full top-1/2 -translate-y-1/2 transition-transform duration-300 ${
											emailNotify
												? "translate-x-6.5 bg-white"
												: "translate-x-0.5 glass"
										}`}
									/>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<p>Platform</p>
								<div
									className="glass h-6 w-12 rounded-full overflow-hidden relative cursor-pointer"
									onClick={() => {
										const st = platformNotify ? false : true;
										setPlatformNotify(st);
										profileController.updateAccountSettings({
											two_factor_auth: twoFactorAuth,
											privacy_settings: {
												profile_visible_to: profileVisible,
											},
											notification_settings: {
												email: emailNotify,
												platform: st,
											},
										});
									}}
								>
									<span
										className={`h-4.5 w-4.5 absolute rounded-full top-1/2 -translate-y-1/2 transition-transform duration-300 ${
											platformNotify
												? "translate-x-6.5 bg-white"
												: "translate-x-0.5 glass"
										}`}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
