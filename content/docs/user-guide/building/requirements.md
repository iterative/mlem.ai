# Requirements

Get `pip` based and `unix` based requirements for your model.

## Description

`mlem` can export the requirements needed for a model using the
`mlem build model requirements` command, where `model` is the path to model
saved via `mlem`

```cli
$ mlem build model requirements
⏳️ Loading model from model.mlem
scikit-learn==1.0.2
pandas==1.4.2
numpy==1.22.3
```

One can also save these `requirements` to generate a `requirements.txt` file
using the `--target` option which allows us to pass a path of the file i.e.

```cli
$ mlem build requirements --model model --target requirements.txt
⏳️ Loading model from model.mlem
💼 Generating requirements file...
✅  requirements.txt generated!
```

and now the contents of `requirements.txt` can be checked using

```cli
$ cat requirements.txt
scikit-learn==1.0.2
pandas==1.4.2
numpy==1.22.3
```

### Unix based requirements

To get a list of `unix` based requirements, use the `-c platform="unix"` option.
