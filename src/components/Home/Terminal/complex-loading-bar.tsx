import React, { useEffect, useRef } from 'react'
import Typed, { TypedOptions } from 'typed.js'
import cn from 'classnames'
import './terminal.css'
import * as styles from './index.module.css'

interface ITerminalProps {
  lines: Array<{ promptString?: string; text: string }>
  setTypedRef: (typed: { destroy: () => void; reset: () => void }) => void
}

// const getCommandStr = (promptStr: string, str: string): string =>
//   `\`${promptStr}\` ${str}^750`

// const getOutputStr = (str: string): string => `\`${str}\``

// const getTerminalString = (
//   lines: Array<{ promptString?: string; text: string }>
// ) =>
//   [
//     ...lines.map(({ promptString, text }) =>
//       promptString ? getCommandStr(promptString, text) : getOutputStr(text)
//     ),

//     '`$`'
//   ].join('\n')

const Terminal: React.FC<ITerminalProps> = ({ setTypedRef }) => {
  const el = useRef<HTMLSpanElement>(null)
  const el2 = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const options: TypedOptions = {
      strings: [`$ sfgjlsfjsdlfj \n <span></span>`],
      typeSpeed: 30,
      cursorChar: '_'
    }
    if (el.current && el2.current) {
      const typed = new Typed(el2.current, options)
      typed.stop()
      setTypedRef(
        new Typed(el.current, { ...options, onComplete: () => typed.start() })
      )
    }
  }, [])

  return (
    <div className={styles.terminal}>
      <div className={styles.terminal__btns}>
        <span className={cn(styles.terminal__btn, 'bg-red-400')}></span>
        <span className={cn(styles.terminal__btn, 'bg-yellow-400')}></span>
        <span className={cn(styles.terminal__btn, 'bg-green-400')}></span>
      </div>
      <pre>
        <span className={styles.terminal__container} ref={el}></span>
        <div></div>
        <span className={styles.terminal__container} ref={el2}></span>
      </pre>
    </div>
  )
}

export default Terminal
