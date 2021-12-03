import React, { useEffect, useRef, useState } from 'react'
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

const getRandomDelay = () => `^${Math.floor(250 + Math.random() * (500 - 250))}`

const getCommandStr = (promptStr: string, str: string): string =>
  `\`${promptStr}\` ${str}${getRandomDelay()}`

const getOutputStr = (str: string): string =>
  `\`${str.replace(/<delay><\/delay>/g, '')}\`${
    str.endsWith('<delay></delay>') ? getRandomDelay() : ''
  }`

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
  const [showAllText, setShowAllText] = useState(false)
  const terminalEl = useRef<HTMLDivElement>(null)
  const el = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let hasTypingStarted = false
    const options = {
      strings: [getTerminalString(lines)],
      smartBackspace: false,
      typeSpeed: 30,
      cursorChar: '_',
      onBegin: () => (hasTypingStarted = true),
      onComplete: () => (hasTypingStarted = false),
      onDestroy: () => {
        hasTypingStarted = false
        setShowAllText(true)
      }
    }
    const interval = setInterval(() => {
      if (hasTypingStarted && terminalEl.current) {
        terminalEl.current.scrollTop = terminalEl.current.scrollHeight
      }
    }, 100)

    if (el.current) {
      setTypedRef(new Typed(el.current, options))
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div ref={terminalEl} className={styles.terminal}>
      <div className={styles.terminal__btns}>
        <span className={cn(styles.terminal__btn, 'bg-red-400')}></span>
        <span className={cn(styles.terminal__btn, 'bg-yellow-400')}></span>
        <span className={cn(styles.terminal__btn, 'bg-green-400')}></span>
      </div>
      <pre>
        <span className={styles.terminal__container} ref={el}></span>
        {showAllText && (
          <span
            dangerouslySetInnerHTML={{
              __html: getTerminalString(lines).replace(
                /(\`|\^\d+|<delay><\/delay>)+/g,
                ''
              )
            }}
            className={styles.terminal__container}
          ></span>
        )}
      </pre>
    </div>
  )
}

export default Terminal
