# flyio

## `class FlyioApp`

**MlemABC parent type**: `deployment`

**MlemABC type**: `flyio`

    fly.io deployment

**Fields**:

- `org: str` - Organization name

- `region: str` - Region name

- `state_manager: StateManager` - State manager used

- `image: str` - Image name for docker image

- `app_name: str` - Application name. Leave empty for auto-generated one

- `scale_memory: int` - Set VM memory to a number of megabytes (256/512/1024
  etc)

- `server: Server` - Server to use

---

## `class FlyioAppState`

**MlemABC parent type**: `deploy_state`

**MlemABC type**: `flyio`

    fly.io app state

**Fields**:

- `declaration: MlemDeployment` _(required)_ - Deployment declaration used

- `model_hash: str` - Hash of deployed model meta

- `model_link: TypedMlemLink` - Link to deployed model

- `fly_toml: str` - Contents of fly.toml file for app

- `app_name: str` - Application name

- `hostname: str` - Application hostname

---

## `class FlyioEnv`

**MlemABC parent type**: `env`

**MlemABC type**: `flyio`

    fly.io organization/account

**Fields**:

- `org: str` - Organization name

- `region: str` - Region name

- `access_token: str` - Access token for fly.io. Alternatively use
  `flyctl auth login`
