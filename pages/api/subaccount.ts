import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { firestore } from "lib/firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");

	let { slug } = req.query,
		subaccount_id,
		error;

	// pick one of two dispatch riders
	let dispatchSubaccount = [
		"RS_48DCD4168FA93850D713B3D7E6D35B88",
		"RS_F67F10580A8D728072E5A2092B075714",
	][Math.round(Math.random())];

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
			.set({ subaccount_id, dispatchSubaccount }, { merge: true });
	} catch (err) {
		error = true;
	}

	res.send({ subaccount_id, error });
	res.end();
};
