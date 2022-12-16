# annotate

Create or update metadata about an artifact.

## Synopsis

```usage
usage: gto annotate [-r <text>] [--type <text>] [--path <text>]
                    [-e] [--label <text>] [-d <text>] [--commit]
                    [--push] [-h]
                    name

arguments:
  name             Artifact name
```

## Description

The command adds the artifact annotation to `artifacts.yaml` file. Feel free to
modify the file directly!

For example,

```cli
$ gto annotate awesome-model \
  --type model \
  --path models/neural_network.h5 \
  --label ml \
  --label cool \
  --description "This model is very cool" \
  --custom "{'foo': 'bar'}"
```

will create

```yaml
awesome-model:
  custom: "{'foo': 'bar'}"
  description: This model is very cool
  labels:
    - ml
    - cool
  path: models/neural_network.h5
  type: model
```

This information can be later retrieved by running `gto describe` command.

`--custom` option allows you to add custom metadata. Within `gto annotate` GTO
treats input as string, but you can edit artifacts.yaml to add arbitrary
information that fits yaml format, such as dict or list, or more complex
structures.

<admon type="tip">

Don't forget to commit `artifacts.yaml` with Git to associate it with the latest
artifact version and stage in any copy of the repo.

</admon>

By default GTO saves artifact as `virtual`. Use the `--must_exist` flag to tell
GTO the artifact file is committed to Git.

<details>

### Virtual vs. Physical artifacts

- Physical files/directories are committed to the repo. When you create a new
  version or assign a stage to it, Git guarantees that it's immutable -- you can
  return a year later and get the same artifact by providing a version.

- Virtual artifacts could be an external path (e.g. `s3://mybucket/myfile`) or a
  local path to a metafile representing an externally stored artifact file (as
  [with DVC](https://dvc.org/doc/start/data-management)). In this case, GTO
  can't pin versions to a physical state of the artifact and guarantee its
  immutability later, e.g. if `s3://mybucket/myfile` changes the registry won't
  know it, nor have a way to recover the original file.

</details>

## Options

- `-r <text>`, `--repo <text>` - Local or remote repository [default: .]
- `--type <text>` - Artifact type
- `--path <text>` - Artifact path
- `-e`, `--must-exist` - Verify artifact is committed to Git
- `--label <text>` - Labels to add to artifact
- `-d <text>`, `--description <text>` - Artifact description
- `-c <text>`, `--custom <text>` - Custom metadata to add to artifact
- `--commit` - Automatically commit changes due to this command (experimental)
- `--push` - Push created commit automatically (experimental) - will set
  commit=True
- `-h`, `--help` - Show this message and exit.
