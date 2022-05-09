import json
from pathlib import Path

ORDER = {
    ".": [
        'install',
        'start',
        'use-cases',
        'user-guide',
        'cli-reference',
        'api-reference',
        # 'extensions',
        'contributing'
    ],
    "install": [],
    "start": [
        'saving-loading.md',
        'packaging.md',
        'serving.md',
        'deploying.md'
    ],
    "use-cases": [
        'dvc.md',
        'mlem-mr.md',
        'dvc-pipeline.md',
        'cicd.md',
        'dvc-gto-studio.md'
    ],
    "user-guide": [
        'what-is-mlem.md',
        'basic-concepts.md',
        'project-structure.md',
        'remote-repos.md',
        'configuration.md',
        'importing.md',
        'linking.md',
        'mlem-abcs.md',
        'extending.md',
        'analytics.md'
    ],
    "api-reference": [
        'init.md',
        'save.md',
        'load.md',
        'load_meta.md',
        "mlem-object.md",
        'ls.md',
        'import_object.md',
        'link.md',
        'clone.md',
        'apply.md',
        'pack.md',
        'serve.md',
        'deploy.md', ],

    "cli-reference": [
        'init.md',
        'list.md',
        'pprint.md',
        'create.md',
        'serve.md',
        'types.md',
        'link.md',
        'clone.md',
        'import.md',
        'pack.md',
        'apply.md',
    ],
    "contributing": [],
    "extensions": [
        'models',
        'datasets',
        'packaging',
        'serving',
        'deployment',
    ],
    "extensions/packaging": [
        'pip.md',
        'docker.md'
    ],
    "extensions/serving": ['fastapi.md'],
    "extensions/datasets": [
        'numpy.md',
        'pandas.md'
    ],
    "extensions/models": [
        'sklearn.md',
        'catboost.md',
        'xgboost.md',
        'lightgbm.md',
        'torch.md',
    ],
    "extensions/deployment": ['heroku.md']

}

EXCLUDE = [
    "extensions",
    "use-cases/airflow.md"
]

ICONS = {
    "index.md": "house"
}

LABELS = {
    "use-cases/cicd.md": "Using in CI/CD"
}


def get_label(path):
    if str(path) in LABELS:
        return LABELS[str(path)]
    for line in path.open():
        if line.startswith("# "):
            return line.lstrip("#").strip()
    return ""


def file_sidebar(path):
    res = {
        "slug": path.stem,
        "label": get_label(path),
        "source": str(path)
    }
    if str(path) in ICONS:
        res["icon"] = ICONS[str(path)]
    return res


def dir_children_sidebar(path):
    res = {}
    for child in path.glob('*'):
        if str(child) in EXCLUDE:
            continue
        if child.is_dir():
            res[child.name] = dir_sidebar(child)
        elif child.name.endswith(".md") and not child.name.endswith("index.md"):
            res[child.name] = file_sidebar(child)
    unordered = list(set(res.keys()).difference(ORDER.get(str(path), [])))
    order = ORDER.get(str(path), []) + unordered
    if unordered:
        print(f'"{path}": {order}')
    return [] + [res[name] for name in order]


def dir_sidebar(path):
    res = file_sidebar(path / "index.md")
    ch = dir_children_sidebar(path)
    if ch:
        res["children"] = ch
    res["slug"] = path.stem
    return res


def main():
    res = dir_sidebar(Path(""))
    ch = res.pop("children")
    res = [res, *ch]
    with open("sidebar.json", "w") as f:
        json.dump(res, f, indent=2)


if __name__ == '__main__':
    main()
