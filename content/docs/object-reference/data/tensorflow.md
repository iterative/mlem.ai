# tensorflow

## `class TFTensorWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `tf_tensor`

    Write tensorflow tensors to np format

**No fields**

---

## `class TFTensorReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `tf_tensor`

    Read tensorflow tensors from np format

**Fields**:

- `data_type: DataType` _(required)_ - Resulting data type

---

## `class TFTensorDataType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `tf_tensor`

    DataType implementation for `tensorflow.Tensor`

**Fields**:

- `dtype: str` _(required)_ - Data type of `tensorflow.Tensor` objects in data
