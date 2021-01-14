import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { firestore } from "./firebase";
import { useRouter } from "next/router";

const MerchantContext = createContext();

export function useMerchant() {
	return useContext(MerchantContext);
}

export default function MerchantProvider({ children }) {
	const merchant = useMerchantProvider();
	return (
		<MerchantContext.Provider value={merchant}>
			{children}
		</MerchantContext.Provider>
	);
}

function useMerchantProvider() {
	const [merchant, setMerchant] = useState(false);
	const { push, asPath } = useRouter();
	const { user } = useAuth();

	useEffect(() => {
		let unsubscribe = () => null,
			temp = [];

		if (user) {
			unsubscribe = firestore
				.collection("merchants")
				.where("owner", "==", user.uid)
				.limit(1)
				.onSnapshot(snap => {
					snap.docs.forEach(doc => {
						if (doc.exists) {
							temp.splice(0, 1, { slug: doc.id, ...doc.data() });
						}
					});

					if (temp.length) {
						setMerchant(temp[0]);
					}
				});
		}

		return () => unsubscribe();
	}, [user]);

	useEffect(() => {
		if (asPath.includes("dashboard") && !asPath.includes("create")) {
			if (!merchant) push("/dashboard/profile/create");
		}
	}, [asPath]);

	return merchant;
}
