# Git tags format

<admon type="tip">

You can work with GTO without knowing the used Git tag names conventions, since
commands like `gto register` and `gto assign` abstracts that away from you.

</admon>

All events have the standard formats of Git tags:

- `{artifact_name}@{version_number}#{e}` for version registration.
- `{artifact_name}@{version_number}!#{e}` for version deregistration.
- `{artifact_name}#{stage}#{e}` for stage assignment.
- `{artifact_name}#{stage}!#{e}` for stage unassignment.
- `{artifact_name}@deprecated#{e}` for artifact deprecation.

All of them share two parts:

1. `{artifact_name}` prefix part.
2. `#{e}` counter at the end that can be omitted (in "simple" Git tag format).

Generally, `#{e}` counter is used, because Git doesn't allow to create two Git
tags with the same name. If you want to have two Git tags that assign `dev`
stage to `model` artifact without the counter (`model#dev`), that will require
deleting the old Git tag first. Consequently, that doesn't allow you to preserve
history of events that happened.

By default, `#{e}` sometimes is omitted, sometimes not. We are setting defaults
to omit using `#{e}` when it's rarely necessary, e.g. for version registrations
and artifact deprecations.
