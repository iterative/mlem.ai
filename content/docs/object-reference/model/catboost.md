# catboost

## `class CatBoostModel`

**MlemABC parent type**: `model_type`

**MlemABC type**: `catboost`

    :class:`mlem.core.model.ModelType` for CatBoost models.
    `.model` attribute is a `catboost.CatBoostClassifier` or
    `catboost.CatBoostRegressor` instance

**Fields**:

- `io: ModelIO = CatBoostModelIO()` - Model IO

---

## `class CatBoostModelIO`

**MlemABC parent type**: `model_io`

**MlemABC type**: `catboost_io`

    :class:`mlem.core.model.ModelIO` for CatBoost models.

**Fields**:

- `model_type: CBType = "reg"` - Type of catboost model
