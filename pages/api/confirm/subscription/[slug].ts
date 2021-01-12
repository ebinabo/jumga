import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "lib/firebase";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	let { slug, transaction_id, status: queryStatus } = req.query,
		response;

	if (queryStatus === "successful") {
		try {
			response = await axios.get(
				`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
				{
					headers: {
						Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
					},
				}
			);

			const { amount, currency, status } = response.data.data;

			if (
				amount === 10000 &&
				currency === "NGN" &&
				status === "successful"
			) {
				await firestore
					.doc(`merchants/${slug}`)
					.set({ subscription: "active" }, { merge: true });

				res.writeHead(307, { Location: "/dashboard/profile" });
			}
		} catch (error) {
			// console.log(error);
		}
	}

	res.end();
};
