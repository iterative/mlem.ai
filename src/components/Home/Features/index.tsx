import React from 'react'
import * as styles from './index.module.css'

const featuresData: Array<string> = [
  '<strong>Unambiguous link</strong> between data, code, model and metrics',
  '<strong>Standardised model packaging</strong> with environment and input data specification',
  'Model lifecycle management using <strong>GitOps approach</strong>',
  '<strong>Cloud-agnostic</strong> model deployment'
]

const Features: React.FC = () => {
  return (
    <section id="features" className={styles.features}>
      <h2 className={styles.features__title}>
        Why MLEM<span>_</span>
      </h2>
      <ul className={styles.features__list}>
        {featuresData.map((string, i) => (
          <li
            className={styles.features__feature}
            key={i}
            dangerouslySetInnerHTML={{ __html: string }}
          />
        ))}
      </ul>
    </section>
  )
}

export default Features
