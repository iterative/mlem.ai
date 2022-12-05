# fastapi

## `class FastAPIServer`

**MlemABC parent type**: `server`

**MlemABC type**: `fastapi`

    Serves model with http

**Fields**:

- `interface: InterfaceDescriptor` - Optional augmented interface

- `strict_interface: bool = False` - Whether to force identical interface

- `standardize: bool = True` - Whether to conform model interface to standard
  ("predict" method with single arg "data")

- `host: str = "0.0.0.0"` - Network interface to use

- `port: int = 8080` - Port to use
