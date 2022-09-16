# Deployment extensions

Deployment extensions add support for new target platforms to deploy your models
to. They are used with [`deploy` API method](/doc/api-reference/deploy) and
[deployment CLI commands](/doc/command-reference/deployment).

Typicaly they will implement [MlemEnv](/doc/user-guide/mlem-abcs#mlemenv),
[MlemDeployment](/doc/user-guide/mlem-abcs#mlemdeployment) and
[DeployState](/doc/user-guide/mlem-abcs#deploystate) interfaces.

Some also implement specific [Server](/doc/user-guide/mlem-abcs#server) or  
[Builder](/doc/user-guide/mlem-abcs#builder) interfaces
