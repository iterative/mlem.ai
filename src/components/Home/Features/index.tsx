import React from 'react'
import * as styles from './index.module.css'

const featuresData: Array<JSX.Element> = [
  <>
    <strong>Automatically detecting</strong> ML framework, Python requirements,
    and data schema
  </>,
  <>
    Deploy <strong>any</strong> model to <strong>any</strong> platform
  </>,
  <>
    Ready for <strong>Git-centered ML models development</strong>
  </>,
  <>
    <strong>Seamless integration</strong> with other Iterative tools DVC, CML
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
