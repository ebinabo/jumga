import { Product } from "components"
import { firestore } from "lib/firebase"
import { useRouter } from 'next/router'

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    let products = [], response = await firestore
        .collection(`merchants/${params.slug}/products`)
        .get()

    response.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() })
    })

    return {
        props: { products }
    }
}

export default function MerchantStore({ products }) {
    const router = useRouter()

    if (router.isFallback) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <>
            <main className="mx-4">
                <div
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:max-w-7xl xl:mx-auto"
                >
                    {
                        products &&
                        products.map(
                            product => <Product key={product.id} {...product} />
                        )
                    }
                </div>
            </main>
        </>
    )
}
