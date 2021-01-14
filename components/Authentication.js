import { useAuth } from "lib/auth";
import { useReducer } from "react";

export default function Authentication() {
	const { user, signinWithGoogle, ...auth } = useAuth();
	const [{ email, password, isNewUser, showPassword }, dispatch] = useReducer(
		(state, { key, value }) => ({ ...state, [key]: value }),
		{
			email: "",
			password: "",
			isNewUser: false,
			showPassword: false,
		}
	);

	const signin = e => {
		e.preventDefault();
		auth.signin(email, password);
	};

	const signup = e => {
		e.preventDefault();
		auth.signup(email, password);
	};

	return (
		<form className="h-fill grid place-content-center">
			<div>
				<label htmlFor="email" className="sr-only">
					E-mail
				</label>
				<input
					id="email"
					type="text"
					value={email}
					placeholder="E-mail Address"
					className="border rounded-md w-72 h-10 px-4"
					onChange={e =>
						dispatch({ key: "email", value: e.target.value })
					}
				/>
			</div>

			<div className="mt-2 relative">
				<label htmlFor="password" className="sr-only">
					Password
				</label>
				<input
					id="password"
					type={`${showPassword ? "text" : "password"}`}
					value={password}
					placeholder="Password"
					className="border rounded-md w-72 h-10 px-4"
					onChange={e =>
						dispatch({ key: "password", value: e.target.value })
					}
				/>

				{
					<button
						className="absolute top-2 right-4 focus:outline-none"
						onClick={e => {
							e.preventDefault();
							dispatch({
								key: "showPassword",
								value: !showPassword,
							});
						}}
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							{showPassword ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
								/>
							) : (
								<>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</>
							)}
						</svg>
					</button>
				}
			</div>

			<button
				className="bg-secondary-200 mt-4 rounded py-0.5 text-secondary-800 font-semibold shadow"
				onClick={isNewUser ? signup : signin}
			>
				{isNewUser ? "Sign Up" : "Sign In"}
			</button>

			<p className="text-center">or</p>

			<button
				onClick={e => {
					e.preventDefault();
					signinWithGoogle();
				}}
				className="flex items-center justify-center border rounded py-0.5 shadow"
			>
				Continue with Google
				<img
					className="h-4 ml-2"
					src="/goog-logo.png"
					alt="google logo"
				/>
			</button>

			<button
				className="text-sm justify-self-end focus:outline-none mt-4"
				onClick={e => {
					e.preventDefault();
					dispatch({ key: "isNewUser", value: !isNewUser });
				}}
			>
				{isNewUser ? "Already have an account?" : "New here?"}
			</button>
		</form>
	);
}
