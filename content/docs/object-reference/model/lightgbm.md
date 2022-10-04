# lightgbm

## `class LightGBMModel`

**MlemABC parent type**: `model_type`

**MlemABC type**: `lightgbm`

    :class:`.ModelType` implementation for `lightgbm.Booster` type

**Fields**:

- `io: ModelIO = LightGBMModelIO()` - LightGBMModelIO

---

## `class LightGBMModelIO`

**MlemABC parent type**: `model_io`

**MlemABC type**: `lightgbm_io`

    :class:`.ModelIO` implementation for `lightgbm.Booster` type

**Fields**:

- `model_file_name: str = "model.lgb"` - Filename to use
