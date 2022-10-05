# heroku

## `class HerokuDeployment`

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

## `class HerokuEnv`

**MlemABC parent type**: `env`

**MlemABC type**: `heroku`

    Heroku Account

**Fields**:

- `api_key: str` - HEROKU_API_KEY - advised to set via env variable or
  `heroku login`

---

## `class HerokuState`

**MlemABC parent type**: `deploy_state`

**MlemABC type**: `heroku`

    State of heroku deployment

**Fields**:

- `model_hash: str` - Hash of deployed model meta

- `app: HerokuAppMeta` - Created heroku app

- `image: DockerImage` - Built docker image
