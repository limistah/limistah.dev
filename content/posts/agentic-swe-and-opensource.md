---
title: "Agentic Software Engineering And The Future of Open Source"
date: 2026-09-28T00:00:00+00:00
lastmod: 2026-10-13T00:00:00+01:00
draft: false
author: "Aleem Isiaka"
description: "Agents are making software cheap to write, cheap to fix, and now cheap to read. Which open source projects survive the substitution, and which don't?"
tags: ["swe", "agents", "open source"]
keywords: ["swe", "agents", "open source", "decompilation", "bespoke software"]
---

## Motivation

Lately I've been writing bespoke software to fit how I actually use my tools, and it has birthed three projects so far: [Heimdal](https://github.com/limistah/heimdal/wiki), [Markview](https://markview.objectspread.com), and now Sonde.

I've also been adding custom observability to entities in a system I contribute to. Jaeger and OTel could work, but given our requirements and the constraints of the deployment environment, a purpose-built solution made more sense. I applied general patterns I already knew, and agents implemented them.

That left me with a question:

> **What kinds of open source projects will survive the next phase of SWE, and which won't?**

Enjoy…

## What open source taught me

When I started coding professionally in the late 2010s, [Laravel](https://laravel.com), [React](https://react.dev), [Angular](https://angular.dev), [Symfony](https://symfony.com), and [Yii](https://yiiframework.com) gave entry-level engineers a place to show their skills. Later I found the [CNCF](https://www.cncf.io/), with Kubernetes and other great projects, and they shaped my idea of what good software is, even though I wasn't at a big tech company.

Reading code taught me specific things. The solution to a runtime bug on one of the [ObjectSpread](https://objectspread.com) projects came from an earlier poke that I'd made into the Vue.js codebase, where I found `noop` (I pronounce it *nuupe*, not [No-OP](https://en.wikipedia.org/wiki/NOP_%28code%29)). Kubernetes taught me to treat state as a first-class idea for machine processes, which felt unintuitive until I started solving similar problems myself.

The deeper lesson was process: approvals, reviews, formatting standards, deciding what feature gets in and what doesn't, and even spotting duplicate bug reports. Open source taught me that today's decisions are a tax on tomorrow's work, and on other people's too.

## Open Source was an answer

Open source answered scarcity. Good software is expensive to write, so it is rational to share. Projects like [Linux](https://linux.org), [FFmpeg](https://ffmpeg.org), [VLC](https://code.videolan.org/videolan/vlc), and language compilers have helped humanity adopt computers.

How many people a project needs varies. Some succeed with a single maintainer, like my own [ObjectSpread](https://objectspread.com/) libraries. Others need a handful of people. The [Linux Kernel](https://github.com/torvalds/linux) requires the whole of humanity.

The public decides what investment a project gets based on different criteria: immediate industry need (Linux), backing from a group (React, Angular), or the reach of one individual (Laravel). Many projects never get past a few stars. In every case, adoption requires solving a popular problem in a generally acceptable way.

## The bloat problem

Successful projects [grow too big](https://en.wikipedia.org/wiki/Software_bloat) for the problem they set out to solve. Open source projects try to resist this by gatekeeping feature requests. Regardless, the decision always rests on the maintainers' shoulders. Paid software suffers more, because the customer is *always* right. Features that serve a fraction of customers pile up while the core suffers.

Either way, a successful project ends up containing what you need, plus a lot you don't, plus some things you might need someday.

## The three falling costs

**Writing.** Code is now cheap. Features ship in hours, projects ship in days, and going from idea to execution is just one prompt away. The evidence is real but narrow. In a controlled experiment, developers with Copilot finished a bounded HTTP server task about 56% faster ([Peng et al.](https://arxiv.org/abs/2302.06590)). Yet when METR tested experienced developers on mature repositories they already knew, they took 19% longer with the early-2025 tools of the time ([METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)). The gap is the point: agents are strongest where a task is small and well-defined, and weakest where the value is accumulated context. That is the line this post is trying to draw. Personally, I don't expect us to go back to hand-crunching every line of code.

**Fixing.** The cost of making mistakes is dead cheap, pulling the cost of correcting them along with it. This used to be the bottleneck for most software I've worked on. But the cost is not zero. Finding a bug, trusting the fix, securing the system, and maintaining it for years all still cost something. In an analysis of more than 300,000 AI-authored commits across about 6,300 GitHub repositories, over one in five of the issues the AI introduced was still in the latest revision ([Liu et al.](https://arxiv.org/abs/2603.28592)). Most were code smells rather than outright bugs, and the study is observational, so it doesn't show AI code is worse than human code. It does show the debt is real, and it's the kind a solo maintainer quietly inherits.

**Reading.** This is the one I think gets underestimated. Agents aren't only writing code; they also read other people's code very well. Look at [game decompilation](https://stephenjayakar.com/posts/magic-decomp/). Matching decompilation used to be a passion project that took volunteers years per title. Now a few specialists can direct agents through it and merge functions in bulk.

It's a natural fit for agents because the task is hard but verifiable, and parallelizable: the recompiled output either matches the original binary or it doesn't, and the work splits cleanly by function. Older, smaller games with well-documented hardware are much easier to decompile than modern titles, and recovered code still doesn't carry the authors' intent. But a significant barrier is gone: *the code you can't see is no longer code you can't understand.*

## Bespoke software

Right now, engineers can tailor software to what they need. Sonde is a TUI database client that works exactly how I interact with databases every day. I could pick from many database clients, but the features I need are scattered across them, and it is uneconomical to keep two subscriptions for the same kind of tool.

Price can also be a concern. TablePlus costs around $100 for a minor update and a new subscription for a major one. I can instead subscribe to an agentic coding tool and prompt until I get the result I want, at a fraction of the cost. We're already seeing custom software, games, and tools appear this way[^1].

Yes, the price of software covers bug fixes, security patches, and upgrades. Agentic engineering has made those cheaper too, even for solo engineers.

I can think this way because I'm an experienced engineer, which is an advantage non-engineers don't have. Still, to be honest, bespoke software has hidden costs. My custom telemetry handles my metrics, but it doesn't carry the edge cases that thousands of other people's deployments exposed in OTel. It has no outside auditors and a maintainer list of one: me.

## Who is most exposed

This pressure falls hardest on paid software, and Adobe is a clear case. Even though Adobe's revenue has kept rising, its shares fell below $275 in June [for the first time since 2019](https://stocksdownunder.com/adobe-adbe-2019-low-record-quarter/), as investors consider whether AI makes Creative Cloud easier to replace.

The question is what the product's value actually is. If it's features, those can be copied. If it's file formats, workflows, collaboration, and trust, those are much harder to copy. The moat for paid software was often the cost of reproduction, and that cost is shrinking. Open source never relied on that moat.

One caveat: building from known patterns, as I do, is different from cloning a proprietary product by decompiling its binaries. The legal ground there is unsettled, and I'm not recommending it.

## Which open source survives

A project's survival will depend on where its value lives.

Answering these three questions might help:

1. **Is the value in the code, or in what the code encodes?** Edge cases, hardware quirks, standards, and years of bug reports are knowledge, and you can't prompt your way to them.
2. **Does the project get stronger when many people agree on it?** Networks, formats, and shared protocols do.
3. **Can one person cheaply verify that it's correct?** If so, an agent can rebuild it.

Applying them:

- **Likely to survive:** Linux, FFmpeg, compilers, and other standards-bound infrastructure. Their value is accumulated knowledge about reality, and no one person can verify it alone. Agents can amplify the collaborations that sustain them. The decompilation projects themselves are community efforts that agents speed up rather than replace.
- **Likely to be substituted:** thin utilities and bloated tools where only a subset of the features is used. My telemetry layer is an example. Why install a full OTel stack when I need ten percent of it?
- **Genuinely uncertain:** the big frameworks like React and Laravel. Their value was partly code and partly a shared ecosystem. The code may become reproducible while the ecosystem keeps them alive.

OpenTelemetry shows the tension in that telemetry example. Its worth isn't the code. It's a shared set of semantic conventions, a standard protocol, and instrumentation libraries that many vendors agree on, and it exists because two earlier projects, OpenTracing and OpenCensus, merged after neither could solve the problem alone ([OpenTelemetry](https://opentelemetry.io/docs/what-is-opentelemetry/)). My ten percent is easy to rebuild. The agreement isn't, and a custom layer can't talk to anyone else's tools. That is also why extending a standard, which OTel is designed to allow, is often a better trade than replacing it.

## Why collaboration still matters

In as much as I can make progress on my own TUI, it will only ever reflect how I use it: the features I find interesting, and the time I have to drive my agent. Even my experience as an engineer cannot remove that limit.

Bespoke software is as dangerous as a monarchy. It can die too fat, full of interesting but useless features, or too thin, starved of the innovation it needs. An agent won't dissent. It builds what you ask for. In open source, review, approval, and refusal are what keep a project honest.

Part of collaboration is knowing what not to do. Great ideas have never been monopolized, and I don't think agents will change that.

## The fate of open source

Aside from the AI-generated PRs open source projects currently fight, I believe open source will keep thriving. Its success was never just about writing software. It was the accumulation of human intelligence aimed at one problem. AI can find patterns, but turning them into insight still requires people, a lot of them, and there has never been a shortcut for that.

For open source, agentic engineering is a threat of **substitution, not replacement**. Projects whose value lives in features will shrink, and projects whose value lives in knowledge, standards, and the collaboration of the many people who maintain them will last. The future of a project will always track the quality of its ideas, its execution, and its maintainers.

*Salut!!*

[^1]: A good example is the [Plex Native](https://plxnative.com) software.
