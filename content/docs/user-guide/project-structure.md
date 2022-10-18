# Project structure

## MLEM Project

Any directory with a valid `.mlem.yaml` file is considered a **MLEM Project**.
To create one, use `mlem init` or `mlem.api.init()`. For more details on
`.mlem.yaml` file see [Configuration](/doc/user-guide/configuration).

<admon type="info">

Some API and CLI commands like `mlem config` require this execution context. But
in general, MLEM can work with `.mlem` metafiles anywhere.

</admon>

A common place to initialize MLEM is a data science Git repository. _MLEM
projects_ help you better structure and easily address existing data artifacts
(especially ML models). And Git allows you to version MLEM objects and
configuration options along with code.

## Referencing MLEM Objects

Everywhere you need to reference any saved MLEM Object, you can do so by
providing those arguments:

- `path` is path to object
- `project` is the project dir to look in. This is optional
- `rev` is revision of the project, also optional
- `fs` (API-only) fsspec FileSystem implementation to use

All of those are saved in `location` field of a MLEM Object.

If you didn't provide `project` and/or `rev`, MLEM will try to deduce them from
`path`. `fs` is also can be deduced from `project` or `path`.

Here is the example of how the same object can be referenced

- `path = models/rf, project = https://github.com/iterative/example-mlem-get-started, rev=main` -
  using the full path inside MLEM project
- `path = https://github.com/iterative/example-mlem-get-started/tree/main/models/rf` -
  everything could be provided via path (path format could differ for different
  storages)
- `path = https://github.com/iterative/example-mlem-get-started/models/rf` -
  also can omit `tree/main` since `main` is default.
- `path = models/rf, fs = GithubFileSystem(org="iterative", repo="example-mlem-get-started", sha="main")` -
  API only, can provide pre-configured fs.
