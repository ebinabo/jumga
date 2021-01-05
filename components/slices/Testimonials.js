import Image from 'next/image'
import { RichText } from "prismic-reactjs";
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Navigation } from 'swiper'

SwiperCore.use([Autoplay, Navigation])

export default function Testimonials({ slice }) {
    const {
        items: testimonials
    } = slice

    return (
        <div>
            <div className="flex bg-gray-200">          
                <svg id="prev" className="h-6 w-8 text-gray-900" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>         
                <svg id="next" className="h-6 w-8 text-gray-900" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> 
            </div>
            <Swiper
                loop
                autoplay={{delay: 7000}} 
                navigation={{
                    prevEl: '#prev',
                    nextEl: '#next'
                }}
            >
                {
                    testimonials.map(
                        ({company, name, testimonial, thumbnail}, index) =>
                        <SwiperSlide key={index}>
                            <div className="w-32 h-32 relative">
                                <Image 
                                    src={thumbnail.url}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <h3>{RichText.asText(name)}</h3>
                            <p>{RichText.asText(testimonial)}</p>
                            <p>{company}</p>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    )
}
