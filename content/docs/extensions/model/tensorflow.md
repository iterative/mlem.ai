# Tensorflow Models Support

[ModelType](/doc/user-guide/mlem-abcs#modeltype) and
[ModelIO](/doc/user-guide/mlem-abcs#modelio) implementations for
`tf.keras.Model` DataType, Reader and Writer implementations for `tf.Tensor`

## Requirements

```bash
pip install mlem[tensorflow]
# or
pip install tensorflow
```

## Examples

```python

```

## Implementation reference

### `class TFTensorReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `tf_tensor`

    Read tensorflow tensors from np format

**Fields**:

- `data_type: DataType` _(required)_ - Resulting data type

---

### `class TFTensorDataType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `tf_tensor`

    DataType implementation for `tensorflow.Tensor`

**Fields**:

- `dtype: str` _(required)_ - Data type of `tensorflow.Tensor` objects in data

---

### `class TFTensorWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `tf_tensor`

    Write tensorflow tensors to np format

**No fields**

---

### `class TFKerasModelIO`

**MlemABC parent type**: `model_io`

**MlemABC type**: `tf_keras`

    IO for Tensorflow Keras models (:class:`tensorflow.keras.Model`
    objects)

**Fields**:

- `save_format: str` - `tf` for custom net classes and `h5` otherwise

---

### `class TFKerasModel`

**MlemABC parent type**: `model_type`

**MlemABC type**: `tf_keras`

    :class:`.ModelType` implementation for Tensorflow Keras models

**Fields**:

- `io: ModelIO = TFKerasModelIO()` - IO
