import { RichText } from "prismic-reactjs";

export default function Newsletter({ slice }) {
	const {
		primary: { header, supporting_text },
	} = slice;

	return (
		<div className="wrapper">
			<div className=" w-full pt-12 pb-12 text-white ">
				<div className="bg-blue-600 px-8 pb-12 pt-12 flex justify-between rounded-md">
					<div>
						<h3 className="font-semibold text-2xl">
							Want products news and updates ?
						</h3>
						<p className="text-sm font-thin mt-2">
							Sign up for our newsletter to stay up to date
						</p>
					</div>
					<div>
						<input
							type="text"
							value=""
							readOnly
							placeholder="Enter your email"
							className=" outline-none h-12 w-64 p-2 rounded-lg placeholder-text-sm"
						/>
						<button className=" outline-none bg-twilpurple rounded-lg  px-4 h-12 ml-4">
							Notify me
						</button>
						<p className="font-thin text-sm mt-2">
							We care about the protection of your data. Read our{" "}
							<span className="font-normal text-sm underline">
								<a>Privacy Policy</a>
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
