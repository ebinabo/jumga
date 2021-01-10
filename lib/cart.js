import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useReducer } from "react";

const maxInventoryAmount = (amountToCheck, availableAmount) => {
	return amountToCheck <= availableAmount ? amountToCheck : availableAmount;
};

const reducer = (state, { data, id, type }) => {
	switch (type) {
		case "init":
			return data;
		case "add":
			const currentIndex = state.findIndex(item => data.id === item.id);

			if (currentIndex === -1) {
				return [...state, data];
			} else {
				return [
					...state.reduce((acc, next) => {
						if (next.id === data.id) {
							next.amount = maxInventoryAmount(
								data.amount + next.amount,
								10
							);
						}

						acc.push(next);

						return acc;
					}, []),
				];
			}
		case "remove":
			return state.filter(item => item.id !== id);
		case "reset":
			return [];
		default:
			return state;
	}
};

const CartContext = createContext();

export const useCart = () => {
	return useContext(CartContext);
};

export default function CartProvider({ children }) {
	const cart = useCartProvider();
	return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

function useCartProvider() {
	const {
		query: { slug },
	} = useRouter();
	const [cart, dispatch] = useReducer(reducer, []);
	const getCart = slug => JSON.parse(localStorage.getItem(slug));
	const setCart = (slug, data) =>
		localStorage.setItem(slug, JSON.stringify(data));
	const addItem = data => dispatch({ type: "add", data });
	const removeItem = id => dispatch({ type: "remove", id });
	const resetCart = slug => {
		dispatch({ type: "reset" });
		localStorage.removeItem(slug);
	};

	useEffect(() => {
		if (slug) {
			const cart = getCart(slug);
			if (cart) dispatch({ type: "init", data: cart });
		}
	}, [slug]);

	useEffect(() => {
		if (cart.length) {
			setCart(slug, cart);
		}
	}, [cart.length]);

	return { cart, addItem, removeItem, resetCart };
}
