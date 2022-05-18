import React from 'react'
import * as styles from './index.module.css'

const featuresData: Array<JSX.Element> = [
  <>
    <strong>Automatically detect</strong> ML framework, Python requirements,
    and data schema.
  </>,
  <>
    <strong>Deploy any model</strong> to any platform.
  </>,
  <>
    <strong>Git-native</strong> ML model development
  </>,
  <>
    <strong>Seamless integration</strong> with other Iterative tools (DVC, CML, etc.)
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
