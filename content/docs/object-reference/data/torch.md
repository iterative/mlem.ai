# torch

## `class TorchTensorDataType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `torch`

    DataType implementation for `torch.Tensor`

**Fields**:

- `dtype: str` _(required)_ - Type name of `torch.Tensor` elements

---

## `class TorchTensorReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `torch`

    Read torch tensors

**Fields**:

- `data_type: DataType` _(required)_ - Resulting data type

---

## `class TorchTensorWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `torch`

    Write torch tensors

**No fields**
