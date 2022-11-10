# xgboost

## `class XGBoostModel`

**MlemABC parent type**: `model_type`

**MlemABC type**: `xgboost`

    :class:`~.ModelType` implementation for XGBoost models

**Fields**:

- `io: ModelIO = XGBoostModelIO()` - Model IO

---

## `class XGBoostModelIO`

**MlemABC parent type**: `model_io`

**MlemABC type**: `xgboost_io`

    :class:`~.ModelIO` implementation for XGBoost models

**Fields**:

- `model_file_name: str = "model.xgb"` - Filename to use
