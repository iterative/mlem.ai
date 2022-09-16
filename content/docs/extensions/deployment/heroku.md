# Heroku Deployments Support

## Requirements

```bash
pip install mlem[heroku]
# or
pip install fastapi uvicorn docker
```

## Examples

```python

```

## Implementation reference

### `class HerokuState`

**MlemABC parent type**: `deploy_state`

**MlemABC type**: `heroku`

    State of heroku deployment

**Fields**:

- `model_hash: str` - hash of deployed model meta

- `app: HerokuAppMeta` - Created heroku app

- `image: DockerImage` - Built docker image

---

### `class HerokuDeployment`

**MlemABC parent type**: `deployment`

**MlemABC type**: `heroku`

    Heroku App

**Fields**:

- `app_name: str` _(required)_ - Heroku application name

- `state_manager: StateManager` - State manager used

- `region: str = "us"` - Heroku region

- `stack: str = "container"` - Stack to use

- `team: str` - Heroku team

---

### `class HerokuRemoteRegistry`

**MlemABC parent type**: `docker_registry`

**MlemABC type**: `heroku`

    Heroku docker registry

**Fields**:

- `host: str = "registry.heroku.com"` - Registry host

- `api_key: str` - HEROKU_API_KEY

---

### `class HerokuEnv`

**MlemABC parent type**: `env`

**MlemABC type**: `heroku`

    Heroku Account

**Fields**:

- `api_key: str` - HEROKU_API_KEY - advised to set via env variable or
  `heroku login`

---

### `class HerokuServer`

**MlemABC parent type**: `server`

**MlemABC type**: `_heroku`

    Special FastAPI server to pickup port from env PORT

**Fields**:

- `host: str = "0.0.0.0"` - Network interface to use

- `port: int = 8080` - Port to use
