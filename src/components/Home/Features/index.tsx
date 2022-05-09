import React from 'react'
import * as styles from './index.module.css'

const featuresData: Array<JSX.Element> = [
  <>
    <strong>Ease of use</strong>. Detecting ML framework, Python requirements,
    and input data schema automatically
  </>,
  <>
    <strong>Deploy any model to any platform</strong> or pack it to any format.
    Switch between providers with a few lines of code
  </>,
  <>
    <strong>Ready for Git-centered ML models development</strong>. Check out
    handy integrations with Iterative.ai ecosystem
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
