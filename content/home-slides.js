const terminalSlideData = [
  `
  $ python
  >>> from training_script import train
  >>> model = train()
  <loadingbar></loadingbar>
  >>> import mlem
  >>> mlem.api.save(model, "dog-bark-translator")
  >>>

$ tree 
  .
  ├── dog-bark-translator
  └── dog-bark-translator.mlem
`,
  `
    $ cat dog-bark-translator.mlem
    type: sklearn
    methods:
    &nbsp;&nbsp;predict:
    &nbsp;&nbsp;&nbsp;&nbsp;input: path to .wav file
    &nbsp;&nbsp;&nbsp;&nbsp;output: text sequence
    requirements:
    &nbsp;&nbsp;pytorch: 1.10.0
    &nbsp;&nbsp;torchaudio: 0.10.0
    &nbsp;&nbsp;emoji: 1.6.1
    `,
  `
    $ mlem deploy dog-bark-translator heroku
  🏗️ Building dog-bark-translator:latest docker image...<delay></delay>
  📤 Pushing docker image to heroku, using envs/heroku.yaml specification...<delay></delay>
  🚀 Starting application...<delay></delay>
  💫 Application is live, check it out at https://dog-bark-translator.iterative.ai
    `,
  `
      $ gto show
      ╒══════════════════════╤══════════╤════════╤═════════╕
      │ name                 │ latest   │ #stage │ #prod   │
      ╞══════════════════════╪══════════╪════════╪═════════╡
      │ pet-face-recognition │ v3.1.0   │ -      │ v3.0.0  │
      │ mlem-blep-classifier │ v0.4.1   │ v0.4.1 │ -       │
      │ dog-bark-translator  │ v0.0.1   │ -      │ v0.0.1  │
      ╘══════════════════════╧══════════╧════════╧═════════╛
      <delay></delay>
      $ mlem apply dog-bark-translator ./short-dog-phrase.wav
      🐶🚀🎉
      `
]

module.exports = terminalSlideData
