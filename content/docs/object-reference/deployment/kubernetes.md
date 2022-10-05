# kubernetes

## `class K8sDeployment`

**MlemABC parent type**: `deployment`

**MlemABC type**: `kubernetes`

    MlemDeployment implementation for Kubernetes deployments

**Fields**:

- `namespace: str = "mlem"` - Namespace to create kubernetes resources such as
  pods, service in

- `image_name: str = "ml"` - Name of the docker image to be deployed

- `image_uri: str = "ml:latest"` - URI of the docker image to be deployed

- `image_pull_policy: ImagePullPolicy = "Always"` - Image pull policy for the
  docker image to be deployed

- `port: int = 8080` - Port where the service should be available

- `service_type: ServiceType = NodePortService()` - Type of service by which
  endpoints of the model are exposed

- `state_manager: StateManager` - State manager used

- `server: Server` - Type of Server to use, with options such as FastAPI,
  RabbitMQ etc.

- `registry: DockerRegistry = DockerRegistry()` - Docker registry

- `daemon: DockerDaemon = host=''` - Docker daemon

- `kube_config_file_path: str` - Path for kube config file of the cluster

---

## `class K8sDeploymentState`

**MlemABC parent type**: `deploy_state`

**MlemABC type**: `kubernetes`

    DeployState implementation for Kubernetes deployments

**Fields**:

- `model_hash: str` - Hash of deployed model meta

- `image: DockerImage` - Docker Image being used for Deployment

- `deployment_name: str` - Name of Deployment

---

## `class K8sEnv`

**MlemABC parent type**: `env`

**MlemABC type**: `kubernetes`

    MlemEnv implementation for Kubernetes Environments

**Fields**:

- `registry: DockerRegistry` - Docker registry
