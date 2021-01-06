import { Authentication } from 'components'
import { useMerchant } from 'lib/merchants'

export default function CreateProfile() {
    const merchant = useMerchant()

    if (!merchant) {
        return <Authentication />
    }

    return (
        <div>
            
        </div>
    )
}
