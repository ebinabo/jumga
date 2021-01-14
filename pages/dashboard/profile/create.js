import { Authentication } from "components";
import { useAuth } from "lib/auth";
import { firestore } from "lib/firebase";
import { useMerchant } from "lib/merchants";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";

const slugify = string => string.toLowerCase().trim().split(/\W/).join("-");

export default function CreateProfile() {
	const merchant = useMerchant();
	const { user } = useAuth();
	const { push } = useRouter();
	const [
		{ merchantName, merchantSlug, slugAvailability },
		dispatch,
	] = useReducer((state, { key, value }) => ({ ...state, [key]: value }), {
		merchantName: "",
		merchantSlug: "",
		slugAvailability: "",
	});

	useEffect(() => {
		if (merchant) {
			push("/dashboard/profile");
		}
	}, [merchant]);

	if (!user) {
		return <Authentication />;
	}

	return (
		<div className="mx-4 h-fill grid place-content-center">
			<div>
				<label htmlFor="merchantName" className="sr-only">
					Merchant Name
				</label>
				<input
					id="merchantName"
					type="text"
					value={merchantName}
					placeholder="Merchant Name"
					className="border rounded-md w-72 h-10 px-4"
					onChange={e => {
						dispatch({
							key: "merchantName",
							value: e.target.value,
						});
						dispatch({
							key: "merchantSlug",
							value: slugify(e.target.value),
						});
						dispatch({
							key: "slugAvailability",
							value: "",
						});
					}}
				/>
			</div>

			<div className="mt-2">
				<label htmlFor="merchantSlug" className="sr-only">
					Merchant Slug
				</label>
				<input
					id="merchantSlug"
					type="text"
					value={merchantSlug}
					placeholder="merchant-slug"
					className="border rounded-md w-72 h-10 px-4"
					onChange={e => {
						dispatch({
							key: "merchantSlug",
							value: slugify(e.target.value),
						});
						dispatch({
							key: "slugAvailability",
							value: "",
						});
					}}
				/>
			</div>

			{slugAvailability === "unavailable" && (
				<p>Slug already exists, please try another</p>
			)}

			<div className="space-x-2 mt-4">
				<button
					className="border border-blue-800 text-blue-800 px-2 py-1 rounded focus:outline-none"
					onClick={async e => {
						e.preventDefault();

						const response = await firestore
							.doc(`merchants/${merchantSlug}`)
							.get();

						if (response.exists) {
							dispatch({
								key: "slugAvailability",
								value: "unavailable",
							});
						} else {
							dispatch({
								key: "slugAvailability",
								value: "available",
							});
						}
					}}
				>
					Check Availability
				</button>

				{slugAvailability === "available" && (
					<button
						className="bg-blue-500 text-blue-50 px-2 py-1 rounded focus:outline-none"
						onClick={async e => {
							e.preventDefault();

							firestore
								.doc(`merchants/${merchantSlug}`)
								.set({ name: merchantName, owner: user.uid });
						}}
					>
						Create Account
					</button>
				)}
			</div>
		</div>
	);
}
