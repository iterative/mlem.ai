import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { ReactComponent as StudioSVG } from '../../../images/icons/studio.svg'
import { ReactComponent as DvcSVG } from '../../../images/icons/dvc.svg'
import { ReactComponent as CmlSVG } from '../../../images/icons/cml.svg'
import { ReactComponent as MlemSVG } from '../../../images/icons/mlem.svg'
import { ReactComponent as ExternalLinkSVG } from '../../../images/icons/external-link.svg'
import { ReactComponent as DownSVG } from '../../../images/icons/down.svg'
import SmartLink from '../../SmartLink'
import * as styles from './index.module.css'

interface IOtherToolsPopupProps {
  navItemClassName: string
}

const otherToolsPopupData: Array<{
  title: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  description: string
  href: string
}> = [
  {
    title: 'Studio',
    icon: StudioSVG,
    description: 'Track experiments and share insights from ML projects',
    href: 'https://studio.iterative.ai/'
  },
  {
    title: 'DVC',
    icon: DvcSVG,
    description: 'Open-source version control system for ML projects',
    href: 'https://dvc.org/'
  },
  {
    title: 'CML',
    icon: CmlSVG,
    description: 'Open-source CI/CD for ML projects',
    href: 'https://cml.dev/'
  },
  {
    title: 'MLEM',
    icon: MlemSVG,
    description:
      'Open-source model registry and deployment tool for ML projects',
    href: '/'
  }
]

const OtherToolsPopup: React.FC<IOtherToolsPopupProps> = ({
  navItemClassName
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const popupContainerEl = useRef<HTMLDivElement>(null)
  let pageCloseEventListener: () => void = () => null
  let keyupCloseEventListener: () => void = () => null

  useEffect(() => {
    return () => {
      pageCloseEventListener()
      keyupCloseEventListener()
    }
  }, [])

  const handlePageClick = (event: MouseEvent): void => {
    if (
      popupContainerEl.current &&
      !popupContainerEl.current.contains(event.target as Node)
    ) {
      closePopup()
    }
  }

  const handlePageKeyup = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      closePopup()
    }
  }

  const setupPopupEventListeners = (): void => {
    document.addEventListener('click', handlePageClick)
    document.addEventListener('keyup', handlePageKeyup)

    pageCloseEventListener = (): void =>
      document.removeEventListener('click', handlePageClick)
    keyupCloseEventListener = (): void =>
      document.removeEventListener('keyup', handlePageKeyup)
  }

  const closePopup = (): void => {
    pageCloseEventListener()
    keyupCloseEventListener()
    setIsVisible(false)
  }

  const openPopup = (): void => {
    setupPopupEventListeners()
    setIsVisible(true)
  }

  const togglePopup = (): void => {
    if (isVisible) {
      closePopup()
    } else {
      openPopup()
    }
  }

  return (
    <div ref={popupContainerEl} className={styles.popupContainer}>
      <button onClick={togglePopup} className={navItemClassName}>
        Other Tools{' '}
        <DownSVG
          className={cn(isVisible && styles.flip)}
          width={8}
          height={8}
        />
      </button>
      <div className={cn(styles.popup, isVisible && styles.popup_visible)}>
        {otherToolsPopupData.map(
          ({ title, icon: Icon, description, href }, i) => (
            <SmartLink
              key={i}
              href={href}
              className={styles.link}
              onClick={closePopup}
            >
              <Icon width={16} height={16} className={styles.link__icon} />
              <h2 className={styles.link__title}>
                {title}
                {/^https?:\/\//.test(href) && <ExternalLinkSVG />}
              </h2>
              <p className={styles.link__description}>{description}</p>
            </SmartLink>
          )
        )}
      </div>
    </div>
  )
}

export default OtherToolsPopup
