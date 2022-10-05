# builtin

## `class FSSpecArtifact`

**MlemABC parent type**: `artifact`

**MlemABC type**: `fsspec`

    Represents a file stored in an fsspec filesystem

**Fields**:

- `uri: str` _(required)_ - Path to file

- `size: int` _(required)_ - size in bytes

- `hash: str` _(required)_ - md5 hash

---

## `class FSSpecStorage`

**MlemABC parent type**: `storage`

**MlemABC type**: `fsspec`

    Represents an fsspec filesystem

**Fields**:

- `uri: str` _(required)_ - Path to storage dir

---

## `class LocalArtifact`

**MlemABC parent type**: `artifact`

**MlemABC type**: `local`

    Special case for local file

**Fields**:

- `uri: str` _(required)_ - Path to file

- `size: int` _(required)_ - size in bytes

- `hash: str` _(required)_ - md5 hash

---

## `class LocalStorage`

**MlemABC parent type**: `storage`

**MlemABC type**: `local`

    Special case for local filesystem

**Fields**:

- `uri: str` _(required)_ - Path to storage dir
