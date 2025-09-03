---
title: ConfigMaps in K8s
date: 2024-02-06
tags: [Kubernetes, k8s, CloudNative]
category: Kubernetes
summary: Creating and using config maps in Kubernetes
---

### Motivation

Container images often [accept Environment Variables](https://stackoverflow.com/a/30494145/7368018) for configuring their environments, for example the [redis image](https://hub.docker.com/_/redis) accepts [`REDIS_VERSION`](https://github.com/docker-library/redis/blob/b77450d34ae54354f41970fc44bf840353f59ef4/7.2/debian/Dockerfile#L59C5-L59C18) for a specific redis version. Below command starts a redis container, passing a desired `REDIS_VERSION`  environment variable.

```bash
crictl run -t redis -e REDIS_VERSION=7.2 redis
```

And to start a redis `Pod`, imperatively:

```bash
kubectl run --image=redis --env=REDIS_VERSION=7.2 redis
```

And declaratively:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  label:
    app: kv-store
spec:
  containers:
  - name: redis
    image: redis
    env:
    - name: REDIS_VERSION
      value: 7.2
```

In the case of internal images, custom application can require more than enough environment variables to run and can look unmaintainable even with a `Pod` manifest file:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  label:
    app: kv-store
spec:
  containers:
  - name: redis
    image: redis
    env:
    - name: REDIS_VERSION
      value: 7.2
    - name: ENV_1
      value: VALUE_1
    - name: ENV_2
      value: VAL_2
```

A better implementation would be to have a key value pair store for the env section, and that is what config maps are meant for.

### ConfigMaps

[ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) stand as an insecure secret storage in Kubernetes. To create a `ConfigMap` imparatively run:

```bash
# passing the key/value pair directly, this is not neat
kubectl create configmap redis-config \
  --from-literal=REDIS_VERSION=7.1 \
  --from-literal=ENV_1=VALUE_1 \
  --from-literal=ENV_2=VALUE_2

# A neater way is to store the secrets in a file
# having the secrets in a file name redis-config.env
# cat redis-config.env
# > REDIS_VERSION=7.1
# > ENV_1=VALU_1
# > ENV_2=VALUE_2
kubectl create configmap redis-config --from-file redis-config
```

Below manifest file creates a `ConfigMap` declaratively: 
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: redis-config
data:
  REDIS_VERSION: 7.2
  ENV_1=VALUE_1
  ENV_2=VALUE_2
```


To inject all of the secrets from the config map into a `Pod`, use a declarative manifest file like below:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
spec:
  containers:
  - name: redis
    image: redis
    envFrom:
    - configMapRef:
        name: redis-config
```

Below manifest pulls the value of a key from a `ConfigMap` and injects it as the value of the `MAPPED_REDIS_VERSION` env. This can be useful when pods share the same `ConfigMap` but the containers use different names to reference the secret - IMHO this is anti pattern, and unidiomatic. 

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
spec:
  containers:
  - name: redis
    image: redis
    env:
    - name: MAPPED_REDIS_VERSION
      valueFrom:
        configMapKeyRef:
          name: redis-config
          key: REDIS_VERSION
```

### Dynamic Secrets In Pods

The above methods of injecting `ConfigMap` is not dynamic, an update to the `ConfigMap` will not reflect in any RUNNING `Pod`  already using it.

To ensure that a `ConfigMap` is dynamic within a Pod, we can inject it as a volume mount in the container.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
spec:
  containers:
  - name: redis-container
    image: redis
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config
  volumes:
  - name: config-volume
    configMap:
      name: redis-config
```

Test this by running:

```bash
kubectl exec redis -c redis-container -- /bin/sh env

# > should log all the environment variable attached to the container
```



Shalom!
