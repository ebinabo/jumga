import axios from "axios";
import { Authentication } from "components";
import { useAuth } from "lib/auth";
import { useMerchant } from "lib/merchants";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";

export default function Profile() {
	const merchant = useMerchant();
	const { user } = useAuth();
	const { push } = useRouter();
	const [financials, dispatch] = useReducer(
		(state, { key, value }) => ({ ...state, [key]: value }),
		{
			account_number: "0690000037",
			account_bank: "044",
			business_name: "",
			country: "NG",
			split_value: 0,
			business_mobile: "090890382",
			business_email: "",
		}
	);

	useEffect(() => {
		// prevent state update when compnoent is not mounted
		let isMounted = true;

		if (isMounted && merchant) {
			dispatch({ key: "business_name", value: merchant.name });
			dispatch({ key: "business_email", value: `${user.email}` });
		}

		return () => (isMounted = false);
	}, [merchant]);

	if (!merchant) {
		return <Authentication />;
	}

	return (
		<div className="wrapper">
			{merchant.subscription !== "active" && (
				<div className="px-4 py-1 text-yellow-900 flex items-center justify-between space-x-2 w-max bg-yellow-100 border border-yellow-700">
					<svg
						className="w-6 h-6"
						fill="currentColor"
						stroke="none"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						/>
					</svg>
					<p>
						Subscription is not yet active
						<button
							className="block"
							onClick={async e => {
								const response = await axios.post(
									`/api/subscribe?slug=${merchant.slug}`
								);

								const { redirect_url, error } = response.data;

								push(redirect_url);
							}}
						>
							Activate
						</button>
					</p>
				</div>
			)}

			<div>
				<h2 className="text-3xl">General</h2>
				<p>{merchant.name}</p>
				<p>{merchant.slug}</p>
			</div>

			<div className="mt-4">
				<h2 className="text-3xl">Financial</h2>
				<InputFields state={financials} />
				{merchant.subaccount_id ? (
					<>
						<h3 className="mt-2 uppercase text-sm text-gray-600 font-semibold">
							Subaccount id
						</h3>
						<p>{merchant.subaccount_id}</p>
					</>
				) : (
					<button
						className="mt-4"
						onClick={async e => {
							e.preventDefault();
							await axios.post(
								`/api/subaccount?slug=${merchant.slug}`,
								financials
							);
						}}
					>
						Activate Financial Data
					</button>
				)}
			</div>
		</div>
	);
}

function InputFields({ state }) {
	const { country, split_value, account_bank, ...visibleFields } = state;

	let titlefy = slug =>
		slug
			.split("_")
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");

	return (
		<div className="space-y-2">
			{Object.keys(visibleFields).map(key => (
				<div key={key}>
					<label
						className="uppercase text-sm text-gray-600 font-semibold"
						htmlFor={key}
					>
						{titlefy(key)}
					</label>
					<input
						className="block"
						type="text"
						readOnly
						id={key}
						value={state[key]}
					/>
				</div>
			))}
		</div>
	);
}
