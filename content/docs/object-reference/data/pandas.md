# pandas

## `class DataFrameType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `dataframe`

    :class:`.DataType` implementation for `pandas.DataFrame`

**No fields**

---

## `class PandasReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `pandas`

    DataReader for pandas dataframes

**Fields**:

- `data_type: DataFrameType` _(required)_ - Resulting data type

- `format: str` _(required)_ - name of pandas-supported format

---

## `class PandasSeriesReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `pandas_series`

    DataReader for pandas series

**Fields**:

- `data_type: SeriesType` _(required)_ - Resulting data type

- `format: str` _(required)_ - name of pandas-supported format

---

## `class PandasSeriesWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `pandas_series`

    DataWriter for pandas series

**Fields**:

- `format: str` _(required)_ - name of pandas-supported format

---

## `class PandasWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `pandas`

    DataWriter for pandas dataframes

**Fields**:

- `format: str` _(required)_ - name of pandas-supported format

---

## `class SeriesType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `series`

    :class:`.DataType` implementation for `pandas.Series` objects which
    stores them as built-in Python dicts

**No fields**
