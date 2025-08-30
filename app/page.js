import Image from 'next/image'
import styles from './page.module.css'
import Crud from './Crud'


export default function Home() {
  return (
    <main className={styles.main} >
     <Crud />
    </main>
  )
}

