import Image from 'next/image'
import { RichText } from "prismic-reactjs";

export default function CustomerSupportCTA({ slice }) {
    const {
        primary: { content, headline, cta, image, title }
    } = slice

    return (
        <div>
            <div className="relative h-32 w-1/2">
                <Image
                    src={image.url}
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            <div>
                <h3>{RichText.asText(headline)}</h3>
                <h2>{RichText.asText(title)}</h2>
                <p>{RichText.asText(content)}</p>
                <button>{cta}</button>
            </div>
        </div>
    )
}
