import inspect
import os
import re
import textwrap
from pathlib import Path

from utils import replace_section

DOCS_PATH = Path(__file__).parent.parent.parent / "content" / "docs"
API_DOCS_PATH = str(DOCS_PATH / "api-reference")


def get_signature(cmd):
    source = inspect.getsource(cmd)
    return source.split('"""')[0].strip().strip(":")


def get_docs(cmd):
    docs = cmd.__doc__ or ""
    docs = docs.split("Args:")[0].strip()
    docs = re.subn("\s+", " ", docs)[0]
    return textwrap.fill(docs, width=79)


def generate_signature(cmd):
    return f"""{get_docs(cmd)}

```py
{get_signature(cmd)}
```"""


def check_command(cmd, name, path):
    with open(path, "r", encoding="utf8") as f:
        content = f.read()

    title = f"mlem.api.{name}()"

    signature, content = content.split("### ", maxsplit=1)
    content = f"""# {title}

{generate_signature(cmd)}

### {content}"""
    with open(path, "w", encoding="utf8") as f:
        f.write(content)


def generate_api():
    from mlem import api

    commands = []
    not_commands = []
    for k, v in api.__dict__.items():
        if k.startswith("__") or not callable(v):
            not_commands.append(k)
        else:
            commands.append(v)

    for cmd in commands:
        name = cmd.__name__
        cmd_path = os.path.join(API_DOCS_PATH, name + ".md")
        if not os.path.exists(cmd_path):
            print(f"creating {name}")
        else:
            print(f"cheching {name}")
            check_command(cmd, name, cmd_path)


def main():
    generate_api()


if __name__ == '__main__':
    main()
