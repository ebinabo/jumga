import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { firestore } from "lib/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");

	let { slug } = req.query,
		subaccount_id,
		error;

	try {
		const response = await axios.post(
			"https://api.flutterwave.com/v3/subaccounts",
			req.body,
			{
				headers: {
					Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
				},
			}
		);

		subaccount_id = response.data.data.subaccount_id;

		await firestore
			.doc(`merchants/${slug}`)
			.set({ subaccount_id }, { merge: true });
	} catch (err) {
		error = true;
	}

	res.send({ subaccount_id, error });
	res.end();
};
