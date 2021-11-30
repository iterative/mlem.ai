import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import cn from 'classnames'
import * as styles from './index.module.css'

interface ITerminalProps {
  lines: Array<{ promptString?: string; text: string }>
  setTypedRef: (typed: { destroy: () => void; reset: () => void }) => void
}

const timer = `\`7%  |█             | 7568/10000\`^400
\`40% |██████        | 7568/10000\`^150
\`76% |██████████    | 7568/10000\`^300
\`100%|██████████████| 10000/10000\``

const getCommandStr = (promptStr: string, str: string): string =>
  `\`${promptStr}\` ${str}^750`

const getOutputStr = (str: string): string => `\`${str}\``

const getTerminalString = (
  lines: Array<{ promptString?: string; text: string }>
) =>
  [
    ...lines.map(({ promptString, text }) => {
      if (text === '<loadingbar></loadingbar>') {
        return timer
      }
      return promptString
        ? getCommandStr(promptString, text)
        : getOutputStr(text)
    }),
    '`$`'
  ].join('\n')

const Terminal: React.FC<ITerminalProps> = ({ lines, setTypedRef }) => {
  const el = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const options = {
      strings: [getTerminalString(lines)],
      smartBackspace: false,
      typeSpeed: 30,
      cursorChar: '_'
    }

    if (el.current) {
      setTypedRef(new Typed(el.current, options))
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
      </pre>
    </div>
  )
}

export default Terminal
