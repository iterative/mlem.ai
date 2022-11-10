# Annotations in artifacts.yaml

Using Git tag to register versions and assign stages is handy, but the Git tag
itself doesn't contain path to the artifact, type of it (it could be `model` or
`dataset`), or any other information you may find useful. For simple projects
(e.g. single artifact) we can assume the details in a downstream system. But for
more advanced cases, we should codify them in the registry itself.

To keep this metainformation, GTO uses `artifacts.yaml` file. Commands like
[`annotate`](/doc/gto/command-reference/annotate) and
[`remove`](/doc/gto/command-reference/remove) are used to modify it, while
[`describe`](/doc/gto/command-reference/describe) helps get them when they're
needed.

Let's see an example of `artifacts.yaml` (another example can be found in
[example-gto](https://github.com/iterative/example-gto/blob/main/artifacts.yaml)):

```yaml
awesome: # artifact name
  description: This model is very cool
  labels:
    - ml
    - cool
  path: models/awesome.pkl
  type: model
```

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

> In future versions, we will support additional enrichments: useful information
> that other tools like [DVC](https://dvc.org/) and [MLEM](https://mlem.ai/) can
> provide about the artifacts. This will allow treating DVC repo outputs as
> usual artifacts instead of `virtual` ones.

</details>
