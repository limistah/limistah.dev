---
title: "Raft Protocol: Part 1"
excerpt: What is Raft, what are the alternatives, and why even build Raft? How are we going to build it?
date: 2025-08-06
tags: [raft, consensus-algorithm, distributed-systems]
---

### Motivation
I have used Vault extensively in the past, and at some point, I have also explored their codebase – kudos to all the contributors. A strategy for setting up Vault is to enable high availability (HA) mode, which ensures that different servers in a Vault cluster share the same data. So, how does it work?

## What is Raft?

Raft is a consensus algorithm that succeeds Paxos. They both tried to answer a question: how can two different servers run the same program, and at a point in time, both of them, when queried, would return the same data, even if they had received different instructions. For example, suppose server A receives a write operation with value 1 and a later write instruction with value 2 at some point in time. In that case, we should query server B to retrieve the value 2, without the write operation having occurred on server B.

This is a classic problem in distributed systems and has been used outside of Consul (the KV store used by Vault) in systems like etcd, the KV store used by Kubernetes, Kafka, CockroachDB, and many more.

## Alternatives to Raft

Aside from Raft, there are other consensus algorithms, including notable mentions such as Paxos, Practical Byzantine Fault Tolerance (PBFT), and Zab, among many others. All of them have the same goal in mind as Raft but differ in implementation, hence their differences:

**Paxos**: Very reliable but complex; a single bug/mistake can become increasingly difficult to fix.
**Practical Byzantine Fault Tolerance**: Not in the same domain as Raft, solves data consistency, while Raft handles crashes and failures
**Viewstamped Replication**: Contains individual sub-protocols, creating more moving parts that can go faulty.
**Zab**: It can become a performance bottleneck as the server grows bigger, not as simple as Raft, and not as self-contained as Raft.