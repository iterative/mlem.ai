import React, { ReactNode } from 'react'
import cn from 'classnames'
import { ReactComponent as StudioSVG } from '../../../../../images/icons/studio.svg'
import { ReactComponent as DvcSVG } from '../../../../../images/icons/dvc.svg'
import { ReactComponent as ExternalLinkSVG } from '../../../../../images/icons/external-link.svg'
import { ReactComponent as DownSVG } from '../../../../../images/icons/down.svg'
import { ReactComponent as VsCodeSVG } from '../../../../../images/icons/vscode.svg'

import SmartLink from '../../../../../components/SmartLink'
import * as styles from './index.module.css'
import usePopup from '../../../../../utils/hooks/usePopup'
import onSelectKey from '../../../../../utils/onSelectKey'

interface IOtherToolsPopupProps {
  navItemClassName: string
}

const otherToolsPopupData: Array<{
  title: string
  titleImg?: React.FC<React.SVGProps<SVGSVGElement>>
  icon: React.FC<React.SVGProps<SVGSVGElement>> | React.FC | null
  customIcon?: ReactNode
  description: string
  href: string
}> = [
  {
    title: 'DataChain',
    icon: null,
    customIcon: <span className="text-xl flex justify-end">🔗</span>,
    description:
      'Wrangle unstructured data in Python using AI helpers at scale',
    href: 'https://github.com/iterative/datachain'
  },
  {
    title: 'DVC',
    icon: DvcSVG,
    description: 'Open-source version control system for ML projects',
    href: 'https://dvc.org/'
  },
  {
    title: 'DVC Studio',
    icon: StudioSVG,
    description: 'Track experiments and share insights from ML projects',
    href: 'https://studio.iterative.ai/'
  },
  {
    title: 'VS Code Extension',
    titleImg: VsCodeSVG,
    icon: DvcSVG,
    description: 'Local ML model development and experiment tracking',
    href: 'https://marketplace.visualstudio.com/items?itemName=Iterative.dvc'
  }
]

const OtherToolsPopup: React.FC<IOtherToolsPopupProps> = ({
  navItemClassName
}) => {
  const otherToolsPopup = usePopup()

  return (
    <div
      ref={otherToolsPopup.containerEl}
      className={styles.popupContainer}
      onMouseEnter={otherToolsPopup.open}
      onMouseLeave={otherToolsPopup.close}
    >
      <button
        onPointerUp={otherToolsPopup.toggle}
        onKeyUp={onSelectKey(otherToolsPopup.toggle)}
        className={navItemClassName}
      >
        More Tools{' '}
        <DownSVG
          className={cn(otherToolsPopup.isOpen && styles.flip)}
          width={8}
          height={8}
        />
      </button>
      <div
        className={cn(
          styles.popup,
          otherToolsPopup.isOpen && styles.popup_visible
        )}
      >
        {otherToolsPopupData.map(
          (
            {
              title,
              icon: Icon,
              customIcon,
              description,
              href,
              titleImg: TitleImg
            },
            i
          ) => (
            <SmartLink
              key={i}
              href={href}
              className={styles.link}
              onClick={otherToolsPopup.close}
            >
              {customIcon ? (
                customIcon
              ) : Icon ? (
                <Icon width={16} height={16} className={styles.link__icon} />
              ) : null}
              <h2 className={styles.link__title}>
                {title}
                {TitleImg && <TitleImg />}
                {/^https?:\/\//.test(href) && (
                  <ExternalLinkSVG className={styles.link__titleLinkIcon} />
                )}
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
