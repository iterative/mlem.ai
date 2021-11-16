import React, { useState } from 'react'
// import cn from 'classnames'
import { StaticImage } from 'gatsby-plugin-image'
import Terminal from '../Terminal'
import Button from '../../Button'
import * as styles from './index.module.css'

const cliCaptionData: Array<{ bold: string; text: string }> = [
  {
    bold: 'Codify your model into a standardized format',
    text: 'Automatically extract environment, methods, and input data specification'
  },
  {
    bold: 'Turn your Git repo into model registry',
    text: 'Reuse existing Git and Github/Gitlab infrastructure for model management'
  },
  {
    bold: 'Use CLI to pack, dockerize and deploy',
    text: 'Easily switch between different packaging formats and cloud providers'
  },
  {
    bold: 'Use Python API to load and apply your models',
    text: 'Load models dynamically from any storage or model registry'
  }
]

const cliSlideData: Array<string> = [
  `
$ python
>>> from training_script import train
>>> model = train()
76%|████████████████████████        | 7568/10000 [00:33<00:10, 229.00it/s]
>>> import mlem
>>> mlem.api.save(model, "./data/model", dvc=True)
>>>
$ tree data/model
data/model
├── artifacts
│   └── data.pkl
└── mlem.yaml
`,
  `
  $ mlem ls --repo https://github.com/iterative/model-registry
Models:
 - pet-face-recognition
 - mlem-blep-classifier
 - dog-bark-translator

$ mlem describe dog-bark-translator --repo https://github.com/iterative/model-registry --rev main
 - 📖 Translates dog barks in emoji.
 - 📦 Pytorch 1.10.0, Torchaudio 0.10.0, Emoji 1.6.1
 - 🎯 Accuracy 87.3%
  `,
  `
  $ mlem deploy dog-bark-translator heroku --repo https://github.com/iterative/model-registry
📩 Downloading model...
🏗️ Building dog-bark-translator:latest docker image...
📤 Pushing docker image to heroku, using envs/heroku.yaml specification...
🚀 Starting application...
💫 Application is live, check it out at https://dog-bark-translator.iterative.ai
  `,
  `
  $ python
>>> import mlem
>>> model = mlem.api.load(
...    "dog-bark-translator",
...    repo="https://github.com/iterative/model-registry"
...)
>>> model.predict("./short-dog-phrase.wav")
🐶🚀🎉
  `
]

const Header: React.FC = () => {
  const [initialSwipeX, setInitialSwipeX] = useState(0)
  const [finalSwipeX, setFinalSwipeX] = useState(0)
  const [selectedCli, setSelectedCli] = useState(0)

  const handleTouchStart = (e: TouchEvent): void => {
    setInitialSwipeX(e.nativeEvent.touches[0].clientX)
  }

  const handleTouchMove = (e: TouchEvent): void => {
    setFinalSwipeX(e.nativeEvent.touches[0].clientX)
  }

  const handleTouchEnd = (): void => {
    let ind =
      selectedCli + 1 <= cliSlideData.length - 1
        ? selectedCli + 1
        : cliSlideData.length - 1
    if (initialSwipeX < finalSwipeX) {
      ind = selectedCli - 1 >= 0 ? selectedCli - 1 : 0
    }
    setSelectedCli(ind)
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>
        <span className={styles.header__titleMain}>
          Open-source model registry and deployment tool for Machine Learning
        </span>
        <span className={styles.header__titleUnderscore}>_</span>
      </h1>
      <ul
        style={{
          '--selected-i': selectedCli,
          '--length': cliSlideData.length
        }}
        className={styles.header__cliSlides}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {cliSlideData.map((text, i) => (
          <li key={i}>
            <Terminal text={text} />
          </li>
        ))}
      </ul>
      <ul
        className={styles.header__cliCaptions}
        style={{
          '--selected-i': selectedCli,
          '--length': cliSlideData.length
        }}
      >
        {cliCaptionData.map(({ bold, text }, i) => (
          <li key={i}>
            <p className={styles.header__text_bold}>{bold}</p>
            <p className={styles.header__text}>{text}</p>
          </li>
        ))}
      </ul>
      <div className={styles.header__buttons}>
        <Button>Become first user</Button>
        <Button icon="github" theme="ghost" disabled>
          Coming Soon
        </Button>
      </div>
      <ul className={styles.header__logos}>
        <li>
          <StaticImage
            src="../../../images/logo/tensorflow.png"
            alt="Tensorflow logo"
          />
        </li>
        <li>
          <StaticImage
            src="../../../images/logo/pytorch.png"
            alt="PyTorch logo"
          />
        </li>
        <li>
          <StaticImage
            src="../../../images/logo/dmlc-xgboost.png"
            alt="dmlc xgboost logo"
          />
        </li>
        <li>
          <StaticImage
            src="../../../images/logo/skikit-learn.png"
            alt="scikit learn logo"
          />
        </li>
        <li>
          <StaticImage
            src="../../../images/logo/light-gbm.png"
            alt="Light GBM logo"
          />
        </li>
        <li>
          <StaticImage
            src="../../../images/logo/catboost.png"
            alt="CatBoost logo"
          />
        </li>
        <li>
          <StaticImage src="../../../images/logo/keras.png" alt="Keras logo" />
        </li>
      </ul>
    </header>
  )
}

export default Header
