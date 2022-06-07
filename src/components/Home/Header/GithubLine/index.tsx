import React from 'react'
import Link from '@dvcorg/gatsby-theme-iterative/src/components/Link'

import { ReactComponent as GithubIcon } from '../../../../images/icons/github_icon.svg'
import { ReactComponent as StarIcon } from '../../../../images/icons/star.svg'

import useStars from '../../../../utils/hooks/useStars'

import * as styles from './styles.module.css'

const GithubLine: React.FC = () => {
  const stars = useStars()

  return (
    <div className={styles.githubLine}>
      <GithubIcon width="20" height="20" className={styles.githubLogo} />
      We’re on
      <Link href="https://github.com/iterative/mlem" className={styles.link}>
        GitHub
      </Link>
      {stars && (
        <div className={styles.stars}>
          <StarIcon width="11" height="11" className={styles.star} />
          <div className={styles.count}>{stars}</div>
        </div>
      )}
    </div>
  )
}

export default GithubLine
