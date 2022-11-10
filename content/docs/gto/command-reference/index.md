# Using GTO Commands

GTO is a command line tool. Here, we provide the specifications, complete
descriptions, and comprehensive usage examples for different `gto` commands.

For a list of all commands, type `gto -h`.

## Read the registry

- Show the registry state, highest version, or what's assigned in stage with
  `gto show`
- Find out the artifact version registered/assigned with ref with
  `gto check-ref`
- Show a journal of registry operations with `gto history`
- Print list of stages used in the registry with `gto stages`

## Modify artifacts

- Assign stage to specific artifact version with `gto assign`
- Deprecate artifact, deregister a version, or unassign a stage with
  `gto deprecate`
- Create an artifact version to signify an important, published or released
  iteration with `gto register`

## Manage artifact enrichments

- Update artifact metadata annotations with `gto annotate`
- Display enrichments for an artifact with `gto describe`
- Remove the enrichment for given artifact with `gto remove`
