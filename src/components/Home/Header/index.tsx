import React, { useEffect, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import cn from 'classnames'
import Terminal from '../Terminal'
import Button from '../../Button'
import tensorflowLogo from '../../../images/logo/tensorflow.png'
import pytorchLogo from '../../../images/logo/pytorch.png'
import dmlcXgboostLogo from '../../../images/logo/dmlc-xgboost.png'
import scikitLearnLogo from '../../../images/logo/scikit-learn.png'
import lightGbmLogo from '../../../images/logo/light-gbm.png'
import kerasLogo from '../../../images/logo/keras.png'
import catboostLogo from '../../../images/logo/catboost.png'
import * as styles from './index.module.css'

interface ITypedRef {
  reset: () => void
  destroy: () => void
}

const cliCaptionData: Array<{ bold: string; text: string }> = [
  {
    bold: 'Codify your model into a standardized format',
    text: 'Automatically extract environment, methods, and input data specification'
  },
  {
    bold: 'Manage ML models and their metadata',
    text: 'Reuse existing Git and GitHub/GitLab infrastructure for model management'
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

const logosData: Array<{
  src: string
  widthSm: number
  widthMd: number
  widthLg: number
  alt: string
}> = [
  {
    widthSm: 66,
    widthMd: 88,
    widthLg: 124,
    src: tensorflowLogo,
    alt: 'Tensorflow logo'
  },
  {
    widthSm: 60,
    widthMd: 79,
    widthLg: 112,
    src: pytorchLogo,
    alt: 'PyTorch logo'
  },
  {
    widthSm: 48,
    widthMd: 64,
    widthLg: 90,
    src: dmlcXgboostLogo,
    alt: 'dmlc xgboost logo'
  },
  {
    widthSm: 38,
    widthMd: 50,
    widthLg: 71,
    src: scikitLearnLogo,
    alt: 'scikit learn logo'
  },
  {
    widthSm: 66,
    widthMd: 78,
    widthLg: 110,
    src: lightGbmLogo,
    alt: 'Light GBM logo'
  },
  {
    widthSm: 54,
    widthMd: 64,
    widthLg: 90,
    src: kerasLogo,
    alt: 'Keras logo'
  },
  {
    widthSm: 81,
    widthMd: 96,
    widthLg: 135,
    src: catboostLogo,
    alt: 'Catboost logo'
  }
]

interface ITerminalSlideData {
  allTerminalSlide: {
    nodes: [{ lines: [{ text: string; promptString: string }] }]
  }
}

const Header: React.FC = () => {
  const {
    allTerminalSlide: { nodes: cliSlideData }
  }: ITerminalSlideData = useStaticQuery(query)
  const [initialSwipeX, setInitialSwipeX] = useState(0)
  const [finalSwipeX, setFinalSwipeX] = useState(0)
  const [selectedCli, setSelectedCli] = useState(0)
  const [slidesHaveBeenSelected, setSlidesHaveBeenSelected] = useState<
    Array<boolean>
  >([])
  const typedRefs = useRef<ITypedRef[]>([])

  useEffect(() => {
    setSlidesHaveBeenSelected(
      new Array(cliSlideData.length)
        .fill(false)
        .map((_, i) => (i === 0 ? true : false))
    )

    return () => {
      typedRefs.current.forEach(ref => ref.destroy())
    }
  }, [])

  const handleTouchStart = (event: React.TouchEvent): void => {
    setInitialSwipeX(event.nativeEvent.touches[0].clientX)
  }

  const handleTouchMove = (event: React.TouchEvent): void => {
    setFinalSwipeX(event.nativeEvent.touches[0].clientX)
  }

  const handleTouchEnd = (): void => {
    let ind =
      selectedCli + 1 <= cliSlideData.length - 1
        ? selectedCli + 1
        : cliSlideData.length - 1
    if (initialSwipeX < finalSwipeX) {
      ind = selectedCli - 1 >= 0 ? selectedCli - 1 : 0
    }
    setCli(ind)
  }

  const setCli = (i: number): void => {
    const newSlidesHaveBeenSelected = slidesHaveBeenSelected.map((bool, ind) =>
      ind === i ? true : bool
    )

    setSelectedCli(i)
    if (!slidesHaveBeenSelected[i]) {
      typedRefs.current[i].reset()
    } else {
      typedRefs.current[i].destroy()
    }
    setSlidesHaveBeenSelected(newSlidesHaveBeenSelected)
  }

  return (
    <header id="overview" className={styles.header}>
      <h1 className={styles.header__title}>
        Open-source model  deployment tool for  Machine Learning
        <span className={styles.header__titleUnderscore}>_</span>
      </h1>
      <div className={styles.main}>
        <div className={styles.cli__slidesWrapper}>
          <ul
            style={
              {
                '--selected-i': selectedCli,
                '--length': cliSlideData.length
              } as React.CSSProperties
            }
            className={styles.cli__slides}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {cliSlideData.map((data, i) => (
              <li key={i} className={cn(i === selectedCli && styles.selected)}>
                <Terminal
                  lines={data.lines}
                  setTypedRef={(el: {
                    destroy: () => void
                    reset: () => void
                  }) => {
                    typedRefs.current[i] = el
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <ul className={styles.cli__dots}>
          {cliSlideData.map((_, i) => (
            <li key={i}>
              <button
                className={cn(i === selectedCli && styles.selected)}
                onFocus={() => {
                  setCli(i)
                }}
              />
            </li>
          ))}
        </ul>
        <ul
          className={cn(styles.cli__captions, 'flex md:hidden')}
          style={
            {
              '--selected-i': selectedCli,
              '--length': cliSlideData.length
            } as React.CSSProperties
          }
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {cliCaptionData.map(({ bold, text }, i) => (
            <li key={i}>
              <p className={styles.cli__boldText}>{bold}</p>
              <p className={styles.cli__text}>{text}</p>
            </li>
          ))}
        </ul>
        <ul
          className={cn(styles.cli__captions, 'hidden md:flex')}
          style={
            {
              '--selected-i': selectedCli,
              '--length': cliSlideData.length
            } as React.CSSProperties
          }
        >
          {cliCaptionData.map(({ bold, text }, i) => (
            <li
              key={i}
              className={cn(i === selectedCli && styles.cli__caption_selected)}
            >
              <button
                onClick={() => {
                  setCli(i)
                }}
              >
                <p className={styles.cli__boldText}>{bold}</p>
                <p className={styles.cli__text}>{text}</p>
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.main__buttons}>
          <Button
            className={styles.button}
            href="https://iterative-ai.typeform.com/to/FGyGIx45"
          >
            Become first user
          </Button>
          <Button
            className={styles.button}
            icon="github"
            theme="ghost"
            disabled
          >
            Coming Soon
          </Button>
        </div>
      </div>
      <ul className={styles.header__logos}>
        {logosData.map(({ widthSm, widthMd, widthLg, src, alt }, i) => (
          <li key={i}>
            <img
              alt={alt}
              src={src}
              className={styles.header__logo}
              width={widthMd}
              height={35}
              style={
                {
                  '--width-sm': `${widthSm}px`,
                  '--width-md': `${widthMd}px`,
                  '--width-lg': `${widthLg}px`
                } as React.CSSProperties
              }
            />
          </li>
        ))}
      </ul>
    </header>
  )
}

const query = graphql`
  query getTerminalSlideData {
    allTerminalSlide {
      nodes {
        lines {
          promptString
          text
        }
      }
    }
  }
`

export default Header
