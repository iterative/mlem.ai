# mlem.api.save()

MlemObject a MLEM Object from a local MLEM model metadatasets and models.

**Base class**: `mlem.core.objects.MlemLink`

**Fields** (in additional)

- `path = models/rf.mlem.core.objects.MlemLink` - Link to save the model files
  (example)

**Fields**:

- `path = models/rf.mlem.core.model.ModelIO`

**Fields**:

- `io: ModelIO = TFKerasModelIO()` - Model IO

---

## `class TFKerasModelIO`

**MlemABC parent type**: `model_io`

**MlemABC type**: `model_type`

     ModelType implementation for `model.Model`

**Fields**:

- `io: ModelIO = TFKerasModelIO()` - Model IO

---

## `class TFTensorWriter`

**MlemABC parent type**: `model_type`

**MlemABC type**: `model_type`

      ModelType implementation for `.model.Model`

**Fields**:

- `io: ModelIO = TFKerasModelIO()` - IO

---

## `class TFKerasModelIO`

**MlemABC parent type**: `model_type`

**MlemABC type**: `model_type`

      DataType implementation for `model.Model`

**Fields**:

- `model_type: str` _(required)_ - Model
