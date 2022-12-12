import React, { useEffect, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import cn from 'classnames'

import GithubLine from './GithubLine'
import Terminal from '../Terminal'
import Button from '../../Button'
import catboostLogo from '../../../images/logo/catboost.png'
import condaLogo from '../../../images/logo/conda.png'
import dmlcXgboostLogo from '../../../images/logo/dmlc-xgboost.png'
import dockerLogo from '../../../images/logo/docker.png'
import fastapiLogo from '../../../images/logo/fastapi.png'
import herokuLogo from '../../../images/logo/heroku.png'
import kerasLogo from '../../../images/logo/keras.png'
import kubernetesLogo from '../../../images/logo/kubernetes.png'
import lightGbmLogo from '../../../images/logo/light-gbm.png'
import numpyLogo from '../../../images/logo/numpy.png'
import onnxLogo from '../../../images/logo/onnx.png'
import pandasLogo from '../../../images/logo/pandas.png'
import pythonLogo from '../../../images/logo/python.png'
import pytorchLogo from '../../../images/logo/pytorch.png'
import rabbitmqLogo from '../../../images/logo/rabbitmq.png'
import sagemakerLogo from '../../../images/logo/sagemaker.png'
import scikitLearnLogo from '../../../images/logo/scikit-learn.png'
import streamlitLogo from '../../../images/logo/streamlit.png'
import tensorflowLogo from '../../../images/logo/tensorflow.png'
import * as styles from './index.module.css'

interface ITypedRef {
  reset: () => void
  destroy: () => void
}

const cliCaptionData: Array<{ bold: string; text: string }> = [
  {
    bold: 'Save your ML model with a Python call.',
    text: 'Stick to your training workflow.'
  },
  {
    bold: 'Model metadata is captured automatically.',
    text: 'Use a human-readable YAML format for any ML framework.'
  },
  {
    bold: 'Deploy models anywhere you want.',
    text: 'Switch between deployment platforms with a single command.'
  },
  {
    bold: 'Make Git a Model Registry',
    text:
      'MLEM is a core building block for Git-native ML model registries, ' +
      'combined with other Iterative.ai tools like GTO or DVC.'
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
    src: fastapiLogo,
    alt: 'FastAPI logo'
  },
  {
    widthSm: 66,
    widthMd: 88,
    widthLg: 124,
    src: dockerLogo,
    alt: 'Docker logo'
  },
  {
    widthSm: 66,
    widthMd: 88,
    widthLg: 124,
    src: streamlitLogo,
    alt: 'Streamlit logo'
  },
  {
    widthSm: 66,
    widthMd: 88,
    widthLg: 124,
    src: herokuLogo,
    alt: 'Heroku logo'
  },
  {
    widthSm: 66,
    widthMd: 88,
    widthLg: 124,
    src: kubernetesLogo,
    alt: 'Kubernetes logo'
  },
  {
    widthSm: 66,
    widthMd: 88,
    widthLg: 124,
    src: sagemakerLogo,
    alt: 'Sagemaker logo'
  },
  {
    widthSm: 66,
    widthMd: 88,
    widthLg: 124,
    src: rabbitmqLogo,
    alt: 'RabbitMQ logo'
  },
  {
    widthSm: 66,
    widthMd: 88,
    widthLg: 124,
    src: pythonLogo,
    alt: 'Python logo'
  },
  {
    widthSm: 66,
    widthMd: 88,
    widthLg: 124,
    src: condaLogo,
    alt: 'Conda logo'
  },
  {
    widthSm: 66,
    widthMd: 88,
    widthLg: 124,
    src: onnxLogo,
    alt: 'ONNX logo'
  },
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
  },
  {
    widthSm: 81,
    widthMd: 96,
    widthLg: 135,
    src: numpyLogo,
    alt: 'Numpy logo'
  },
  {
    widthSm: 81,
    widthMd: 96,
    widthLg: 135,
    src: pandasLogo,
    alt: 'Pandas logo'
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
        Open-source tool to simplify ML model deployment
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
          <Button className={styles.button} href="/doc/get-started">
            Get Started
          </Button>
          <Button href="/doc/install" className={styles.button} theme="ghost">
            Install
          </Button>
        </div>
        <div>
          <GithubLine />
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
