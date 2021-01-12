import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "lib/firebase";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	let { status: queryStatus, transaction_id, params, tx_ref } = req.query,
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
				`${amount}` === params[1] &&
				currency === params[2] &&
				status === "successful"
			) {
				await firestore
					.doc(`merchants/${params[0]}/orders/${tx_ref}`)
					.set({ status }, { merge: true });

				res.writeHead(307, {
					Location: `/merchants/${params[0]}/confirm-order?status=${status}&tx_ref=${tx_ref}`,
				});
			}
		} catch (error) {
			res.writeHead(307, {
				Location: `/merchants/${params[0]}/confirm-order?status=${status}&tx_ref=${tx_ref}`,
			});
		}
	}

	res.end();
};
