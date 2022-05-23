import cn from 'classnames'
import React from 'react'
import SmartLink from '../../SmartLink'

import * as styles from './index.module.css'

const Alert: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <div className={cn(styles.alert, collapsed && styles.collapsed)}>
    Learn how to build{' '}
    <SmartLink href="https://iterative.ai/model-registry">
      Model Registry with MLEM
    </SmartLink>
  </div>
)

export default Alert
