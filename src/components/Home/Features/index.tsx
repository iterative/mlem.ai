import React from 'react'
import * as styles from './index.module.css'

const featuresData: Array<JSX.Element> = [
  <>
    <strong>Unambiguous link</strong> between data, code, model and metrics
  </>,
  <>
    <strong>Standardised model packaging</strong> with environment and input
    data specification
  </>,
  <>
    Model lifecycle management using <strong>GitOps approach</strong>
  </>,
  <>
    <strong>Cloud-agnostic</strong> model deployment
  </>
]

const Features: React.FC = () => {
  return (
    <section id="features">
      <h2 className={styles.features__title}>
        Why MLEM<span>_</span>
      </h2>
      <ul className={styles.features__list}>
        {featuresData.map((el, i) => (
          <li className={styles.features__feature} key={i}>
            {el}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Features
