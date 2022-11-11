# Acting downstream

Once Git tag was pushed, you can start acting downstream. One of the popular
options here is to use CI/CD, setting it to be triggered by pushing a Git tag.
For general details, check out something like
[GitHub Actions](https://github.com/features/actions),
[GitLab CI/CD](https://docs.gitlab.com/ee/ci/) or
[Circle CI](https://circleci.com).

The other option is to
[configure webhooks](https://docs.github.com/en/rest/webhooks) that will send
HTTP requests to your server upon pushing Git tags to the remote.

Finally, you can configure your server to query your Git provider via something
like REST API to check if changes happened. As an example, check out
[Github REST API](https://docs.github.com/en/rest).

## Getting started with CI/CD

To act upon registrations and assignments (Git tags), you can create a simple CI
workflow. To see an example, check out
[the workflow in `example-gto` repo](https://github.com/iterative/example-gto/blob/main/.github/workflows/gto-act-on-tags.yml).
The workflow uses [the GTO GH Action](https://github.com/iterative/gto-action)
that fetches all Git tags (to correctly interpret the Registry), finds out the
`version` of the artifact that was registered, the `stage` that was assigned,
and annotations details such as `path`, `type`, `description`, etc, so you could
use them in the next steps of the CI.

## Helpful commands

If you would like to set up CI/CD, but don't want to use GTO GH Action, check
out `gto show`, `gto check-ref` and `gto describe` commands.
