import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");

	let { slug } = req.query,
		redirect_url,
		error;

	try {
		const response = await axios.post(
			"https://api.flutterwave.com/v3/payments",
			{
				tx_ref: `${slug}-${new Date().getTime()}`,
				amount: 10000,
				currency: "NGN",
				payment_options: "account, banktransfer, card",
				redirect_url:
					process.env.NODE_ENV === "production"
						? `https://jumga.vercel.app/api/confirm/subscription/${slug}`
						: `http://localhost:3000/api/confirm/subscription/${slug}`,
				customer: {
					email: `${slug}@jumga.vercel.app`,
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
		// console.log(redirect_url);
		// res.writeHead(307, { Location: redirect_url });
		// res.end();
	} catch (error) {
		error = true;
	}

	// use this instead to redirect from frontend
	res.send({ redirect_url, error });
};
