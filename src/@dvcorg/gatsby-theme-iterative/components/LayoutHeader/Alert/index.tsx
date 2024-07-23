import cn from 'classnames'
import React from 'react'
import { AlertContent } from '@dvcorg/gatsby-theme-iterative/src/components/LayoutHeader/Alert/content'

import * as styles from './index.module.css'

const Alert: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <div className={cn(styles.alert, collapsed && styles.collapsed)}>
    <div className={styles.text}>
      <p>
        <AlertContent />
      </p>
    </div>
  </div>
)

export default Alert
