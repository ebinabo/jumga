import Image from "next/image";
import { RichText } from "prismic-reactjs";

export default function CustomerSupportCTA({ slice }) {
	const {
		primary: { content, headline, cta, image, title },
	} = slice;

	return (
		<div className="grid md:grid-cols-2 md:items-center h-72 items-center">
			<div className="relative h-full w-full">
				<Image src={image.url} layout="fill" objectFit="cover" />
			</div>

			<div className="bg-gray-600 h-full px-4">
				<h3 className="uppercase">{RichText.asText(headline)}</h3>
				<h2 className="font-semibold text-2xl">
					{RichText.asText(title)}
				</h2>
				<p>{RichText.asText(content)}</p>
				<button className="bg-white shadow-sm mt-4">{cta}</button>
			</div>
		</div>
	);
}
