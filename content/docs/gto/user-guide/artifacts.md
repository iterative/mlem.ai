# Annotations in artifacts.yaml

Using Git tag to register versions and assign stages is handy, but the Git tag
itself doesn't contain path to the artifact, type of it (it could be `model` or
`dataset`), or any other information you may find useful. For simple projects
(e.g. single artifact) we can assume the details in a downstream system. But for
more advanced cases, we should codify them in the registry itself.

To keep this metainformation, GTO uses `artifacts.yaml` file. Commands like
`gto annotate` and `gto remove` are used to modify it, while `gto describe`
helps get them when they're needed.

If you would like to see an example of `artifacts.yaml`, check out the
[example-gto](https://github.com/iterative/example-gto/blob/main/artifacts.yaml)
repo.
