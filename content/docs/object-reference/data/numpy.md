# Numpy Data Types Support

DataType, Reader and Writer implementations for `np.ndarray` and `np.number`
primitives

## Description

**TODO**

## Requirements

```bash
pip install mlem[numpy]
# or
pip install numpy
```

## Examples

### Saving and loading numpy array

```python
import numpy as np

from mlem.api import save, load


data = np.zeros((100,))

save(data, "array")

data = load("array")
```

## Implementation reference

### `class NumpyArrayReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `numpy`

    DataReader implementation for numpy ndarray

**Fields**:

- `data_type: DataType` _(required)_ - Resulting data type

---

### `class NumpyNumberReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `numpy_number`

    Read np.number objects

**Fields**:

- `data_type: NumpyNumberType` _(required)_ - Resulting data type

---

### `class NumpyNdarrayType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `ndarray`

    DataType implementation for `np.ndarray`

**Fields**:

- `dtype: str` _(required)_ - Data type of elements

---

### `class NumpyNumberType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `number`

    numpy.number DataType

**Fields**:

- `dtype: str` _(required)_ - `numpy.number` type name as string

---

### `class NumpyArrayWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `numpy`

    DataWriter implementation for numpy ndarray

**No fields**

---

### `class NumpyNumberWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `numpy_number`

    Write np.number objects

**No fields**
