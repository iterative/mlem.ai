# torch

## `class TorchModel`

**MlemABC parent type**: `model_type`

**MlemABC type**: `torch`

    :class:`.ModelType` implementation for PyTorch models

**Fields**:

- `io: ModelIO = TorchModelIO()` - TorchModelIO

---

## `class TorchModelIO`

**MlemABC parent type**: `model_io`

**MlemABC type**: `torch_io`

    IO for PyTorch models

**Fields**:

- `is_jit: bool = False` - Is model jit compiled
