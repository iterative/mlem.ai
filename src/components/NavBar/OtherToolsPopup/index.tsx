import React from 'react'
import cn from 'classnames'
import { ReactComponent as StudioSVG } from '../../../images/icons/studio.svg'
import { ReactComponent as DvcSVG } from '../../../images/icons/dvc.svg'
import { ReactComponent as CmlSVG } from '../../../images/icons/cml.svg'
import { ReactComponent as MlemSVG } from '../../../images/icons/mlem.svg'
import { ReactComponent as ExternalLinkSVG } from '../../../images/icons/external-link.svg'
import SmartLink from '../../SmartLink'
import * as styles from './index.module.css'

interface IOtherToolsPopupProp {
  isVisible: boolean
  closePopup: () => void
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

const OtherToolsPopup: React.FC<IOtherToolsPopupProp> = ({
  isVisible,
  closePopup
}) => {
  return (
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
  )
}

export default OtherToolsPopup
