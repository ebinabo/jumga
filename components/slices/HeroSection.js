import { RichText } from "prismic-reactjs";

export default function HeroSection({ slice }) {
    const {
        primary: { header, supporting_text },
        items: buttons
    } = slice

    return (
        <div>
            <h1>{RichText.asText(header)}</h1>
            <p>{RichText.asText(supporting_text)}</p>
            {
                buttons.map(
                    ({content, type}, index) => 
                    <button key={index}>{content}</button> 
                )
            }
        </div>
    )
}
