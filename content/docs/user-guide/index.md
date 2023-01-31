# User Guide

Our guides describe the major concepts in MLEM and how it works comprehensively,
explaining when and how to use its features.

## Codification: the MLEM way

Saving machine learning models to files or loading them back into Python objects
may seem like a simple task at first. For example, the `pickle` and `torch`
libraries can serialize/deserialize model objects to/from files. However, MLEM
adds some "special sauce" by inspecting the objects and [saving] their metadata
into `.mlem` metafiles and using these intelligently later on.

The metadata in `.mlem` files is necessary to reliably enable actions like
[packaging] and [serving] different model types in various ways. MLEM allows us
to automate a lot of the pain points we would hit in typical ML workflows by
codifying and managing the information about our ML models (or other [objects])
for us.

[saving]: /doc/user-guide/models
[packaging]: /doc/user-guide/building
[serving]: /doc/user-guide/serving
[objects]: /doc/user-guide/basic-concepts
