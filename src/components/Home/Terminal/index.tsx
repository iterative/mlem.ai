import React from 'react'
import cn from 'classnames'
import * as styles from './index.module.css'

interface ITerminalProps {
  text: string
}

const Terminal: React.FC<ITerminalProps> = ({ text }) => {
  return (
    <div className={styles.terminal}>
      <div className={styles.terminal__btns}>
        <span className={cn(styles.terminal__btn, 'bg-red-400')}></span>
        <span className={cn(styles.terminal__btn, 'bg-yellow-400')}></span>
        <span className={cn(styles.terminal__btn, 'bg-green-400')}></span>
      </div>
      <div>{text}</div>
    </div>
  )
}

export default Terminal
