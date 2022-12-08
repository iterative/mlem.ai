# builtin

## `class ArrayReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `array`

    Reader for lists with single element type

**Fields**:

- `data_type: ArrayType` _(required)_ - Resulting data type

---

## `class ArrayType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `array`

    DataType for lists with elements of the same type such as [1, 2, 3, 4,
    5]

**Fields**:

- `dtype: DataType` _(required)_ - DataType of elements

- `size: int` - Size of the list

---

## `class ArrayWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `array`

    Writer for lists with single element type

**No fields**

---

## `class BinaryDataReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `binary`

    Reader for binary data

**No fields**

---

## `class BinaryDataType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `binary`

    Represents raw binary data

**No fields**

---

## `class BinaryDataWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `binary`

    Writer for binary data

**No fields**

---

## `class DictReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `dict`

    Reader for dicts

**Fields**:

- `data_type: DictType` _(required)_ - Resulting data type

---

## `class DictType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `dict`

    DataType for dict with fixed set of keys

**No fields**

---

## `class DictWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `dict`

    Writer for dicts

**No fields**

---

## `class DynamicDictReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `d_dict`

    Read dicts without fixed set of keys

**Fields**:

- `data_type: DynamicDictType` _(required)_ - Resulting data type

---

## `class DynamicDictType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `d_dict`

    Dynamic DataType for dict without fixed set of keys

**Fields**:

- `key_type: PrimitiveType` _(required)_ - DataType for key (primitive)

- `value_type: DataType` _(required)_ - DataType for value

---

## `class DynamicDictWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `d_dict`

    Write dicts without fixed set of keys

**No fields**

---

## `class ListType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `list`

    DataType for list with separate type for each element
    such as [1, False, 3.2, "mlem", None]

**No fields**

---

## `class PrimitiveReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `primitive`

    Reader for primitive types

**Fields**:

- `data_type: PrimitiveType` _(required)_ - Resulting data type

---

## `class PrimitiveType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `primitive`

    DataType for int, str, bool, complex and float types

**Fields**:

- `ptype: str` _(required)_ - Name of builtin type

---

## `class PrimitiveWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `primitive`

    Writer for primitive types

**No fields**

---

## `class TupleType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `tuple`

    DataType for tuple type

**No fields**

---

## `class UnspecifiedDataType`

**MlemABC parent type**: `data_type`

**MlemABC type**: `unspecified`

    Special data type for cases when it's not provided

**No fields**

---

## `class _TupleLikeReader`

**MlemABC parent type**: `data_reader`

**MlemABC type**: `tuple_like`

    Reader for tuple-like data

**Fields**:

- `data_type: _TupleLikeType` _(required)_ - Resulting data type

---

## `class _TupleLikeWriter`

**MlemABC parent type**: `data_writer`

**MlemABC type**: `tuple_like`

    Writer for tuple-like data

**No fields**
