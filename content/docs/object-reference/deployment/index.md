# Deployment extensions

Deployment extensions add support for new target platforms to deploy your models
to. They are used with [`deploy` API method](/doc/api-reference/deploy) and
[deployment CLI commands](/doc/command-reference/deployment).

Typicaly they will implement [MlemEnv](/doc/object-reference/mlem-abcs#mlemenv),
[MlemDeployment](/doc/object-reference/mlem-abcs#mlemdeployment) and
[DeployState](/doc/object-reference/mlem-abcs#deploystate) interfaces.

Some also implement specific [Server](/doc/object-reference/mlem-abcs#server)
or  
[Builder](/doc/object-reference/mlem-abcs#builder) interfaces
