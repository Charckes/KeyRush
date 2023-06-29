import { useSession, signOut } from "next-auth/react";
import styles from './styles.module.css'
import Image from "next/image";
import Score from "../Score";
export default function Nav() {
    const { data: session } = useSession()
    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <div className={styles.left}>
                    <li className={styles.logo}>KeyRush</li>
                </div>
                <div className={styles.right}>
                    <li className={styles.name}>
                        {session?.user?.name}
                    </li>
                    <Image className={styles.img} alt={session?.user?.name} src={session?.user?.image} width={60} height={60}></Image>
                </div>
                <li>
                    <button className={styles.exit} onClick={() => signOut()}>
                        Sair
                    </button>
                </li>
            </ul>
            <Score />
        </nav>
    )
}