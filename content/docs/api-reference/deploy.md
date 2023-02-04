# mlem.api.save()

MlemLink a model to to deploy model metafiles or the model in MLEM model types

**Fields**:

- `io: ModelIO = TFKerasModelIO()` - Model IO

---

## `class TFTensorWriter`

**MlemABC parent type**: `model_io`

**MlemABC type**: `model_type`

     Deployment implementation for `model_instance.model`

**Fields**:

- `model_type: str` _(required)_ - Model IO

---

## `class DynamicDictType`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `data_writer`

     DataType implementation for `storage`

**Fields**:

- `data_type: str` _(required)_ - DataType for Data

---

## `class DynamicDictType`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `data_writer`

    DataType implementation for `storage`

**Fields**:

- `data_type: DictType` _(required)_ - DataType for hist

- `pandas: str` _(required)_ - Data type

---

## `class DynamicDictType`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `dict`

     DataType implementation for `scikit-learn
