# Torch Models Support

[ModelType](/doc/user-guide/mlem-abcs#modeltype) and
[ModelIO](/doc/user-guide/mlem-abcs#modelio) implementations for
`torch.nn.Module` ImportHook for importing files saved with `torch.save`
DataType, Reader and Writer implementations for `torch.Tensor`

## Requirements

```bash
pip install mlem[torch]
# or
pip install torch
```

## Examples

```python

```

## Implementation reference

### `class TorchTensorReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `torch`

    Read torch tensors

**Fields**:

- `data_type: DataType` _(required)_ - Resulting data type

---

### `class TorchTensorDataType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `torch`

    DataType implementation for `torch.Tensor`

**Fields**:

- `dtype: str` _(required)_ - Type name of `torch.Tensor` elements

---

### `class TorchTensorWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `torch`

    Write torch tensors

**No fields**

---

### `class TorchModelImport`

**MlemABC parent type**: `import`

**MlemABC type**: `torch`

    Import torch models saved with `torch.save`

**No fields**

---

### `class TorchModelIO`

**MlemABC parent type**: `model_io`

**MlemABC type**: `torch_io`

    IO for PyTorch models

**Fields**:

- `is_jit: bool = False` - Is model jit compiled

---

### `class TorchModel`

**MlemABC parent type**: `model_type`

**MlemABC type**: `torch`

    :class:`.ModelType` implementation for PyTorch models

**Fields**:

- `io: ModelIO = TorchModelIO()` - TorchModelIO
