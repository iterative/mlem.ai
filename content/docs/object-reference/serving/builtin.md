# builtin

## `class HTTPClient`

**MlemABC parent type**: `client`

**MlemABC type**: `http`

    Access models served with http-based servers

**Fields**:

- `raw: bool = False` - Pass values as-is without serializers

- `host: str = "0.0.0.0"` - Server host

- `port: int = 8080` - Server port

---

## `class ModelInterface`

**MlemABC parent type**: `interface`

**MlemABC type**: `model`

    Interface that descibes model methods

**Fields**:

- `model: MlemModel` _(required)_ - Model metadata

---

## `class SimpleInterface`

**MlemABC parent type**: `interface`

**MlemABC type**: `simple`

    Interface that exposes its own methods that marked with `expose`
    decorator

**Fields**:

- `methods: InterfaceDescriptor = InterfaceDescriptor()` - Interface version and
  methods

---

## `class InterfaceDescriptor`

    Class docstring missing

**No fields**
