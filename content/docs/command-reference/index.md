# Using MLEM Commands

MLEM is a command line tool. Here, we provide the specifications, complete
descriptions, and comprehensive usage examples for different `mlem` commands.

For a list of all commands, type `mlem -h`

## Typical MLEM workflow

First, save models with MLEM using [mlem.api.save](/doc/api-reference/save).
Second, productionize them as you want:

- Load and Apply models with [mlem apply](/doc/command-reference/apply).
- Build models into Python packages or Docker images with
  [mlem build](/doc/command-reference/build).
- Serve your models by exposing their methods as endpoints using
  [mlem serve](/doc/command-reference/serve).
- Deploy your models to various target platforms in the cloud with
  [mlem deployment](/doc/command-reference/deployment).
