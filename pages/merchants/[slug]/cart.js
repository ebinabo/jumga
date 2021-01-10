import axios from "axios";
import { useCart } from "lib/cart";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Cart() {
	const { cart, removeItem } = useCart();
	const [total, setTotal] = useState(0);
	const {
		push,
		query: { slug, tx_ref },
	} = useRouter();

	useEffect(() => {
		if (cart?.length) {
			setTotal(
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
			amount: total,
			merchant: slug,
			cart,
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

							<p>USD {price}</p>

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
							<span className="font-semibold">Total: </span>
							USD {total}
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
