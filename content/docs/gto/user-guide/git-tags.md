# Git tags format

Each event (version registration, stage assignment, artifact deprecation) has
it's own standard format of Git tags.

All of them share two parts:

1. `{artifact}` prefix part.
2. `#{e}` counter at the end that can be omitted ("simple" Git tag format).

Generally, `#{e}` counter is used, because Git doesn't allow to create two Git
tags with the same name. If you want to have two Git tags that assign `dev`
stage to `model` artifact without the counter (`model#dev`), that will require
deleting the old Git tag first. Consequently, that doesn't allow you to preserve
history of events that happened.

By default, `#{e}` sometimes is omitted, sometimes not. We are setting defaults
to omit using `#{e}` when it's rarely necessary, e.g. for version registrations
and artifact deprecations.

Git tag formats:

- `{artifact_name}@{version_number}#{e}` for Version registration.
- `{artifact_name}#{stage}#{e}` for Stage assignment.
- `{artifact_name}@deprecated#{e}` for Artifact deprecation.
