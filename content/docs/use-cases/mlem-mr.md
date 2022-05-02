# Pure Mlem Model Registry

If your Data Science team have a lot of different projects, it doesn't make
sense to develop them in a single repository. But for production it's good to
have a single source of truth to know what is deployed.

Mlem Links can be used to create a separate Model Registry repository, which
will consist only of links to objects in developers repositories.

This way your deployment system doesn't need to know of every developer
repository.

Also, you can use different branches in MR repo to employ gitflow-like process.

And via configuring permissions for this repo you can approve new model versions
for production.

[comment]: <> (TODO: setup 2 "research" repos and MR repo and show the process
of deploying new model)
