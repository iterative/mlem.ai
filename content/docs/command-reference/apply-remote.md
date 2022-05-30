# apply-remote

Apply a deployed-model (possibly remotely) to a dataset. The resulting dataset
will be saved as a MLEM object to `output` if provided. Otherwise, it will be
printed to `stdout`.

## Synopsis

```usage
usage: mlem apply-remote [options] [subtype] data

arguments:
[SUBTYPE]  Type of client. Choices: ['http', 'rmq']
DATA       Path to dataset object  [required]
```

## Description

Models which are deployed somewhere remotely or are being
[served](/doc/get-started/serving) locally, can have their methods called using
the `apply-remote` command. This command is similar to
[apply](/doc/command-reference/apply), with the only difference being the model
is deployed remotely using a deployment, or served locally. To access the
methods of the `served` model, a `client` is needed. Currently, the available
clients are `http` and `rmq` - which are used to launch requests against the
`fastapi` and `rmq` server types, correspondingly.

## Options

- `-r, --repo TEXT`: Path to MLEM repo [default: (none)]
- `--rev TEXT`: Repo revision to use [default: (none)]
- `-o, --output TEXT`: Where to store the outputs.
- `--target-repo, --tr TEXT`: Repo to save target to [default: (none)]
- `-m, --method TEXT`: Which model method is to be applied [default: predict]
- `--index / --no-index`: Whether to index output in .mlem directory
- `--json`: Output as json
- `-l, --load TEXT`: File to load client config from
- `-c, --conf TEXT`: Options for client in format `field.name=value`
- `-f, --file_conf TEXT`: File with options for client in format
  `field.name=path_to_config`
- `-h, --help`: Show this message and exit.

## Example: Apply a locally hosted model to a local dataset

Given a hosted model server (see
[serve example](/doc/command-reference/serve#examples) as a way to easily do
this) and a local MLEM dataset `mydataset`, run the following command to infer
the entire dataset with the model and save the output dataset to `myprediction`

```cli
$ mlem apply-remote http mydataset --conf host="127.0.0.1" --conf port=3000 --output myprediction
```
