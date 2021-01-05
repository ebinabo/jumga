import Image from 'next/image'
import { RichText } from "prismic-reactjs";

export default function ProductShowcase({ slice }) {
    const {
        primary: { content, cta, header, image }
    } = slice

    return (
        <div>
            <div className="w-32 h-32 relative">
                <Image
                    src={image.url}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <h2>{RichText.asText(header)}</h2>
            <p>{RichText.asText(content)}</p>
            <button>{cta}</button>
        </div>
    )
}
