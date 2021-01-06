import { useAuth } from "lib/auth"
import { useReducer } from "react"

export default function Authentication() {
    const { user, signinWithGoogle, ...auth } = useAuth()
    const [{ email, password, isNewUser }, dispatch] = useReducer(
        (state, {key, value}), 
        {
            email: '',
            password: '',
            isNewUser: false
        }
    )

    
    const signin = e => {
        e.preventDefault()
        auth.signin(email, password)
    }
    
    const signup = e => {
        e.preventDefault()
        auth.signup(email, password)
    }

    return (
        <form>
            <div>
                <label htmlFor="email" className="sr-only">E-mail</label>
                <input 
                    id="email" type="text" value={email} placeholder="E-mail Address"
                    onChange={e => dispatch({ key: 'email', value: e.target.value })}
                />
            </div> 

            <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input 
                    id="password" type="text" value={password} placeholder="Password"
                    onChange={e => dispatch({ key: 'password', value: e.target.value })}
                />
            </div> 

            {
                isNewUser ? (
                    <button
                        onClick={signup}
                    >
                        Sign Up
                    </button>
                ) : (
                    <button
                        onClick={signin}
                    >
                        Sign In
                    </button>
                )
            }

            <p>or</p>

            <button
                onClick={
                    e => {
                        e.preventDefault()
                        signinWithGoogle()
                    }
                }
            >
                Continue with Google
            </button>
        </form>
    )
}
