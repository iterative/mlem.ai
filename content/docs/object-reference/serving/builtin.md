# builtin

## `class HTTPClient`

**MlemABC parent type**: `client`

**MlemABC type**: `http`

    Access models served with http-based servers

**Fields**:

- `host: str = "0.0.0.0"` - Server host

- `port: int = 8080` - Server port

---

## `class ModelInterface`

**MlemABC parent type**: `interface`

**MlemABC type**: `model`

    Interface that descibes model methods

**No fields**

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

**Fields**:

- `version: str = "0.2.9.dev32+g5515c23"` - mlem version
