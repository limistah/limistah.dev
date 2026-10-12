---
title: Agentic Software Engineering And The Future of Open Source
date: 2026-09-28
tags: [swe, agents, open source]
category: ai
summary: Open source has thrived on cheap, readily available, and well-tested code. With AI SWE development agents making code much cheaper, can open source survive the next stage of SWE, and if so, what kind of projects would survive?
---
**The short version:** Agents are making software cheaper to write, cheaper to fix, and now cheaper to read. This kills projects that are solely feature-based, but projects whose value is accumulated knowledge, standards, and people survive. In the end, open source will be substituted, not replaced.

### Motivation

Lately I've been writing bespoke software to fit how I actually use my tools. And has birthed three projects so far: [Heimdal](https://github.com/limistah/heimdal/wiki), [Markview](https://markview.objectspread.com), and now Sonde.

I've also been adding custom observability to entities in a system I contribute to. Jaeger and OTel could work, but given our requirements and the constraints of the deployment environment, a purpose-built solution made more sense. I employed my knowledge of general patterns that were implemented by agents.

That left me with a question:

> **What kinds of open source projects will survive the next phase of SWE, and which won't?**

Enjoy…

## What open source taught me

When I started coding professionally in the late 2010s, [Laravel](https://laravel.com), [React](https://react.dev), [Angular](https://angular.dev), [Symfony](https://symfony.com), and [Yii](https://yiiframework.com) gave entry-level engineers a place to show their skills. Later I found the [CNCF](https://www.cncf.io/), with Kubernetes and other great projects, and they shaped my idea of what good software is, even though I wasn't at a big tech company.

Reading code taught me specific things. The solution to a runtime bug on one of the [ObjectSpread](https://objectspread.com) projects came from an earlier poke that I'd made into the Vue.js codebase, where I found `noop` (I pronounce it *nuupe*, not [No-OP](https://en.wikipedia.org/wiki/NOP_%28code%29)). Kubernetes taught me to treat state as a first-class idea for machine processes, which felt unintuitive until I started solving similar problems myself.

The deeper lesson was process: approvals, reviews, formatting standards, deciding what feature gets in and what doesn't, and even spotting duplicate bug reports. Open source taught me how today's decisions are deductible taxes from tomorrow's work, and other people's too.

## Open Source was an answer

Open source answered scarcity. Good software is expensive to write, so it is rational to share. Projects like [Linux](https://linux.org), [FFmpeg](https://ffmpeg.org), [VLC](https://code.videolan.org/videolan/vlc), and the language compilers have helped humanity adopt computers.

How many people a project needs varies. Some succeed with a single maintainer, like my own [ObjectSpread](https://objecspread.com/) libraries. Others need a handful of people. The [Linux Kernel](https://github.com/torvalds/linux) requires the whole of humanity. 

The public decides what investment a project gets based on different criteria: immediate industry need (Linux), backing from a group (React, Angular), or the reach of one individual (Laravel). Many projects never get past a few stars. In every case, adoption requires solving a popular problem in a generally acceptable way.

## The bloat problem

Successful projects [grow too big](https://en.wikipedia.org/wiki/Software_bloat) for the problem they set out to solve. Open source projects try to resist this by gatekeeping feature requests. Regardless, the decision always rests on the maintainers' shoulders. Paid software suffers more, because the customer is *always* right. Features that serve a fraction of customers pile up while the core suffers.

Either way, a successful project ends up containing what you need, plus a lot you don't, plus some things you might need someday.

## The three failing costs

Writing code is now cheap; Features now ship in hours. Projects ship in days, and going from idea to execution is just one prompt away. Personally, I don't expect us to go back to when we hand-crunch every line of code.

The cost of making mistakes is dead cheap, pulling the cost of correcting them along with it. This used to be the bottleneck for most software I've worked on. But the cost is not zero. 

Finding a bug, trusting the fix, securing the system, and maintaining it for years all still cost something. They are just cheaper than before.

The part I think gets underestimated is that Agents aren't only writing code; they also brilliantly read other people's code. Look at [game decompilation](https://stephenjayakar.com/posts/magic-decomp/). Now agents have compressed the years of work required for volunteer projects to reverse-engineer a single title.

Ensuring the decompilation match is a natural forte for agents because the problem has an in-built judge: the recompiled output either matches the original binary or it doesn't. Older, smaller games with well-documented hardware are much easier to decompile than modern titles; however, recovered code still doesn't have the exact intention of the authors. But it removed a significant barrier: _The code you can't see is no longer code you can't understand._

## Bespoke software

Right now, everyone can tailor software to what they need. Sonde is a TUI database client that works exactly how I interact with databases every day. I could pick from many database client options, but the features I need are scattered across them, and it is uneconomical that I keep two subscriptions for the same tooling software.

Price can also be a concern. TablePlus costs around $100 for a minor update and a new subscription for a major one. I can instead subscribe to an agentic coding tool and prompt until I get the result I want, at a fraction of the cost. We're already seeing custom software, games, and tools appear this way[^1].

Yes, the price of software covers bug fixes, security patches, and upgrades. Agentic engineering has made those cheaper too, even for solo engineers.

I can think this way because I'm an experienced engineer, which is an advantage non-engineers don't have. Still, to be honest, bespoke software has hidden costs. My custom telemetry handles my metrics, but it doesn't carry the edge cases that thousands of other people's deployments exposed in OTel. It has no outside auditors and an exhaustible list of maintainers: myself.

## Who is most exposed

This pressure falls hardest on paid software, and Adobe is a clear case. Even though Adobe revenue has kept rising, its shares fell below $275 in June [for the first time since 2019](https://stocksdownunder.com/adobe-adbe-2019-low-record-quarter/), as investors consider whether AI makes Creative Cloud easier to replace.

The question is what the product's value actually is. If it's features, those can be copied. If it's file formats, workflows, collaboration, and trust, those are much harder to copy. The moat for paid software was often the cost of reproduction, and that cost is shrinking. Open source never relied on that moat.

## Which open source survives

A project's survival will depend on where its value lives. 

Answering these three questions might help:

1. **Is the value in the code, or in what the code encodes?** Edge cases, hardware quirks, standards, and years of bug reports are knowledge, and you can't prompt your way to them.
2. **Does the project get stronger when many people agree on it?** Networks, formats, and shared protocols do.
3. **Can one person cheaply verify that it's correct?** If so, an agent can rebuild it.

Applying them:

- **Likely to survive:** Linux, FFmpeg, compilers, and other standards-bound infrastructure. Their value is accumulated knowledge about reality, and a single verification will be insufficient. Agents can be used to amplify collaborations for survival. The decompilation projects themselves are community efforts that agents speed up rather than replace.
- **Likely to be substituted:** these contain thin utilities and bloated tools where only a subset of the features are used. My telemetry layer is an example. Why install a full OTel stack when I need ten percent of it?
- **Genuinely uncertain:** the big frameworks like React and Laravel. Their value was partly code and partly a shared ecosystem. The code may become reproducible while the ecosystem keeps them alive.

## Collaboration will always win

In as much as I can make progress on my own TUI, it will only ever reflect how I use it: the features I find interesting, and the time I have to drive my agent. Even my experience as an engineer can not remove that limit.

Bespoke software is as dangerous as a monarchy. It can die too fat, full of interesting but useless features, or too thin, starved of the innovation it needs. An agent won't dissent. It builds what you ask for. In open source, review, approval, and refusal are what keep a project honest. 

Part of collaboration is knowing what not to do. Great ideas have never been monopolized, and I don't think agents will change that.

## The fate of open source

Aside from the AI-generated PRs open source projects currently fight, I believe open source will keep thriving. Its success was never just about writing software. It was the accumulation of human intelligence aimed at one problem. AI can find patterns, but turning them into insight still requires people – a lot of them, and there has never been a way to do that.

For open source, agentic engineering is a threat of **substitution, not replacement**. Projects whose value lives in features will shrink, and projects whose value lives in knowledge, standards, and the collaboration among the general public who maintain them will last. The quality of a project would always be centered around the quality of its original ideas, execution, and maintainers.

*Salut!!*

[^1]: A good example is the [Plex Native](https://plxnative.com) software.
