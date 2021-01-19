import { RichText } from "prismic-reactjs";

export default function HeroSection({ slice }) {
    const {
        primary: { header, supporting_text },
        items: buttons
    } = slice

    return (
        <div className="h-fill grid place-content-center">
            <header>
                <RichText render={header} />
            </header>
            <p>{RichText.asText(supporting_text)}</p>
            <div className="flex mt-4">
                {
                    buttons.map(
                        ({content, type}, index) => 
                        <button key={index}>{content}</button> 
                    )
                }
            </div>
        </div>
    )
}
