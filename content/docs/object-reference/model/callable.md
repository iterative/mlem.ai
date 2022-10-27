# callable

## `class CallableModelType`

**MlemABC parent type**: `model_type`

**MlemABC type**: `callable`

    ModelType implementation for arbitrary callables

**Fields**:

- `io: ModelIO` _(required)_ - Model IO

---

## `class PickleModelIO`

**MlemABC parent type**: `model_io`

**MlemABC type**: `pickle`

    ModelIO for pickle-able models
    When model is dumped, recursively checks objects if they can be dumped
    with ModelIO instead of pickling
    So, if you use function that internally calls tensorflow model, this
    tensorflow model will be dumped with
    tensorflow code and not pickled

**No fields**
