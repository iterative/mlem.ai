const terminalSlideData = [
  `
  $ python
  >>> from training_script import train
  >>> model = train()
  <loadingbar></loadingbar>
  >>> import mlem
  >>> mlem.api.save(model, "./data/model")
  >>>

$ tree data
  data/
  ├── model
  └── model.mlem
`,
  `
    $ mlem ls https://github.com/iterative/model-registry
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
  📩 Downloading model...<delay></delay>
  🏗️ Building dog-bark-translator:latest docker image...<delay></delay>
  📤 Pushing docker image to heroku, using envs/heroku.yaml specification...<delay></delay>
  🚀 Starting application...<delay></delay>
  💫 Application is live, check it out at https://dog-bark-translator.iterative.ai
    `,
  `
      $ python
      >>> import mlem
      >>> model = mlem.api.load(
      ...    "dog-bark-translator",
      ...    repo="https://github.com/iterative/model-registry"
      ... )
      >>> model.predict("./short-dog-phrase.wav")
      🐶🚀🎉
      >>>
      `
]

module.exports = terminalSlideData
