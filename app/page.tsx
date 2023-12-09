import Navbar from './components/Navbar'
import { getCurrentUser } from './lib/session'
import styles from '@/app/sass/navbar.module.sass'

export default async function Home() {
  const user = await getCurrentUser()
  //console.log(user)
  return (
    <div className={styles.navbar_space}>
      <Navbar/>
    </div>
  )
}
