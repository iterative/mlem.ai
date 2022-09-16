# Catboost Models Support

Implementations of [ModelType](/doc/user-guide/mlem-abcs#modeltype) and
[ModelIO](/doc/user-guide/mlem-abcs#modelio) for `CatBoostClassifier` and
`CatBoostRegressor`

## Requirements

```bash
pip install mlem[catboost]
# or
pip install catboost
```

## Examples

```python

```

## Implementation reference

### `class CatBoostModelIO`

**MlemABC parent type**: `model_io`

**MlemABC type**: `catboost_io`

    :class:`mlem.core.model.ModelIO` for CatBoost models.

**Fields**:

- `model_type: CBType = "reg"` - Type of catboost model

---

### `class CatBoostModel`

**MlemABC parent type**: `model_type`

**MlemABC type**: `catboost`

    :class:`mlem.core.model.ModelType` for CatBoost models.
    `.model` attribute is a `catboost.CatBoostClassifier` or
    `catboost.CatBoostRegressor` instance

**Fields**:

- `io: ModelIO = CatBoostModelIO()` - Model IO
