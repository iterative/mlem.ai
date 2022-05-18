import React from 'react'
import * as styles from './index.module.css'

const featuresData: Array<JSX.Element> = [
  <>
    <strong>Git-native</strong> ML model development. Enable GitFlow and other
    software engineering best practices.
  </>,
  <>
    <strong>Automatically detect</strong> ML framework, Python requirements, and
    data schema.
  </>,
  <>
    <strong>Seamlessly integrating</strong> to your stack thanks to Unix
    philosophy: one tool solves one problem very well.
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
