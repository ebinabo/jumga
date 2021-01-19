import "styles/index.css";
import AuthProvider from "lib/auth";
import { Navigation } from "components";
import MerchantProvider from "lib/merchants";
import CartProvider from "lib/cart";
import Head from "next/head";
import Nprogress from "nprogress";
import Router from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
	Router.events.on("routeChangeStart", url => Nprogress.start());
	Router.events.on("routeChangeComplete", url => Nprogress.done());
	Router.events.on("routeChangeError", url => Nprogress.done());

	useEffect(() => {
		Nprogress.configure({ showSpinner: false });
	}, []);

	return (
		<AuthProvider>
			<MerchantProvider>
				<CartProvider>
					<Head>
						<title>Jumga E-Commerce</title>
					</Head>
					<Navigation />
					<Component {...pageProps} />
				</CartProvider>
			</MerchantProvider>
		</AuthProvider>
	);
}

export default MyApp;
