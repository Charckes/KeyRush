import { useSession, signIn, signOut } from "next-auth/react"
import { FcGoogle } from 'react-icons/fc'
import styles from './styles.module.css'

export default function Layout({ children }) {
    const { data: session } = useSession()
    if (!session) {
        return (
            <div className={styles.container}>
                <button onClick={() => signIn('google')} className={styles.button}>
                    Login com Google
                    <FcGoogle className={styles.icon} />
                </button>
            </div>


        )
    }

    return (
        <div className={styles.container}>
            {children}
        </div>

    )
}