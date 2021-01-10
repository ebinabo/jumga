import { useRouter } from "next/router";
import { useEffect } from "react";
import { Link } from "components/Navigation";
import { firestore } from "lib/firebase";
import { useCart } from "lib/cart";

export async function getStaticProps({ params }) {
	const response = await firestore.doc(`merchants/${params.slug}`).get();

	const { name } = response.data();

	return {
		props: { name },
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

export default function ConfirmOrder({ name }) {
	const {
		isFallback,
		query: { status, slug, tx_ref },
	} = useRouter();
	const { resetCart } = useCart();

	useEffect(() => {
		if (slug && status) {
			if (status === "successful") {
				resetCart(slug);
			} else {
				// consider timer
			}
		}
	}, [slug, status]);

	return (
		<div className="h-fill grid place-content-center mx-4 sm:mx-auto sm:max-w-xs text-center">
			<p>{isFallback ? "" : `${name}`}</p>

			<div
				className={`${
					!status ? "opacity-0" : "opacity-100"
				} mx-4 sm:mx-auto sm:max-w-xs`}
			>
				{status === "successful" ? (
					<>
						<p>Your transaction was successful</p>
						<svg
							className="w-6 h-6 mx-auto bg-green-700 text-green-50 rounded-full scale-150"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
						<Link to={`/merchants/${slug}`}>Continue Shopping</Link>
					</>
				) : (
					<>
						<p>
							Something went wrong, please{" "}
							<Link
								className="underline"
								to={`/merchants/${slug}/cart?tx_ref=${tx_ref}`}
							>
								try again
							</Link>
						</p>
						<svg
							className="w-6 h-6 mx-auto bg-red-700 text-red-50 rounded-full scale-150"
							fill="none"
							stroke="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</>
				)}
			</div>
		</div>
	);
}
