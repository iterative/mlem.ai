# Onnx Models Support

[ModelType](/doc/user-guide/mlem-abcs#modeltype) and
[ModelIO](/doc/user-guide/mlem-abcs#modelio) implementations for
`onnx.ModelProto`

## Description

**TODO**

## Requirements

```bash
pip install mlem[onnx]
# or
pip install onnx
```

## Examples

```python

```

## Implementation reference

### `class ModelProtoIO`

**MlemABC parent type**: `model_io`

**MlemABC type**: `model_proto`

    IO for ONNX model object

**No fields**

---

### `class ONNXModel`

**MlemABC parent type**: `model_type`

**MlemABC type**: `onnx`

    :class:`mlem.core.model.ModelType` implementation for `onnx` models

**Fields**:

- `io: ModelIO = ModelProtoIO()` - Model IO
