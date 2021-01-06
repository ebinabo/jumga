import { createContext, useContext, useEffect, useState } from 'react'
import firebase, { firestore } from './firebase'

const updateUser = async (uid, data) => {
    return firestore
        .collection('users')
        .doc(uid)
        .set({uid, ...data}, {merge: true})
}

const parseUser = user => {
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photo: user.photoURL,
        createdAt: user.metadata.creationTime,
        lastSeen: user.metadata.lastSignInTime
    }
}

const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const auth = useAuthProvider()
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

function useAuthProvider() {
    const [user, setUser] = useState(null)

    const signin = (email, password) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                return parseUser(response.user)
            })
    }

    const signup = (email, password) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                return parseUser(response.user)
            })
    }

    const signinWithGoogle = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider)
            .then(response => {
                return parseUser(response.user)
            })
    }

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false)
            })
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(parseUser(user))
                console.log(user.toJSON())
                updateUser(user.uid, parseUser(user))
            } else {
                setUser(false)
            }
        })

        return () => unsubscribe()
    }, [])

    return {
        user,
        signin,
        signup,
        signinWithGoogle,
        signout
    }
}
