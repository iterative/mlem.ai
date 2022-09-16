# Lightgbm Models Support

[ModelType](/doc/user-guide/mlem-abcs#modeltype) and
[ModelIO](/doc/user-guide/mlem-abcs#modelio) implementations for
`lightgbm.Booster` as well as LightGBMDataType with Reader and Writer for
`lightgbm.Dataset`

## Description

**TODO**

## Requirements

```bash
pip install mlem[lightgbm]
# or
pip install lightgbm
```

## Examples

```python

```

## Implementation reference

### `class LightGBMDataReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `lightgbm`

    Wrapper reader for lightgbm.Dataset objects

**Fields**:

- `data_type: LightGBMDataType` _(required)_ - Resulting data type

- `inner: DataReader` _(required)_ - Inner reader

---

### `class LightGBMDataType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `lightgbm`

    :class:`.DataType` implementation for `lightgbm.Dataset` type

    :param inner: :class:`.DataType` instance for underlying data

**Fields**:

- `inner: DataType` _(required)_ - Inner DataType

---

### `class LightGBMDataWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `lightgbm`

    Wrapper writer for lightgbm.Dataset objects

**No fields**

---

### `class LightGBMModelIO`

**MlemABC parent type**: `model_io`

**MlemABC type**: `lightgbm_io`

    :class:`.ModelIO` implementation for `lightgbm.Booster` type

**Fields**:

- `model_file_name: str = "model.lgb"` - Filename to use

---

### `class LightGBMModel`

**MlemABC parent type**: `model_type`

**MlemABC type**: `lightgbm`

    :class:`.ModelType` implementation for `lightgbm.Booster` type

**Fields**:

- `io: ModelIO = LightGBMModelIO()` - LightGBMModelIO
