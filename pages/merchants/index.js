import { getPageData } from "lib/prismic"

export async function getStaticProps() {
    const data = await getPageData('merchants')

    return {
        props: { data }
    }
}

export default function Merchants({ data }) {
    return (
        <div>
            {
                data.body.map(
                    (slice, index) => 
                    <SliceMachine slice={slice} key={index} />
                )
            }  
        </div>
    )
}
