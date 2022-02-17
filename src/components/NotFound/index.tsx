import * as React from 'react'
import SmartLink from '../SmartLink'
import NavBar from '../NavBar'
import Footer from '../Footer'
import * as styles from './index.module.css'

const NotFoundPage: React.FC = () => (
  <>
    <NavBar />
    <header className={styles.header}>
      <h1 className={styles.header__title}>Page not found</h1>
      <p className={styles.header__text}>
        The page you&apos;re looking for doesn&apos;t exist, or an error
        occurred. Please check your internet connection or{' '}
        <SmartLink href="/">go back to home</SmartLink>.
      </p>
    </header>
    <Footer />
  </>
)

export default NotFoundPage
