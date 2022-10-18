import re
from typing import Dict


def get_section(content: str, section_name: str, section_prefix: str = "## "):
    find = re.findall(
        f"{section_prefix}{section_name}(.*?)^{section_prefix}", content,
        flags=re.MULTILINE | re.DOTALL)
    if not find:
        return None
    return find[0]


def get_sections(path: str, *sections, section_prefix: str = "## "):
    with open(path, "r") as f:
        content = f.read()
    res = {s: get_section(content, s, section_prefix) for s in sections}
    return {s: v for s, v in res.items() if v}


def replace_section(data: str, section_name: str, new_value: str,
                    section_prefix: str = "## ") -> str:
    return re.sub(f"{section_prefix}{section_name}(.*?)^{section_prefix}",
                  f"{section_prefix}{section_name}{new_value}{section_prefix}",
                  data, flags=re.MULTILINE | re.DOTALL)


def replace_sections(data: str, sections: Dict[str, str],
                     section_prefix: str = "## ") -> str:
    for s, v in sections.items():
        data = replace_section(data, s, v, section_prefix)
    return data
