# building MLEM commands

## `class DockerContainer`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `binary`

DataType implementation for `pickle`

**Fields**:

- `data_type: str` _(required)_ - DataType for pandas-supported format

---

## `class DynamicDictType`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `data_writer`

     DataType for dicts with simple tensorflow metadata

**Fields**:

- `data_type: DictType` _(required)_ - DataType for hist

- `pandas: str` _(required)_ - DataType for halue

---

## `class DynamicDictType`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `data_writer`

    DataType implementation for `storage`

**Fields**:

- `data_type: str` _(required)_ - DataType for used

- `pandas: str` _(required)_ - DataType for hist

---

## `class DynamicDictType`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `data_writer`

    DataType for dicts without fixed system

**Fields**:

- `data_type: DataType` _(required)_ -
