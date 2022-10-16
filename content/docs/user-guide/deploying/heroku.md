# Heroku

Implements MlemEnv, MlemDeployment and DeployState to work with heroku.com

## Description

To create applications on Heroku platform all you need is Heroku API key.

<details>

### ⚙️How to obtain Heroku API key

- Go to [heroku.com](http://heroku.com)
- Sign up or login with existing account
- Go to account settings by clicking your profile picture on the main page
- Find API Key section and reveal existing one or re-generate it

</details>

You can either set `HEROKU_API_KEY` environment variable or use [Heroku CLI]()
to run `heroku login` and `heroku container:login`.

> You can also set API token via `--api_key` option to some commands, but this
> may have security issues

## Requirements

```bash
pip install mlem[heroku]
# or
pip install fastapi uvicorn docker
```

## Examples

### Deploying model to heroku from CLI

```cli
$ mlem deployment run heroku_app \
  --model https://github.com/iterative/example-mlem-get-started/rf \
  --target heroku \
  --app_name example-mlem-get-started-app
```
