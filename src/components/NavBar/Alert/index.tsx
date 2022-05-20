import cn from 'classnames'
import React from 'react'
import SmartLink from '../../SmartLink'

import * as styles from './index.module.css'

const Alert: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <div className={cn(styles.alert, collapsed && styles.collapsed)}>
    <p>
      Learn how to build{' '}
      <SmartLink href="https://iterative.ai/model-registry">
        Model Registry with MLEM
      </SmartLink>
    </p>
  </div>
)

export default Alert
