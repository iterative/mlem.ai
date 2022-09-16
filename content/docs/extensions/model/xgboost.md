# Xgboost Models Support

[ModelType](/doc/user-guide/mlem-abcs#modeltype) and
[ModelIO](/doc/user-guide/mlem-abcs#modelio) implementations for
`xgboost.Booster` as well as DataType, Reader and Writer implementations for
`xgboost.DMatrix`

## Description

**TODO**

## Requirements

```bash
pip install mlem[xgboost]
# or
pip install xgboost
```

## Examples

```python

```

## Implementation reference

### `class DMatrixDataType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `xgboost_dmatrix`

    DataType implementation for xgboost.DMatrix type

**Fields**:

- `is_from_list: bool` _(required)_ - Whether DMatrix can be constructed from
  list

---

### `class XGBoostModelIO`

**MlemABC parent type**: `model_io`

**MlemABC type**: `xgboost_io`

    :class:`~.ModelIO` implementation for XGBoost models

**Fields**:

- `model_file_name: str = "model.xgb"` - Filename to use

---

### `class XGBoostModel`

**MlemABC parent type**: `model_type`

**MlemABC type**: `xgboost`

    :class:`~.ModelType` implementation for XGBoost models

**Fields**:

- `io: ModelIO = XGBoostModelIO()` - Model IO
