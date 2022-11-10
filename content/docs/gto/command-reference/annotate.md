# annotate

Update artifact metadata annotations

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

## Options

- `-r <text>`, `--repo <text>` - Local or remote repository [default: .]
- `--type <text>` - Artifact type
- `--path <text>` - Artifact path
- `-e`, `--must-exist` - Verify artifact is committed to Git
- `--label <text>` - Labels to add to artifact
- `-d <text>`, `--description <text>` - Artifact description
- `--commit` - Automatically commit changes due to this command (experimental)
- `--push` - Push created commit automatically (experimental) - will set
  commit=True
- `-h`, `--help` - Show this message and exit.

## Examples

$ gto annotate nn --type model --path models/neural_network.h5
