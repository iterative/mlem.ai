# Links

Another powerful feature of MLEM if MLEM Links. Links are special lightwight
MLEM Objects that represent MLEM Objects in different locations. That means you
can [reference](/doc/user-guide/project-structure#referencing-mlem-objects)
links everywhere you need to specify MLEM Object.

> Since MLEM Links are also a type of MLEM Objects, they share the same logic,
> for example they are saved under `.mlem/link` directory. To load and instance
> of `MlemLink` (and not the object it references) provide `follow_links=False`
> to `load_meta` method.

## Link structure

The contens of the link is very lightweight and consist of the following fields:

- `link_type` - type of referenced object
- location fields (except `fs`) as in
  [here](/doc/user-guide/project-structure#referencing-mlem-objects)
- [Common MLEM Object fields](/doc/user-guide/basic-concepts#common-fields),
  including `object_type="link""`

## Using links

Links can be created via [`mlem link`](/doc/command-reference/link) or
[`mlem.api.link`](/doc/api-reference/link) commands, as well as
`MlemMeta.make_link` method.

> You can create relative links inside the same repository, which will basically
> create an alias for that object.

Also, since links can target specific commits, tags or branches in a versioned
repository, they can be used in a varaiety of different scenarios, for example
to create a [centralized Model Registry](/doc/use-cases/mlem-mr).
