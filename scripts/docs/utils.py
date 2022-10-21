import re
from typing import Dict


DOC_AUTO_REPLACE = {
    "MLEM Object": "[MLEM Object](/doc/user-guide/basic-concepts)",
    "MLEM objects": "[MLEM objects](/doc/user-guide/basic-concepts)",
    "MLEM object": "[MLEM Object](/doc/user-guide/basic-concepts)",
    "MLEM projects": "[MLEM project](/doc/user-guide/project-structure)",
    "MLEM project": "[MLEM project](/doc/user-guide/project-structure)",
    "metafile": "[MLEM Object](/doc/user-guide/basic-concepts)",
    "MLEM configuration": "[MLEM config](/doc/user-guide/configuration)",
    "MLEM config": "[MLEM config](/doc/user-guide/configuration)",
}


def place_links_in_doc(doc):
    for k, v in DOC_AUTO_REPLACE.items():
        doc = doc.replace(k, v)
    return f"\n\n{doc}\n\n"


def get_section(content: str, section_name: str, section_prefix: str = "## "):
    find = re.findall(
        f"{section_prefix}{section_name}(.*?)^{section_prefix}",
        content,
        flags=re.MULTILINE | re.DOTALL,
    )
    if not find:
        return None
    return find[0]


def get_sections(path: str, *sections, section_prefix: str = "## "):
    with open(path, "r") as f:
        content = f.read()
    res = {s: get_section(content, s, section_prefix) for s in sections}
    return {s: v for s, v in res.items() if v}


def replace_section(
    data: str,
    section_name: str,
    new_value: str,
    section_prefix: str = "##",
    section_prefix_space=" ",
) -> str:
    section, n = re.subn(
        f"{section_prefix}{section_prefix_space}{section_name}(.*?)^{section_prefix}",
        f"{section_prefix}{section_prefix_space}{section_name}{new_value}{section_prefix}",
        data,
        flags=re.MULTILINE | re.DOTALL,
    )
    if n == 0:
        raise ValueError(f"Section {section_name} not found")
    return section


def replace_sections(
    data: str, sections: Dict[str, str], section_prefix: str = "## "
) -> str:
    for s, v in sections.items():
        data = replace_section(data, s, v, section_prefix)
    return data
