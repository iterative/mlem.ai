# lightgbm

## `class LightGBMDataReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `lightgbm`

    Wrapper reader for lightgbm.Dataset objects

**Fields**:

- `data_type: LightGBMDataType` _(required)_ - Resulting data type

- `inner: DataReader` _(required)_ - DataReader of Inner

- `labels: DataReader` - DataReader of Labels

---

## `class LightGBMDataType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `lightgbm`

    :class:`.DataType` implementation for `lightgbm.Dataset` type

    :param inner: :class:`.DataType` instance for underlying data
    :param labels: :class:`.DataType` instance for underlying labels

**Fields**:

- `inner: DataType` _(required)_ - DataType of Inner

- `labels: DataType` - DataType of Labels

---

## `class LightGBMDataWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `lightgbm`

    Wrapper writer for lightgbm.Dataset objects

**No fields**
