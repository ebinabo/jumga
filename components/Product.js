import { useCart } from "lib/cart";
import Image from "next/image";
import { useState } from "react";

export default function Product({ product, showCart }) {
	const {
		id,
		category,
		title,
		description,
		price,
		rating,
		noOfReviews,
		image,
		featured,
	} = product;

	const [amount, setAmount] = useState(1);
	const incrementAmount = () => amount < 10 && setAmount(amount + 1);
	const decrementAmount = () => amount > 0 && setAmount(amount - 1);

	const { addItem } = useCart();

	const addToCart = () => {
		addItem({ id, title, price, image, amount });
	};

	return (
		<div className="w-full shadow-md">
			<div className="relative px-4 w-full pb-3/4 bg-transparent">
				<Image
					src={image}
					layout="fill"
					objectFit="contain"
					className="object-left"
				/>
			</div>
			<p className="truncate">{title}</p>

			<p>NGN {price}</p>

			<div className="flex items-center transform origin-left scale-75">
				{[0, 1, 2, 3, 4].map((index) => (
					<svg
						key={index}
						className={`${
							rating > index ? "text-yellow-400" : "text-gray-500"
						} w-6 h-6`}
						fill="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
						/>
					</svg>
				))}
				<span className="ml-2">({noOfReviews})</span>
			</div>

			{showCart && (
				<div className="flex justify-between py-2 bg-gray-50">
					<div className="flex items-center">
						<button
							onClick={decrementAmount}
							className="border w-6 focus:outline-none"
						>
							-
						</button>
						<span className="border-t border-b w-6 text-center">
							{amount}
						</span>
						<button
							onClick={incrementAmount}
							className="border w-6 focus:outline-none"
						>
							+
						</button>
					</div>
					<button
						onClick={addToCart}
						className="px-2 h-6 text-sm bg-gray-800 text-gray-50"
					>
						Add To Cart
					</button>
				</div>
			)}
		</div>
	);
}
