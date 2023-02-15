# sklearn

## `class SklearnModel`

**MlemABC parent type**: `model_type`

**MlemABC type**: `sklearn`

    ModelType implementation for `scikit-learn` models

**Fields**:

- `io: ModelIO = SimplePickleIO()` - IO

---

## `class SklearnPipelineType`

**MlemABC parent type**: `model_type`

**MlemABC type**: `sklearn_pipeline`

    ModelType implementation for `scikit-learn` pipelines

**Fields**:

- `io: ModelIO = SimplePickleIO()` - IO

---

## `class SklearnTransformer`

**MlemABC parent type**: `model_type`

**MlemABC type**: `sklearn_transformer`

    Model Type implementation for sklearn transformers

**Fields**:

- `io: ModelIO = SimplePickleIO()` - IO
