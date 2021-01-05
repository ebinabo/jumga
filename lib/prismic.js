import Prismic from '@prismicio/client'

const apiEndpoint = 'https://jumga.cdn.prismic.io/api/v2'
const accessToken = process.env.PRISMIC_ACCESS_TOKEN

const Client = Prismic.client(apiEndpoint, { accessToken })

export const getPageData = async uid => {
    const response = await Client.getByUID('landing_page', uid)

    return response.data
}