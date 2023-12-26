import { Loader } from '@gravity-ui/uikit'
import styles from './pageLoader.module.scss'

export const PageLoader = () => (
  <div className={styles.loaderContainer}>
    <div className={styles.loader}>
      <Loader size="l" />
    </div>
  </div>
)
