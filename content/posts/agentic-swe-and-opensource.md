---
title: Agentic Software Engineering And The Future of Open Source
date: 2026-09-28
tags: [swe, agents, open source]
category: ai
summary: Open source has thrived on the idea of cheap, readily available, and duly tested code. With AI SWE development agents making code a lot cheaper, can open source survive the next stage of SWE, and if it can, what kind of projects would survive?
---

### Motivation

Recently, I have been writing bespoke software to fit my daily usage of similar software, which has given birth to three unique projects so far: [Heimdal](https://github.com/limistah/heimdal/wiki), [Markview](https://markview.objectspread.com), and now, Sonde.

Also, I have recently been adding bespoke observability into entities of one of the systems that I contribute to. Jaeger and OTel can work here, but with the specific requirements and some constraints on the deployment environment, I am constrained to make the solution custom to the system.

My idea is to use the best-known patterns, then apply them to those entities - thanks to AI agents' pattern recognition abilities. Now I ask:

> **_What kind of open source projects will survive the next phase of SWE, and which kind will not_**.

Enjoy...

## In the beginning

When I started professional coding in the late 2010s, [Laravel](https://laravel.com), [React](https://react.dev), [Angular](https://angular.dev), [Symfony](https://symfony.com), [Yii](https://yiiframework.com), and many other great projects were opportunities for entry-level engineers to showcase their skills. Later, I discovered the [CloudNative Foundation](https://www.cncf.io/) with good projects like Linux itself, Kubernetes, and many other awesome works. They helped me shape my ideas on what good software should be and the design decisions behind it, even though I was not part of a very big tech company.

While working on one of the projects on [ObjectSpread](https://objectspread.com), I faced an issue that required solving unexpected [undefined functions at runtime](https://stackoverflow.com/questions/30960322/function-is-undefined-error-when-dealing-with-defined-functions-in-javascript), and the solution came from a poke that I made earlier into the Vue.js codebase to discover the use of noop(_I pronounce it as _nuupe_ instead of [No-OP](https://en.wikipedia.org/wiki/NOP_(code))).

Another design pattern I learnt is from the decomposition and statefulness of the entire Kubernetes Ecosystem; bringing the ideas of states to machine processes was very unintuitive to me, not until I started solving similar problems and even adjacent ones for that concept to eventually stick.

Also, the idea that software quality should be gated behind defined and established processes was new to me. Approvals and reviews, coding standards and formatting guidelines, what feature is accepted and what is not, even to the point of determining duplicate bug requests.

All these ideas were formed by my involvement in the open-source community; I learned about how my current decisions affect my future work, as well as other team members, even if they are subordinates.

## Open source was an answer

The idea of open source is to provide free software for the general public, and it has served just that. Projects like [Linux](https://linux.org), [Ffmpeg](https://ffmpeg.org), [Language Compilers](https://github.com/BaseMax/AwesomeCompiler), [VLC](https://code.videolan.org/videolan/vlc) have helped humanity adopt and use computers. But it was at the cost of what software the general public needed to invest in, and how much investment it required.

Some software can be successful with a single maintainer, like the case of my [objectspread](https://objectspread.com) libraries; for some, like the [Linux Kernel](https://github.com/torvalds/linux), they require the entire humanity to survive; others only need a handful of people.

That decision was never made by the internet or the owner of the libraries; it is decided by the general public on many different criteria. Some are based on the immediate need of the public/industry, like the case of the Linux Kernel; some are because of a certain group of people, like the case of React/Angular, or by an individual, as in the case of Laravel - some individual projects never got past a few stars.

Regardless, for a software to be adopted, it has to solve a popular problem in a generally acceptable way; it is a learning or useful personal project open-sourced by the owner.

## Successful Open Source Projects

The problem with successful open source projects is that they eventually [grow too big](https://en.wikipedia.org/wiki/Software_bloat) to solve that sole problem they were to solve. Some projects try to keep the feature set smaller and relevant by enforcing standards on feature request approvals; regardless, the decision to make a pull request change part of the main project sits on the shoulders of the maintainers.

Paid software tends to suffer this the most, since the customer is _always_ right; they eventually grow so much to include features that cater to a fraction of the customers, even though the core of the software remains or suffers due to the bloat created by customer requests.

In both cases, successful projects contain what the end consumer needs and more of what they don't, but might need.

## Agentic Softwares

In recent years, we have witnessed software written by agents more than humans, facilitated by improvements in [agentic software development tools](https://www.forrester.com/blogs/agentic-software-development-defining-the-next-phase-of-ai-driven-engineering-tools/), and I believe we are not going back to the age of crunching the keyboard for some kind of software.

What I have seen this create is way beyond imaginable. Features are now released in hours, not even days; projects are shipped in a couple of days, and ideas to execution are just a prompt away. This era is also reducing the cost of fixing mistakes due to software bugs to become negligible - a bottleneck for most of the software that I have experienced.

What I also witnessed, which is what motivated this post, is how software can contain a handful of features of a similar but bigger project in the core of a single project. This reduces the bloat from the original software. In my case, it was introducing telemetry into my project; rather than install and provision a full-fledged OTel software, I built and maintain one, handling the metrics how I want, subconsciously reducing bloat.

## Bespoke softwares

With the cost of fixing mistakes down to a minimum, we are already witnessing the age of custom software, games, and tools. I am working on Sonde, for example, a TUI database client to work exactly how I interact with databases every day. There are many options that I can choose from, all of which have features that I need scattered among them, and it is uneconomical that I keep two subscriptions for the same kind of software.

The cost of the software also contributes to this increase we now experience in bespoke software. Table Plus would charge $100 for a minor update and a re-subscription for a major upgrade. I can keep that cost, rebuild my version of the software by subscribing to one of the agentic coding software options and prompting it till I get my desired result at a fraction of the cost that Table Plus wants to charge me.

We can argue that the cost of software is meant to cover bug fixes, security patches, updates, and upgrades. Again, agentic software engineering has reduced the cost of getting these done even for solo engineers.

I will not ignore the fact that I can think like this because I am a professional software engineer with vast experience, and this is a disadvantage to non-software engineering professionals.

## The Fate of Open Source

Aside from the AI-generated PRs that open source projects currently battle with, I believe open source will continue to thrive for a number of reasons.

Even though the cost of correcting mistakes is negligible in this modern era, I believe the success of open source has not been about just writing software, but rather the accumulation of human intelligence targeted towards solving a particular problem. AI can help discover the patterns and provide better insights, but deriving that insight from AI still requires natural intelligence, and there has never been a single way to do that - stupid or smart.

Collaboration as humans is accepting our weaknesses as much as we project our strengths, and merging those strengths inadvertently blurring out the weaknesses. I can make progress with my bespoke TUI, but the ideas and how I use it would remain how I use it: features that I find interesting and having the time in the first place to drive my agent to get me the right result, still ignoring my experience as a software engineer.

Part of collaboration is also knowing what not to do; bespoke software is as dangerous as a monarchy form of government: it can die too fat, consisting of more interesting but useless features than it needs, or too thin, starved of innovation that it should. Collaboration merges ideas, correcting the direction of our thoughts; great ideas have never been monopolized, and I believe agentic software engineering will not create that monopoly.

To open source, agentic software engineering is that threat that targets substitution and not entirely replacement. The quality of a project would always be centered around the quality of its original ideas, execution, and maintainers.

_Salut!!_
