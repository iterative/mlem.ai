const terminalSlideData = [
  `
  $ python
  >>> from training_script import train
  >>> model = train()
  <loadingbar></loadingbar>
  >>> import mlem
  >>> mlem.api.save(model, "dog-bark-translator")
  >>>

$ tree .mlem/model
  .mlem/model/
  ├── dog-bark-translator
  └── dog-bark-translator.mlem
`,
  `
    $ cat .mlem/model/dog-bark-translator.mlem
    type: sklearn
    methods:
     - predict:
    input: path to .wav file
    output: text sequence
    requirements:
    - pytorch: 1.10.0
    - torchaudio: 0.10.0
    - emoji: 1.6.1
    `,
  `
    $ mlem deploy dog-bark-translator heroku
  🏗️ Building dog-bark-translator:latest docker image...<delay></delay>
  📤 Pushing docker image to heroku, using envs/heroku.yaml specification...<delay></delay>
  🚀 Starting application...<delay></delay>
  💫 Application is live, check it out at https://dog-bark-translator.iterative.ai
    `,
  `
      $ mlem apply dog-bark-translator ./short-dog-phrase.wav
      🐶🚀🎉

      $ python
      >>> import mlem
      >>> model = mlem.api.load("dog-bark-translator")
      >>> model.predict("./short-dog-phrase.wav")
      🐶🚀🎉
      >>>
      `
]

module.exports = terminalSlideData
