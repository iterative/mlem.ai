# tensorflow

## `class TFKerasModel`

**MlemABC parent type**: `model_type`

**MlemABC type**: `tf_keras`

    :class:`.ModelType` implementation for Tensorflow Keras models

**Fields**:

- `io: ModelIO = TFKerasModelIO()` - IO

---

## `class TFKerasModelIO`

**MlemABC parent type**: `model_io`

**MlemABC type**: `tf_keras`

    IO for Tensorflow Keras models (:class:`tensorflow.keras.Model`
    objects)

**Fields**:

- `save_format: str` - `tf` for custom net classes and `h5` otherwise
