# Using MLEM Commands

MLEM is a command line tool. Here, we provide the specifications, complete
descriptions, and comprehensive usage examples for `mlem` commands.

For a list of commands, type `mlem -h`

## Typical MLEM workflow

- Initialize a MLEM project in a Git Repo with
  [mlem init](/doc/cli-reference/init).
- Save Models and Datasets with MLEM.
- Load and Apply models with [mlem apply](/doc/cli-reference/apply).
- Package models into python packages or docker images with
  [mlem pack](/doc/cli-reference/pack).
- Serve your models by exposing their methods as endpoints using
  [mlem serve](/doc/cli-reference/serve).
- Deploy your models to various target platforms in the cloud with
  [mlem deploy](/doc/cli-reference/deploy).
