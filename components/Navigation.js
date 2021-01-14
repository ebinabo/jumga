import { useAuth } from "lib/auth";
import { useCart } from "lib/cart";
import NextLink from "next/link";
import { useRouter } from "next/router";

export const Link = ({ to, children, ...rest }) => {
	return (
		<NextLink href={to}>
			<a {...rest}>{children}</a>
		</NextLink>
	);
};

export default function Navigation() {
	const { user, signout } = useAuth();
	const { cart } = useCart();
	const {
		query: { slug },
	} = useRouter();

	return (
		<div className="flex justify-between items-center h-12 wrapper">
			<Link to="/">
				<img className="h-6" src="/logo.png" alt="Jumga logo" />
			</Link>

			<div className="flex space-x-2">
				<Link to="/merchants">Merchants</Link>
				{slug && (
					<Link className="relative" to={`/merchants/${slug}/cart`}>
						<div
							className={`absolute right-0 top-0 h-2 w-2 bg-accentOne-500 rounded-full ${
								cart.length ? "visible" : "invisible"
							}`}
						/>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.25}
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
					</Link>
				)}
			</div>
		</div>
	);
}
