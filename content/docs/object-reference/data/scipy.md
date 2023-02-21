# scipy

## `class ScipyReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `csr_matrix`

    Read scipy matrix from npz format

**No fields**

---

## `class ScipySparseMatrix`

**MlemABC parent type**: `data_type`

**MlemABC type**: `csr_matrix`

    DataType implementation for scipy sparse matrix

**Fields**:

- `dtype: str` _(required)_ - Dtype of `sparse.csr_matrix` object in data

---

## `class ScipyWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `csr_matrix`

    Write scipy matrix to npz format

**No fields**
