---
title: "Raft Protocol: Part 1"
summary: What is Raft, what are the alternatives, and why even build Raft? How are we going to build it?
date: 2025-08-06
tags: [raft, consensus-algorithm, distributed-systems]
---

### Motivation
I have used Vault extensively in the past, and at some point, I have also explored their codebase – kudos to all the contributors. A strategy for setting up Vault is to enable high availability (HA) mode, which ensures that different servers in a Vault cluster share the same data. So, how does it work?

## What is Raft?

Raft is a [consensus algorithm](https://en.wikipedia.org/wiki/Consensus_(computer_science)) that succeeds Paxos. They both tried to answer a question: how can two different servers run the same program, and at a point in time, both of them, when queried, would return the same data, even if they had received different instructions. For example, suppose server A receives a write operation with value 1 and a later write instruction with value 2 at some point in time. In that case, we should query server B to retrieve the value 2, without the write operation having occurred on server B.

This is a classic problem in distributed systems and has been used outside of Consul (the KV store used by Vault) in systems like etcd, the KV store used by Kubernetes, Kafka, CockroachDB, and many more.

## Alternatives to Raft

Aside from Raft, there are other consensus algorithms, including notable mentions such as Paxos, Practical Byzantine Fault Tolerance (PBFT), and Zab, among many others. All of them have the same goal in mind as Raft but differ in implementation, hence their differences:

**[Paxos](https://en.wikipedia.org/wiki/Paxos_(computer_science))**: Very reliable but complex; a single bug/mistake can become increasingly difficult to fix.

**[Practical Byzantine Fault Tolerance](http://pmg.csail.mit.edu/papers/osdi99.pdf)**: Not in the same domain as Raft, solves data consistency, while Raft handles crashes and failures

**[View stamped Replication](http://pmg.csail.mit.edu/papers/vr-revisited.pdf)**: Contains individual sub-protocols, creating more moving parts that can go faulty.

**[Zookeeper Atomic Broadcast](https://www.geeksforgeeks.org/system-design/zab-algorithm-in-distributed-systems/)**: It can become a performance bottleneck as the server grows larger, is not as simple as Raft, and is not as self-contained as Raft.

## The Raft Paper
For this to be successful, I will strictly follow through with the raft paper, which outlines the required components and their corresponding responsibilities. 

## Raft Components
The primary component of a raft cluster is the servers that comprise the cluster. A raft server can either be a leader or a follower at any point in time. The type of server determines its responsibilities, which we will explore in the next section.

### Raft Leader
A raft leader is, as the name says, a leader! Its sole responsibility is to receive requests, handle them, and propagate the requests to the other servers (followers) in the cluster. In contrast to other consensus algorithms, Raft allows any server to become a leader. This ensures the cluster is always available by removing the bottleneck of always having the same request handler across the cluster.

### Raft Follower
A raft follower can accept requests from clients, but it has to proxy the request back to the leader for proper handling. The sole purpose of a raft follower is to replicate the data of the leader. Once a leader handles a request, they have a second responsibility of sending those requests to all their followers. This process ensures that any follower can become a leader without being behind.

### State Machine or Logs
For each server in a cluster, there is a log component that it uses to track the order of operations. Once a leader receives a request, it tries to replicate the request to the different followers, and only commits it to its log if the majority of the followers have committed the request to their logs.

Due to the delicacy of the log, various operations are supported by a raft log. We will discuss this when we explore the raft log in detail.

## Operations

Raft supports various operations across its different components.

### Handling client requests





