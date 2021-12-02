import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import cn from 'classnames'
import * as styles from './index.module.css'
import './terminal.css'

interface ITerminalProps {
  lines: Array<{ promptString?: string; text: string }>
  setTypedRef: (typed: { destroy: () => void; reset: () => void }) => void
}

const timer = `\`<span class="token number">7</span>%  <span class="token operator">|</span>█             <span class="token operator">|</span> <span class="token number">7568</span>/<span class="token number">10000</span>\`^400
\`<span class="token number">40</span>% <span class="token operator">|</span>██████        <span class="token operator">|</span> <span class="token number">7568</span>/<span class="token number">10000</span>\`^150
\`<span class="token number">76</span>% <span class="token operator">|</span>██████████    <span class="token operator">|</span> <span class="token number">7568</span>/<span class="token number">10000</span>\`^300
\`<span class="token number">100</span>%<span class="token operator">|</span>██████████████<span class="token operator">|</span> <span class="token number">10000</span>/<span class="token number">10000</span>\``

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
