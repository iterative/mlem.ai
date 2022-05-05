# Anonymized Usage Analytics

To help us better understand how MLEM is used and improve it, MLEM captures 
and reports _anonymized_ usage statistics. You will be notified the first time 
you run `mlem init`.

## Motivation

Analytics help us to decide on how best to design future features and prioritize
current work. Anonymous aggregates of user analytics allow us to prioritize
fixes and improvements based on how, where and when people use MLEM.

## Retention period

User and event data have a 14 month retention period.

## What

MLEM's analytics record the following information per event:

- MLEM version (e.g., `0.1.2+5fb5a3.mod`) and OS version (e.g., `MacOS 10.16`)
- Command name and exception type (e.g., `ls, ValueError` or `get, MLEMRootNotFound`)
- Country, city (e.g., `RU, Moscow`)
- A random user_id (e.g. `8ca59a29-ddd9-4247-992a-9b4775732aad`), 
  generated with [`uuid`](https://docs.python.org/3/library/uuid.html)

This _does not allow us to track individual users_ but does enable us to
accurately measure user counts vs. event counts.

## Implementation

The code is viewable in [analytics.py](https://github.com/iterative/mlem/mlem/analytics.py).
They are done in a separate background process and fail fast to avoid delaying any execution. 
They will fail immediately and silently if you have no network connection.

MLEM's analytics are sent through Iterative's proxy to Google BigQuery over HTTPS.

## Opting out

MLEM analytics help the entire community, so leaving it on is appreciated.
However, if you want to opt out of MLEM's analytics, you can disable it via 
setting an environment variable `MLEM_NO_ANALYTICS=true` or by adding 
`no_analytics: true` to `.mlem/config.yaml`

This will disable it for the project. We'll add an option to opt out globally soon.
