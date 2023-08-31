import cn from 'classnames'
import React from 'react'

import * as styles from './index.module.css'

const Alert: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <div className={cn(styles.alert, collapsed && styles.collapsed)}>
    <div className={styles.text}>
      <span className={styles.icon} role="img" aria-label="rocket">
        📦
      </span>{' '}
      <p>
        MLEM project is archived. You can use it, but no further support is
        planned. Thank you for being with us!
      </p>
    </div>
  </div>
)

export default Alert
