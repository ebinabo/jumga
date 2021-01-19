import SliceMachine from "components/slices";
import { Footer } from "components";
import { getPageData } from "lib/prismic";
import { useRouter } from "next/router";

export async function getStaticProps() {
	const data = await getPageData("home");

	return {
		props: { data },
		revalidate: 1,
	};
}

export default function Home({ data }) {
	const router = useRouter();

	return (
		<div>
			<div className="h-fill grid space-y-4 place-content-center text-center">
				<header className="mx-4 text-3xl sm:text-4xl md:text-5xl lg:text-7xl lg:max-w-5xl leading-snug">
					<span className="text-transparent bg-gradient-to-r bg-clip-text from-green-500 to-blue-500">
						Online Shopping
					</span>{" "}
					for Electronics, Apparel and Everthing else
				</header>

				<p className="">
					Shop for thousands of items from the comfort of your home
				</p>

				<div
					className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 
                        sm:space-x-2 items-center justify-center"
				>
					<button
						onClick={() => router.push("/merchants/edens-jewelery")}
						className="bg-blue-700 text-blue-50 w-40 h-10 rounded-md"
					>
						Start Shopping
					</button>
					<button
						onClick={() => router.push("/merchants")}
						className="border border-blue-700 w-40 h-10 text-blue-700 rounded-md"
					>
						Create Your Shop
					</button>
				</div>
			</div>

			{data.body.map((slice, index) => (
				<SliceMachine slice={slice} key={index} />
			))}
			<Footer />
		</div>
	);
}
