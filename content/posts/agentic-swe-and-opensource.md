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

Writing code is now cheap; Features now ship in hours. Projects ship in days, and going from idea to execution is just one prompt away. Personally, don't expect us to go back to when we hand-crunch every line.

The cost of making mistakes is dead cheap, pulling the cost of correcting them along with it. This used to be the bottleneck for most software I've worked on. But the cost is not zero. 

Finding a bug, trusting the fix, securing the system, and maintaining it for years all still cost something. They are just cheaper than before.

This is the one I think gets underestimated. Agents aren't only writing code; they're reading other people's code. Look at [game decompilation](https://stephenjayakar.com/posts/magic-decomp/). Now agents have compressed the years of work for volunteer projects reverse-engineering a single title.

A matching decompilation is the forte of agents because it has an in-built judge: the recompiled output either matches the original binary or it doesn't. Older, smaller games with well-documented hardware are much easier to decompile than modern titles; however, recovered code still doesn't have the exact intention of the authors. But it removed a significant barrier: _The code you can't see is no longer code you can't understand._


## Successful Open Source Projects

The problem with successful open source projects is that they eventually [grow too big](https://en.wikipedia.org/wiki/Software_bloat) to solve that sole problem they were to solve. Some projects try to keep the feature set smaller and relevant by enforcing standards on feature request approvals; regardless, the decision to make a pull request change part of the main project sits on the shoulders of the maintainers.

Paid software tends to suffer this the most, since the customer is _always_ right; they eventually grow so much to include features that cater to a fraction of the customers, even though the core of the software remains or suffers due to the bloat created by customer requests.

In both cases, successful projects contain what the end consumer needs and more of what they don't, but might need.

## Agentic Softwares

In recent years, we have witnessed software written by agents more than humans, facilitated by improvements in [agentic software development tools](https://www.forrester.com/blogs/agentic-software-development-defining-the-next-phase-of-ai-driven-engineering-tools/), and I believe we are not going back to the age of crunching the keyboard for some kind of software.

What I have seen this create is way beyond imaginable. Features are now released in hours, not even days; projects are shipped in a couple of days, and ideas to execution are just a prompt away. This era is also reducing the cost of fixing mistakes due to software bugs to become negligible - a bottleneck for most of the software that I have experienced.

What I also witnessed, which is what motivated this post, is how software can contain a handful of features of a similar but bigger project in the core of a single project. This reduces the bloat from the original software. In my case, it was introducing telemetry into my project; rather than installing and provisioning a full-fledged OTel software, I built and maintain one, handling the metrics how I want, subconsciously reducing bloat.

## Bespoke softwares

With the cost of fixing mistakes down to a minimum, we are already witnessing the age of custom software, games, and tools[^1]. I am working on Sonde, for example, a TUI database client to work exactly how I interact with databases every day. There are many options that I can choose from, all of which have features that I need scattered among them, and it is uneconomical that I keep two subscriptions for the same kind of software.

The cost of the software also contributes to this increase we now experience in bespoke software. Table Plus would charge $100 for a minor update and a re-subscription for a major upgrade. I can keep that cost, rebuild my version of the software by subscribing to one of the agentic coding software options and prompting it till I get my desired result at a fraction of the cost that Table Plus wants to charge me.

We can argue that the cost of software is meant to cover bug fixes, security patches, updates, and upgrades. Again, agentic software engineering has reduced the cost of getting these done even for solo engineers.

I will not ignore the fact that I can think like this because I am a professional software engineer with vast experience, and this is a disadvantage to non-software engineering professionals.

## The Fate of Open Source

Aside from the AI-generated PRs that open source projects currently battle with, I believe open source will continue to thrive for a number of reasons.

Even though the cost of correcting mistakes is negligible in this modern era, I believe the success of open source has not been about just writing software, but rather the accumulation of human intelligence targeted towards solving a particular problem. AI can help discover patterns and provide better insights, but deriving that insight from AI still requires natural intelligence, and there has never been a single way to do that - stupid or smart.

Collaboration, as humans, is accepting our weaknesses as much as we project our strengths, and merging those strengths inadvertently blurring out the weaknesses. I can make progress with my bespoke TUI, but the ideas and how I use it would remain how I use it: features that I find interesting and having the time in the first place to drive my agent to get me the right result, still ignoring my experience as a software engineer.

Part of collaboration is also knowing what not to do; bespoke software is as dangerous as a monarchy form of government: it can die too fat, consisting of more interesting but useless features than it needs, or too thin, starved of innovation that it should. Collaboration merges ideas, correcting the direction of our thoughts; great ideas have never been monopolized, and I believe agentic software engineering will not create that monopoly.

To open source, agentic software engineering is that threat that targets substitution and not entirely replacement. The quality of a project would always be centered around the quality of its original ideas, execution, and maintainers.

_Salut!!_



[^1]: A very good example is the [Plex Native](https://plxnative.com) software.
