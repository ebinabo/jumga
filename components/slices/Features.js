import { RichText } from "prismic-reactjs";

export default function Features({ slice }) {
	const {
		primary: { header, supporting_text },
		items: features,
	} = slice;

	return (
		<div className="wrapper">
			<h2 className="text-3xl font-semibold">
				{RichText.asText(header)}
			</h2>
			<p>{RichText.asText(supporting_text)}</p>
			<div className="mt-4 grid md:grid-cols-2 xl:grid-cols-4 gap-4">
				{features.map(({ icon, title, content }, index) => (
					<div key={index}>
						<img
							className="h-8 w-8 opacity-80"
							src={`/${icon}.svg`}
							alt=""
						/>
						<h3 className="font-semibold text-xl">
							{RichText.asText(title)}
						</h3>
						<p>{RichText.asText(content)}</p>
					</div>
				))}
			</div>
		</div>
	);
}
