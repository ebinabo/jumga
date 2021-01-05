import { RichText } from "prismic-reactjs";

export default function Features({ slice }) {
    const {
        primary: { header, supporting_text },
        items: features
    } = slice

    return (
        <div>
            <h2>{RichText.asText(header)}</h2>
            <p>{RichText.asText(supporting_text)}</p>
            <div>
                {
                    features.map(
                        ({icon, title, content}, index) =>
                        <div key={index}>
                            <h3>{RichText.asText(title)}</h3>
                            <p>{RichText.asText(content)}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
