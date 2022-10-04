# lightgbm

## `class LightGBMDataWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `lightgbm`

    Wrapper writer for lightgbm.Dataset objects

**No fields**

---

## `class LightGBMDataReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `lightgbm`

    Wrapper reader for lightgbm.Dataset objects

**Fields**:

- `data_type: LightGBMDataType` _(required)_ - Resulting data type

- `inner: DataReader` _(required)_ - Inner reader

---

## `class LightGBMDataType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `lightgbm`

    :class:`.DataType` implementation for `lightgbm.Dataset` type

    :param inner: :class:`.DataType` instance for underlying data

**Fields**:

- `inner: DataType` _(required)_ - Inner DataType
