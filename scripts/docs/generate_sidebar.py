import glob
import json
import os.path
from pathlib import Path
from typing import List

SIDEBAR_PATH = "../../content/docs/sidebar.json"
DOCS_PATH = os.path.dirname(SIDEBAR_PATH)

IGNORE = [
    "user-guide/what-is-mlem.md",
    "api-reference/mlem-object.md",
    "user-guide/models",
    "user-guide/data",
]


def get_label(path):
    for line in path.open():
        if line.startswith("# "):
            return line.lstrip("#").strip()
    return ""


def get_sidebar_paths(nodes, parent=""):
    for node in nodes:
        if node["source"]:
            path = parent + node["source"]
            yield path
            parent_path = path[: -len("/index.md")] + "/"
        else:
            parent_path = node["slug"] + "/"

        if "children" in node:
            yield from get_sidebar_paths(node["children"], parent=parent_path)


def adjust_sidebar(sidebar, to_add: List[str], to_remove: List[str], parent: str = ""):
    res = []
    for entry in sidebar:
        if entry["source"] and parent + entry["source"] in to_remove:
            print("removing", parent + entry["source"])
            continue

        if "children" in entry:
            parent_path = (
                parent + entry["source"][: -len("/index.md")]
                if entry["source"]
                else entry["slug"]
            )
            entry["children"] = adjust_sidebar(
                entry["children"], to_add, to_remove, parent_path + "/"
            )

        res.append(entry)
    for add_root, add_file in [os.path.split(a) for a in to_add]:
        if add_file == "index.md":
            add_root, root_name = os.path.split(add_root)
            add_file = os.path.join(root_name, add_file)
        if add_root + "/" == parent or (parent == add_root == ""):
            path = Path(DOCS_PATH) / add_root / add_file
            print("adding", parent, add_root, add_file)
            slug = os.path.dirname(add_file) or add_file[: -len(".md")]
            res.append(
                {
                    "slug": slug,
                    "label": get_label(path),
                    "source": str(add_file),
                    "children": [],
                }
            )
    return res


def main():
    with open(SIDEBAR_PATH, "r") as f:
        sidebar = json.load(f)

    md_files = [
        os.path.relpath(p, DOCS_PATH)
        for p in glob.glob(os.path.join(DOCS_PATH, "**", "*.md"), recursive=True)
    ]

    sidebar_paths = list(get_sidebar_paths(sidebar))

    new_files = list(set(md_files).difference(sidebar_paths))
    new_files = [
        f for f in new_files if not any(f.startswith(ignored) for ignored in IGNORE)
    ]
    removed_files = list(set(sidebar_paths).difference(md_files))

    sidebar = adjust_sidebar(sidebar, new_files, removed_files)
    with open(SIDEBAR_PATH, "w") as f:
        json.dump(sidebar, f, indent=2)
        f.write("\n")


if __name__ == "__main__":
    main()
