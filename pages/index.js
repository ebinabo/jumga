import SliceMachine from "components/slices"
import { getPageData } from "lib/prismic"

export async function getStaticProps() {
    const data = await getPageData('home')

    return {
        props: { data }
    }
}

export default function Home({ data }) {
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
