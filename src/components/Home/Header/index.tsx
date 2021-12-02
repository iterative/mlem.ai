import React, { useEffect, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import cn from 'classnames'
import { StaticImage } from 'gatsby-plugin-image'
import Terminal from '../Terminal'
import Button from '../../Button'
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
  const typedRefs = useRef<ITypedRef[]>([])

  useEffect(() => {
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
    setSelectedCli(i)
    typedRefs.current[i].reset()
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>
        Open-source model registry and deployment tool for Machine Learning
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
                onFocus={() => {
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
          <Button>Become first user</Button>
          <Button icon="github" theme="ghost" disabled>
            Coming Soon
          </Button>
        </div>
      </div>
      <ul className={styles.header__logos}>
        <li>
          <StaticImage
            src="../../../images/logo/tensorflow.png"
            alt="Tensorflow logo"
            quality={100}
            loading="eager"
            placeholder="none"
            objectFit="contain"
            className={styles.header__logo}
            style={
              {
                '--width-sm': '66px',
                '--width-md': '88px',
                '--width-lg': '124px'
              } as React.CSSProperties
            }
          />
        </li>
        <li>
          <StaticImage
            src="../../../images/logo/pytorch.png"
            alt="PyTorch logo"
            quality={100}
            loading="eager"
            placeholder="none"
            objectFit="contain"
            className={styles.header__logo}
            style={
              {
                '--width-sm': '60px',
                '--width-md': '79px',
                '--width-lg': '112px'
              } as React.CSSProperties
            }
          />
        </li>
        <li>
          <StaticImage
            src="../../../images/logo/dmlc-xgboost.png"
            alt="dmlc xgboost logo"
            quality={100}
            loading="eager"
            placeholder="none"
            objectFit="contain"
            className={styles.header__logo}
            style={
              {
                '--width-sm': '48px',
                '--width-md': '64px',
                '--width-lg': '90px'
              } as React.CSSProperties
            }
          />
        </li>
        <li>
          <StaticImage
            src="../../../images/logo/scikit-learn.png"
            alt="scikit learn logo"
            quality={100}
            loading="eager"
            placeholder="none"
            objectFit="contain"
            className={styles.header__logo}
            style={
              {
                '--width-sm': '38px',
                '--width-md': '50px',
                '--width-lg': '71px'
              } as React.CSSProperties
            }
          />
        </li>
        <li>
          <StaticImage
            src="../../../images/logo/light-gbm.png"
            alt="Light GBM logo"
            quality={100}
            loading="eager"
            placeholder="none"
            objectFit="contain"
            className={styles.header__logo}
            style={
              {
                '--width-sm': '66px',
                '--width-md': '78px',
                '--width-lg': '110px'
              } as React.CSSProperties
            }
          />
        </li>
        <li>
          <StaticImage
            src="../../../images/logo/keras.png"
            alt="Keras logo"
            quality={100}
            loading="eager"
            placeholder="none"
            className={styles.header__logo}
            style={
              {
                '--width-sm': '54px',
                '--width-md': '64px',
                '--width-lg': '90px'
              } as React.CSSProperties
            }
          />
        </li>
        <li>
          <StaticImage
            src="../../../images/logo/catboost.png"
            alt="CatBoost logo"
            quality={100}
            loading="eager"
            placeholder="none"
            objectFit="contain"
            className={styles.header__logo}
            style={
              {
                '--width-sm': '81px',
                '--width-md': '96px',
                '--width-lg': '135px'
              } as React.CSSProperties
            }
          />
        </li>
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
