import { RichText } from "prismic-reactjs";

export default function Newsletter({ slice }) {
    const {
        primary: { header, supporting_text }
    } = slice

    return (
        <div>
            <h2>{RichText.asText(header)}</h2>
            <p>{RichText.asText(supporting_text)}</p>
            <div>
                form goes here
            </div>
        </div>
    )
}
