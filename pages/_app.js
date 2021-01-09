import "styles/index.css";
import AuthProvider from "lib/auth";
import { Navigation } from "components";
import MerchantProvider from "lib/merchants";
import CartProvider from "lib/cart";

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<MerchantProvider>
				<CartProvider>
					<Navigation />
					<Component {...pageProps} />
				</CartProvider>
			</MerchantProvider>
		</AuthProvider>
	);
}

export default MyApp;
