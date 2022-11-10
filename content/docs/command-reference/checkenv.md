# checkenv

Check that current Python environment satisfies object requirements.

## Synopsis

```usage
usage: mlem checkenv [-p <path>] [--rev <commitish>] [-h]
                     path

arguments:
  path             Path to object
```

## Options

- `-p <path>`, `--project <path>` - Path to MLEM project [default: (none)]
- `--rev <commitish>` - Repo revision to use [default: (none)]
- `-h`, `--help` - Show this message and exit.

## Examples

```cli
$ mlem checkenv rf
⏳️ Loading meta from rf.mlem
✅  Requirements are satisfied!
```
