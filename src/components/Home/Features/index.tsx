import React from 'react'
import * as styles from './index.module.css'

const featuresData: Array<JSX.Element> = [
  <>
    Automatic <strong>ML framework</strong> detection. How about saving a Python
    function that averages few models?
  </>,
  <>
    Pinning down the exact list of <strong>Python requirements</strong>. Nothing
    extra.
  </>,
  <>
    Generating <strong>schema for input and output data</strong> for you. No
    manual work.
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
