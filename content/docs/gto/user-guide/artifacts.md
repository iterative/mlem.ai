# `artifacts.yaml` metafile

Registering versions and assigning stages is handy since you can trigger a
CI/CD, but the Git tag itself doesn't contain path to the artifact, type of it
(it could be `model` or `dataset`), or any other information you may find
useful. For simple projects (e.g. single artifact) we can assume the details in
a downstream system. But for more advanced cases, we should codify them in the
registry itself.

To keep this metainformation, GTO uses `artifacts.yaml` file and commands like
`gto annotate`. Please refer to [User Guide](/doc/gto/user-guide). for more
details.

...tell about how to annotate and remove, about the file structure...
