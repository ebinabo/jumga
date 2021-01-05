import CustomerSupportCTA from './CustomerSupportCTA'
import Features from './Features'
import HeroSection from './HeroSection'
import Newsletter from './Newsletter'
import ProductShowcase from './ProductShowcase'
import Testimonials from './Testimonials'

export default function SliceMachine({ slice }) {
    const slices = {
        'customer_support': <CustomerSupportCTA slice={slice} />,
        'features': <Features slice={slice} />,
        'hero_section': <HeroSection slice={slice} />,
        'newsletter': <Newsletter slice={slice} />,
        'product_showcase': <ProductShowcase slice={slice} />,
        'testimonials': <Testimonials slice={slice} />,
    }

    return slices[slice.slice_type] || null
}
