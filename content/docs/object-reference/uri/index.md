# URI Resolver extensions

MLEM CLI commands and API methods can work with
[MLEM objects](/doc/user-guide/basic-concepts) whether they are local or
[remote](/doc/user-guide/remote-objects). URI Resolver extensions add support
for different URI patterns that MLEM will understand whenever you reference any
MLEM object or project.

Typicaly they will implement
[URIResolver](/doc/object-reference/mlem-abcs#uriresolver) interface.
