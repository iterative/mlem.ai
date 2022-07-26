import cn from 'classnames'
import React from 'react'
import SmartLink from '../../SmartLink'

import * as styles from './index.module.css'

const Alert: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <div className={cn(styles.alert, collapsed && styles.collapsed)}>
    <div className={styles.text}>
      <span className={styles.icon} role="img" aria-label="rocket">
        🚀
      </span>{' '}
      <p>
        New Release!{' '}
        <SmartLink href="https://dvc.org/blog/iterative-studio-model-registry">
          Git-backed Machine Learning Model Registry
        </SmartLink>{' '}
        for all your model management needs.
      </p>
    </div>
  </div>
)

export default Alert
