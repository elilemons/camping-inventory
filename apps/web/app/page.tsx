'use client'

import { useHomePage } from '@/lib/hooks'
import styles from './page.module.css'

export default function Home() {
  const { data: homePage, isLoading, error } = useHomePage()

  if (isLoading) return <div className={styles.page}>Loading...</div>
  if (error) return <div className={styles.page}>Error: {error.message}</div>
  if (!homePage)
    return <div className={styles.page}>No home page set in Payload CMS!</div>

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{homePage.title}</h1>
      </main>
    </div>
  )
}
