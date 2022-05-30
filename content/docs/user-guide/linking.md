# Links

Another powerful feature of MLEM is linking. Links are lightweight objects that
represent MLEM Objects in other locations. You can
[reference](/doc/user-guide/project-structure#referencing-mlem-objects) links
anywhere you need to specify MLEM Object bot in API and CLI.

<admon type="tip">

Since links are also a type of MLEM Object, they share the same internal logic.
For example, they are saved under the `.mlem/link` directory. To load an
instance of `MlemLink` (and not the object it references) provide
`follow_links=False` to `load_meta` method.

</admon>

## Link structure

The content of the link is very lightweight and consists of the following
fields:

- `link_type` - type of referenced object
- location fields (except `fs`) as in
  [here](/doc/user-guide/project-structure#referencing-mlem-objects)
- [Common MLEM Object fields](/doc/user-guide/basic-concepts#common-fields),
  including `object_type="link""`

## Using links

Links can be created via [`mlem link`](/doc/command-reference/link) command or
[`mlem.api.link`](/doc/api-reference/link) API, as well as the
`MlemObject.make_link()` method.

<admon type="tip">

You can create relative links inside the same repository, which will basically
create an alias for that object.

</admon>

Also, since links can target specific commits, tags or branches in a versioned
repository, they can be used in a variety of different scenarios, for example to
create a [centralized Model Registry](/doc/use-cases/mlem-mr).
