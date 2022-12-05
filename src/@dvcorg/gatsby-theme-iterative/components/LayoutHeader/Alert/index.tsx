import cn from 'classnames'
import React from 'react'
import SmartLink from '../../../../../components/SmartLink'

import * as styles from './index.module.css'

const Alert: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <div className={cn(styles.alert, collapsed && styles.collapsed)}>
    <div className={styles.text}>
      <span className={styles.icon} role="img" aria-label="rocket">
        🚀
      </span>{' '}
      <p>
        MLEM now offers{' '}
        <SmartLink href="https://iterative.ai/blog/mlem-k8s-sagemaker">
          deployment to Kubernetes and Sagemaker
        </SmartLink>{' '}
        with a single command.
      </p>
    </div>
  </div>
)

export default Alert
