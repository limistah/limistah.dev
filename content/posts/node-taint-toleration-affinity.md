---
title: Node Taint, Toleration and Affinity
date: 2024-02-11
tags: [Kubernetes, Node, Affinity]
category: Kubernetes
excerpt: Use node taint, toleration, and node affinity the right way
---

## Motivation

Pod scheduling can be a nightmare in a large Kubernetes deployment with many nodes having different configurations.

Consider the configuration below:

- **NODE A:** 16vCPU, 10TB SSD Disk Space, 64GB RAM.
- **NODE B:** 4vCPU, 100GB HDD Disk Space, 8GB RAM
- **NODE C**: 8vCPU, 100GB HDD Disk Space, 8GB RAM, with additional GPU configuration

And scheduling a new deployment to the cluster:

```bash
kubectl create deployment --image=nginx --replicas=3
```

Kubernetes would schedule the `Pods` on a random node. Which is fine for general use cases.

Imagine if we are to deploy an LLM on NODE C, there should be a way to instruct Kubernetes to do just that.

Also, there should be a way to tell Kubernetes to not deploy anything to NODE C unless it was specified.

If you inspect the master node with: `kubectl get nodes controlplane | grep -i taints` this would return all the taints set for the master node that prevents the scheduling of Pods on the master node.

In Kubernetes, there should be worker nodes that `Pod` can run on and master node(s) that schedule the `Pods` to run on what `node`.

We can apply [node affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity) and [node taint and toleration](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) to control [pod scheduling in Kubernetes](https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/).

## Node Taint & Pod Toleration

Node Taint is like creating a condition that a Pod must adapt to for them to run on a node, or asking a node if they can accept a Pod. 

Here, we need to taint NODE A such that no other `Pod` should run on it except they have the right toleration to make the `Pod` adapt to the condition.

To taint a node, use the [`kubectl taint` command](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#taint):

```bash
kubectl taint nodes nodeA size=large:NoSchedule
```

The command takes a node name and the taint to attach to it in the form `key=value:TaintEffect`. There are three different TaintEffects:

- **NoSchedule**: Don't schedule any pod on this node if they don't tolerate this taint.  Existing pods on the node that do not tolerate the taint will continue to run.
- **PreferNoSchedule**: Only schedule a Pod on the node if there is no suitable node for the Pod.
- **NoExecute**: Don't schedule any pod that doesn't have the toleration, also, evict any pod that is currently running but doesn't have the taint.

For a Pod to run on `nodeA`, it would have to [tolerate the taint](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/#concepts).

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  tolerations:
  - key: "size"
    value: "large"
    operator: "Equals"
    effect: "NoSchedule"

```

The Pod manifest file has a `tolerations` section where key value and effect are defined, these must match the specification of the taint. The operator can either be `Exists` which means the key exists as a taint on a node - a value is not required for this, or `Equals` meaning the key, value, and effect must match a taint.

Scheduling this Pod would ensure it runs on NodeA.

If we have a similar Pod that should be scheduled on NodeA, but for some reason (not enough resources) was not, the Pods can end up on NodeB, or NodeC, which is not what is desired.

## Affinity Rules

Node Affinity is a concept that helps Pod to choose where they can run on instead of the node asking if they can run on it.

For node affinity to work, a node must have a set of labels that Pods can request, in the case of our NodeC, we can set that using:

```bash
kubectl label nodes nodeC purpose=gpu-compute
```

With this set, Pods can look for the nodes that match a particular set of labels through a `nodeSelectors` field:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  nodeSelector:
    purpose: gpu-compute
```

This ensures that the nginx pod runs only on the Node that has a label called gpu-compute.

We could also use the nodeName to select a particular node if we are sure we have the information on the node's name. But this is not idiomatic enough, `nodename` can change or the node can go up or down. Using `nodeSelector` is safer.

Using `nodeSelector` is restrictive, what happens if no `node` matches the label selector?

Node Affinity expands on the idea of nodeSelector to have a robust configuration for the selection process.

There are three types of `nodeAffinity`:

- `requiredDuringSchedulingIgnoredDuringExecution`: This configuration ensures that the affinity must match before a Pod can be scheduled to run on a node, but don't eject any Pod already running on the node without a matching label.
- `preferredDuringSchedulingIgnoredDuringExecution`: This configuration checks if there is a node matching the affinity, if none, do random scheduling to any node, but don't eject any Pod already running on the node without a matching label.
- `requiredDuringSchedulingRequiredDuringExecution:` This configuration ensures that a Pod affinity matches a node, and for currently running nodes, eject them if their affinity does not match.

A Pod definition with `nodeAffinity` configured look like this:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  affinity:
    nodeAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: purpose
            operator: In
            values:
            - gpu-compute
```

The In operator ensures that the values in the Pod definition file must match one of the values of node labels for the same key. Like doing an OR operator. [Read more on the operators here](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#operators).

This is not the end.

## Tainting+Affinity=Effective Pod Scheduling Segregation

With Pod affinity, we can end up having other pods not requiring GPU running on NODE C, this means having too much compute power than they require.

The problem with node tainting is the fact that nodes not satisfying the taint can also end up at nodes where they are not supposed to run. For example, a GPU-intensive Pod might get scheduled on `NODE A`, this is not what we want.

The fact is that both Pod Affinity and Node Tainting solve each other's problems. 

Final solution: **Use both Node Taint and Pod Affinity to achieve a more effective Pod Scheduling segregation.**

First, attach labels to the nodes that require special attention:

```bash
kubectl taint nodes nodeC purpose=gpu-compute:NoSchedule
```

Second, attach taints to these nodes so they repel other Pods:

```bash
kubectl label nodes nodeA purpose=gpu-compute
```

Finally, configure your Pod to use both Node Taint and Pod Affinity to effectively choose what node to run at:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  tolerations:
  - key: "size"
    value: "large"
    operator: "Equals"
    effect: "NoSchedule"
  affinity:
    nodeAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: purpose
            operator: In
            values:
            - gpu-compute
```

[O dabọ](https://translate.google.com/?sl=en&tl=yo&text=good%20bye&op=translate&hl=en)
