import { firestore } from "lib/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");

	let { amount, cart, merchant } = req.body,
		redirect_url,
		error;

	let { tx_ref } = req.query;

	if (!tx_ref) {
		let response = await firestore
			.collection(`merchants/${merchant}/orders`)
			.add({ amount, cart, status: "pending" });

		tx_ref = response.id;
	}

	try {
		const response = await axios.post(
			"https://api.flutterwave.com/v3/payments",
			{
				tx_ref,
				amount,
				currency: "NGN",
				payment_options: "account, banktransfer, card",
				redirect_url:
					process.env.NODE_ENV === "production"
						? `https://jumga.vercel.app/api/confirm-order/${merchant}`
						: `http://localhost:3000/api/confirm-order/${merchant}`,
				customer: {
					email: "ed@gmail.com",
				},
				customizations: {
					title: "Jumga Ecommerce platform",
					description: "Description of Jumga goes here",
					logo: "",
				},
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
				},
			}
		);

		redirect_url = response.data.data.link;
	} catch (error) {
		error = true;
	}

	res.send({ redirect_url, error });
};
