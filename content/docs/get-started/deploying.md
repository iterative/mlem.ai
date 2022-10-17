# Deploying models

You can create deployments in the cloud from your models. This uses building and
serving functions under the hood. For example, Heroku deployment combines Docker
image building with FastAPI serving.

MLEM can deploy to platforms such as
[Sagemaker](/doc/user-guide/deploy/sagemaker) and
[Kubernetes](/doc/user-guide/deploy/sagemaker) (see the full list in
[User Guide](/doc/user-guide/deploy)). For the Get Started, we'll use Heroku as
the example.

## Deploying to Heroku

To create applications on Heroku platform all you need is Heroku API key.

You can either set `HEROKU_API_KEY` environment variable or use
[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) to run
`heroku login`. To allow MLEM to push the Docker image built to Heroku Docker
Registry, you'll also need to execute `heroku container:login`.

<details>

### ⚙️How to obtain Heroku API key

- Go to [heroku.com](http://heroku.com)
- Sign up or login with existing account
- Go to account settings by clicking your profile picture on the main page
- Find API Key section and reveal existing one or re-generate it

</details>

After we authorized in Heroku, we can run the deployment command:

```
$ mlem deployment run heroku app.mlem \
  --model models/rf \
  --app_name example-mlem-get-started-app
⏳️ Loading model from models/rf.mlem
⏳️ Loading deployment from app.mlem
🛠 Creating docker image for heroku
  🛠 Building MLEM wheel file...
  💼 Adding model files...
  🛠 Generating dockerfile...
  💼 Adding sources...
  💼 Generating requirements file...
  🛠 Building docker image registry.heroku.com/example-mlem-get-started-app/web...
  ✅  Built docker image registry.heroku.com/example-mlem-get-started-app/web
  🔼 Pushing image registry.heroku.com/example-mlem-get-started-app/web to registry.heroku.com
  ✅  Pushed image registry.heroku.com/example-mlem-get-started-app/web to registry.heroku.com
🛠 Releasing app example-mlem-get-started-app formation
✅  Service example-mlem-get-started-app is up. You can check it out at https://example-mlem-get-started-app.herokuapp.com/
```

Deployment specification (we call it [declaration](/doc/cli-reference/declare))
was saved to `app.mlem`. Using it, you can re-deploy the same app with a
different model.

<details>

### See app.mlem contents

```yaml
$ cat app.mlem
app_name: example-mlem-get-started-app
object_type: deployment
type: heroku
```

</details>

Beside `app.mlem`, there is one more file that was saved: `app.mlem.state`. It
contains the information about the deployment we just created, including which
MLEM model we used, the URL of the deployment and other useful information. You
can learn more about state files in [User Guide](/doc/user-guide/deploy).

## Making requests

The application is now live on Heroku. You can go
[here](http://example-mlem-get-started-app.herokuapp.com) and see the same
OpenAPI documentation. To learn how to easily send requests to your model with
MLEM, refer to the [User Guide](/doc/user-guide/deploying).

## What's next?

That's it! Thanks for checking out the tool. If you have any questions or
suggestions for us, please reach us out in
[Discord](https://discord.com/channels/485586884165107732/903647230655881226) or
create a new [GitHub issue](https://github.com/iterative/mlem/issues) in our
repo 🙌.

If you would like to destroy the deployment now, you can find the instructions
[here](/doc/user-guide/deploying).

Please proceed to [Use Cases](/doc/use-case) if you want to see high-level
scenarios MLEM can cover, or go to [User Guide](/doc/user-guide) to see more
details or short tutorials on how to use specific features of MLEM.
