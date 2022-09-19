# deployment wait

Wait for status of deployed service

## Synopsis

```usage
usage: mlem deployment wait [-p <path>]
                            [-s <[unknown|not_deployed|starting|crashed|stopped|running]>]
                            [-i <[unknown|not_deployed|starting|crashed|stopped|running]>]
                            [-p <float>] [-t <integer>] [-h]
                            path

arguments:
  path             Path to deployment meta
```

## Description

TODO

## Options

- `-p <path>`, `--project <path>` - Path to MLEM project [default: (none)]
- `-s <[unknown|not_deployed|starting|crashed|stopped|running]>`,
  `--status <[unknown|not_deployed|starting|crashed|stopped|running]>` -
  statuses to wait for [default: DeployStatus.RUNNING]
- `-i <[unknown|not_deployed|starting|crashed|stopped|running]>`,
  `--intermediate <[unknown|not_deployed|starting|crashed|stopped|running]>` -
  Possible intermediate statuses
- `-p <float>`, `--poll-timeout <float>` - Timeout between attempts [default:
  1.0]
- `-t <integer>`, `--times <integer>` - Number of attempts. 0 -> indefinite
  [default: 0]
- `-h`, `--help` - Show this message and exit.

## Example: Wait for deployment setup (after mlem deployment run command)

```cli
$ mlem deployment wait service_name -i starting
```
