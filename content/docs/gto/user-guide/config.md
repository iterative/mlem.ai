# Configuring types and stages

To configure GTO, use file `.gto` in the root of your repo:

```yaml
# .gto config file
types: [model, dataset] # list of allowed Types
stages: [dev, stage, prod] # list of allowed Stages
```

When allowed Stages or Types are specified, GTO will check commands you run and
error out if you provided a value that doesn't exist in the config. Note, that
GTO applies the config from the workspace, so if want to apply the config from
`main` branch, you need to check it out first with `git checkout main`.

Alternatively, you can use environment variables (note the `GTO_` prefix)

```cli
$ GTO_EMOJIS=false gto show
```
