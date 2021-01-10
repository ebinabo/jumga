// ?status=successful&tx_ref=12345&transaction_id=1825060
// ?status=cancelled&tx_ref=67456

// http://localhost:3000/api/confirm-order/edens-jewelery?status=successful&tx_ref=12345&transaction_id=1825060

import { firestore } from "lib/firebase";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { merchant, status, tx_ref } = req.query;

	await firestore
		.doc(`merchants/${merchant}/orders/${tx_ref}`)
		.set({ status }, { merge: true });

	res.writeHead(307, {
		Location: `/merchants/${merchant}/?status=${status}&tx_ref=${tx_ref}`,
	});
	res.end();
};
