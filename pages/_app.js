import 'styles/index.css'
import AuthProvider from 'lib/auth'
import { Navigation } from 'components'
import MerchantProvider from 'lib/merchants'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MerchantProvider>
        <Navigation />
        <Component {...pageProps} />
      </MerchantProvider>
    </AuthProvider>
  )
}

export default MyApp
