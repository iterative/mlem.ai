# Github Uri Support

Implementation of `GithubResolver`

## Description

This extension does not require additional setup and works out-of-the-box. All
URIs starting with `https://github.com` will be resolved.

`rev` option is supported, you can specify it separately or as a part of URI
like this: `https://github.com/<user>/<repo>/tree/<rev>/path`

## Examples

```python
from mlem.api import load

model = load("https://github.com/iterative/example-mlem-get-started/rf",
             rev="main"
)
```

## Implementation reference

### `class GithubResolver`

**MlemABC parent type**: `resolver`

**MlemABC type**: `github`

    Resolve https://github.com URLs

**No fields**
