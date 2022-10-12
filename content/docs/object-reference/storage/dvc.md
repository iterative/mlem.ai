# DVC

## `class DVCArtifact`

**MlemABC parent type**: `artifact`

**MlemABC type**: `dvc`

    Local artifact that can be also read from DVC cache

**Fields**:

- `uri: str` _(required)_ - Local path to file

- `size: int` _(required)_ - size in bytes

- `hash: str` _(required)_ - md5 hash

---

## `class DVCStorage`

**MlemABC parent type**: `storage`

**MlemABC type**: `dvc`

    User-managed dvc storage, which means user should
    track corresponding files with dvc manually.

**Fields**:

- `uri: str = ""` - Base storage path
