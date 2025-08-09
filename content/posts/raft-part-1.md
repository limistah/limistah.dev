---
title: "Raft Protocol: Part 1"
excerpt: What is Raft, what are the alternatives, why even build Raft? How are we going to build it!
date: 2025-08-06
tags: [raft, consensus-algirithm, distributed-systems]
---

### Motivation
I used vault a lot in the past and I have dabbled into their codebase, HashiCorp and all the contributors to the project really cooked! A strategy to setup vault is to make it work in High Availability mode, and that internal is just ensuring different servers in a vault cluster share the same data, so I wondered why?

## What is Raft?

Raft is a consensus algorithm that succeeds another algorithm called Paxos, they both tried to answer a question: how can two different servers run the same program and at a point in time both of them when queried would return the same data, even if both of them have received different actions. As an example, if server A receives a write operation 1, and later written again to be 2, at some point in time we should query server B to retrieve 2, without the write operation happening on server B.

This is a classical problems in distributed systems and have been used otutside of Consul in systems like etcd: KV store used by Kubernetes, Kafka, CockroachDB, and many more.

## Alternatives to Raft

Aside Raft, there are other consensus algorithms, a notable mention is Paxos, Practical Byzantine Fault Tolerance (PBFT), Zab, and many more.

All of these have the same goal in mind as Raft but differ in impelementation hence, their different 

Paxos: Very reliable but complex, a single bug/mistake can bite harder and harder to fix.
Practical Byzantine Fault Tolerance: Not in the same domain as Raft, solves data consistency, while raft handles crashes and failures
Viewstamped Replication: Contains individual sub-protocols, creating more moving parts that can go faulty.
Zab: It can become a performance bottleneck as the server grows bigger, not as simple as raft and not self contained as raft.