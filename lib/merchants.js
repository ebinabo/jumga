import { images } from 'next.config'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth'
import { firestore } from './firebase'

const MerchantContext = createContext()

export function useMerchant() {
    return useContext(MerchantContext)
}

export default function MerchantProvider({ children }) {
    const merchant = useMerchantProvider()
    return <MerchantContext.Provider value={merchant}>{children}</MerchantContext.Provider>
}

function useMerchantProvider() {
    const [merchant, setMerchant] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        let unsubscribe = () => null, temp = []

        if (user) {
            unsubscribe = firestore
                .collection('merchants')
                .where('uid', '==', user.uid)
                .limit(1)
                .onSnapshot(snap => {
                    snap.docs.forEach(doc => {
                        if (doc.exists) {
                            temp.push({ slug: doc.id, ...doc.data() })
                        }
                    })

                    if (temp.length) {
                        setMerchant(temp[0])
                    }
                })
        }

        return () => unsubscribe()
    }, [user])

    return merchant
}