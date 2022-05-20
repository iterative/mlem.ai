# apply-remote

Apply a model (deployed somewhere remotely) to a dataset. Resulting dataset will
be saved as MLEM object to `output` if it is provided, otherwise will be
printed.

## Synopsis

```usage
usage: mlem apply-remote [options] [subtype] data

arguments:
[SUBTYPE]  Type of client. Choices: ['http', 'rmq']
DATA       Path to dataset object  [required]
```

## Description

Models which are deployed somewhere remotely or are being
[served](/doc/get-started/serving) can have their methods called using the
`apply-remote` command. This command is similar to
[apply](/doc/cli-reference/apply), the only difference being that the model is
deployed somewhere or is being served. To access the methods of this `served`
model, a `client` is needed. The currently available clients are `http` and
`rmq` corresponding to the `fastapi` and `rmq` server types. These clients are
used to make requests to servers. The outputs and results (again as a MLEM
Object) are stored or printed as usual.

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

## Examples

```mlem
Apply hosted mlem model to local mlem dataset
$ mlem apply-remote http mydataset -c host="0.0.0.0" -c port=3000 --output myprediction
```

> The hosted model above can be the example discussed
> [here](/doc/cli-reference/serve#examples) for instance or can be any other
> model.
