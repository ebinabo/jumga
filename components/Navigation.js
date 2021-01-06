import { useAuth } from "lib/auth"
import NextLink from 'next/link'

export const Link = ({ to, children, ...rest }) => {
    return (
        <NextLink href={to}>
            <a {...rest}>{children}</a>
        </NextLink>
    )
}

export default function Navigation() {
    const { user, signout } = useAuth()
    
    return (
        <div
            className="flex justify-between"
        >
            <Link to='/'>
                Home
            </Link>

            <div>
                <Link to='/merchants'>Merchants</Link>
            </div>
        </div>
    )
}
