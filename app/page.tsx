import Navbar from './components/Navbar'
import { getCurrentUser } from './lib/session'
import styles from '@/app/sass/navbar.module.sass'
import Banner from './components/Banner'
import Container from './components/container/Container'
import SubMain from './components/SubMain'
import Footer from './components/Footer'

export default async function Home() {
  const user = await getCurrentUser()
  //console.log(user)
  return (
    <div className={styles.navbar_space}>
      <Navbar/>
      <Banner/>
      <SubMain/>
      <Footer/>
    </div>
  )
}
