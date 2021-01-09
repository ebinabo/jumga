import { Product } from "components";
import { useCart } from "lib/cart";
import { firestore } from "lib/firebase";
import { useRouter } from "next/router";

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	let products = [],
		response = await firestore
			.collection(`merchants/${params.slug}/products`)
			.get();

	response.forEach((doc) => {
		products.push({ id: doc.id, ...doc.data() });
	});

	return {
		props: { products },
	};
}

export default function MerchantStore({ products }) {
	const router = useRouter();
	const cart = useCart();

	if (router.isFallback) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<main>
				<div className="products-container">
					{products &&
						products.map((product) => (
							<Product
								key={product.id}
								product={product}
								showCart
							/>
						))}
				</div>
			</main>
		</>
	);
}
