import axios from "axios";
import { useCart } from "lib/cart";
import { firestore } from "lib/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getStaticProps({ params }) {
	let response = await firestore.doc(`merchants/${params.slug}`).get();

	let data = response.data();

	return {
		props: { data },
	};
}

export async function getStaticPaths() {
	let response = await firestore.collection(`merchants`).get(),
		paths = [];

	response.forEach(doc => {
		const { id: slug } = doc;
		paths.push({ params: { slug } });
	});

	return {
		paths,
		fallback: true,
	};
}

export default function Cart({ data }) {
	const { cart, removeItem } = useCart();
	const [subtotal, setSubtotal] = useState(0);
	const {
		push,
		query: { slug, tx_ref },
	} = useRouter();
	let deliveryCharge = 5000;

	useEffect(() => {
		if (cart?.length) {
			setSubtotal(
				cart
					.reduce((acc, { amount, price }) => {
						return acc + amount * price;
					}, 0)
					.toFixed(2)
			);
		}
	}, [cart]);

	const checkout = async () => {
		const url = tx_ref
			? `/api/initialize?tx_ref=${tx_ref}`
			: "/api/initialize";
		const response = await axios.post(url, {
			amount: subtotal,
			merchant: slug,
			subAccount: data.subAccount,
			dispatchSubaccount: data.dispatchSubaccount,
			cart,
			deliveryCharge,
		});

		const { redirect_url, error } = response.data;

		if (redirect_url) {
			push(redirect_url);
		}
	};

	return (
		<div className="wrapper">
			{cart.length ? (
				<div>
					{cart.map(({ id, title, price, image, amount }) => (
						<div
							className="flex items-center justify-between"
							key={id}
						>
							<img
								className="w-32 h-24 object-contain object-left"
								src={image}
								alt=""
							/>

							<div className="w-1/2">
								<p>{title}</p>
								<p>x{amount}</p>
							</div>

							<p>NGN {price}</p>

							<button
								className="h-6"
								onClick={() => removeItem(id)}
							>
								Remove
							</button>
						</div>
					))}
					<div>
						<p>
							<span className="font-semibold">Sub Total: </span>
							NGN {subtotal}
						</p>

						<p>
							<span className="font-semibold">
								Delivery Charge:{" "}
							</span>
							NGN {deliveryCharge}
						</p>

						<p>
							<span className="font-semibold">Total: </span>
							NGN {subtotal + deliveryCharge}
						</p>
						<button onClick={checkout}>Checkout</button>
					</div>
				</div>
			) : (
				<p>Cart is empty rn</p>
			)}
		</div>
	);
}
