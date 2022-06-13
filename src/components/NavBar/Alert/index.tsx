import cn from 'classnames'
import React from 'react'
import SmartLink from '../../SmartLink'
import vscodeSvg from '../../../images/icons/vscode.svg'

import * as styles from './index.module.css'

const Alert: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <div className={cn(styles.alert, collapsed && styles.collapsed)}>
    <div className={styles.text}>
      <img className={styles.textSvg} src={vscodeSvg} alt="VS Code Logo" />
      <p>
        Check out our{' '}
        <SmartLink href="https://marketplace.visualstudio.com/items?itemName=Iterative.dvc">
          new VS Code extension
        </SmartLink>{' '}
        for experiment tracking and model development
      </p>
    </div>
  </div>
)

export default Alert
