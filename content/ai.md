---
title: How I Use AI
description: My everyday use of Artificial Intelligence — as an engineer, as a writer, and in normal life. What I reach for. What I don't.
date: 2026-05-17
comments: false
ShowToc: true
tocFlat: true
enableOpenring: false
containerWidth: 700px
showPostNavLinks: false
disableShare: true
---

I have witnessed a lot of evolution in technology, but Artificial Intelligence (AI) is just great. As we share the same initials (Aleem Isiaka), I have decided to be hands-on with it.

On this page, I will continue to share how I use and explore the technology for *work*, *learning*, and *normal life*. Things I like and how I believe they can be improved.

## Summary

Four branches. Almost everything I do with AI fits into one of these.

{{< ai-decision-tree >}}

## At Work

Software engineering has seen immense integration of AI into its workflows. For the things I **research**, **decide**, and **implement** — here's the pipeline:

{{< ai-workflow-stages >}}

### Researching

I mostly use **ChatGPT** (free version) for this, and pair it with **Gemini**. I pull as much information as I can from Gemini, export to a markdown/text file, then import into ChatGPT for a refined result.

I've also heard *Grok* can be great for this, but I haven't tried it yet.

### Deciding

**Anthropic's models are the best here.** Sometimes I merge both research and decision into a single session on Claude Code. I've also found accessing Claude models via GitHub Copilot to be more economical — more on that in the implementation phase.

For anything that touches **design** — visual exploration, UI mockups, comparing layouts — I use the **Claude web app**. Being able to render the output in the same window and iterate on it side by side is something I haven't found anywhere else.

### Implementation

This largely involves coding. I use [OpenCode](https://opencode.ai/) as my coding agent and connect to Anthropic's models via the [GitHub Copilot subscription](https://github.com/features/copilot/plans). I mostly run out of premium requests, but Copilot's pricing model is still reasonable — we have access to Copilot Pro through our organisation at work.

#### My OpenCode Setup

I run OpenCode with **two distinct agents** for different workflows. The dual-agent setup lets me separate thinking from doing — plan thoroughly in read-only mode, then execute with confidence in build mode.

{{< ai-opencode-setup >}}

I pair Copilot with a **Claude Code Pro** subscription, but I mostly use that when I have to one-shot a task.

I take the output of the LLMs as my *initial draft*, then revise and review to ensure it meets my requirements and coding style. This process still requires me to code — and increases my awareness of the outputs rather than teaching an LLM how I write code. Whenever there's an abnormal output, I query the model for its reasoning — a kind of two-factor verification to avoid slops.

I also take extra time going over the PRs personally before requesting external reviews.

> I know extreme AI usage results in brain rot, and even LLMs themselves generate slops — which is not really my fear. I care more about my reputation as an engineer. Once a name is tagged to a piece of work, the means stops justifying the end. Responsibility has never been more important.

### Vibe Coding

When I have to move with **speed**, I employ Claude Code. When I have to be more cautious — which is most of the time — I plan the task on OpenCode, review and revise until an acceptable implementation plan is reached before proceeding.

## Learning

A continuous process, and not so different from work.

The **AI Mode of Google** is, in my opinion, underrated. I post my questions directly to Google and can either go deeper into the links or click the AI Mode tab for the summary. With AI Mode I also get follow-up questions, which has always been a natural step after an initial Google search — instead of starting a new query and losing the original context.

For research work I use [NotebookLM](https://notebooklm.google.com/) — also work-related research sometimes. I love that it uses my own curated sources, plus a little internal knowledge, which makes referencing easier and a deep dive more thorough.

### Hermes — my private tutor

I run **Hermes** locally — for now. The plan is to move it to a small cloud box so it's reachable from anywhere. The job is narrow and personal: do research for me, help me learn **French**, sharpen my **English**, and keep my **Arabic** from going rusty.

I paired it with **ddts** so it generates voice transcription of words — pronunciation drilling without leaving the terminal. Hermes itself routes between two backends: **GitHub Copilot** for hosted Claude/GPT-class lifts, and **Ollama** (via **Grok**) for everything I'd rather keep on my own metal.

{{< ai-hermes-pipeline >}}

Doing it this way means my language practice doesn't leak into a hosted model's memory, and the model stays mine. The cloud move is purely an availability concern — same weights, same scope.

## Normal Life

I mostly use **ChatGPT** for everything else. The GPT-5 models are great enough for everyday tasks. I don't have a subscription — I haven't had a reason to need one, even for their memory feature.

I tried [OpenClaw](https://openclaw.ai/) and its variants ([PicoClaw](https://picoclaw.io/)) as a Golang engineer. I don't like the idea of having such agents.

> AI should be what I prompt — not what decides what I can or should prompt.

I believe on-device models would be the best route to go with LLMs; some projects have started doing that, like [Handy](https://handy.computer/). We'll see more of this kind of integration in the future. I use [Grammarly](https://www.grammarly.com/) and [Harper](https://writewithharper.com/) — not sure if they use AI internally, but this is a good way to use it: *as a tool, not as a replacement*.

## What I don't like

Because LLMs are large prediction engines, I don't enjoy their output for **creative writing** — I do this manually. A good example: asking Claude to help me generate a roadmap for a private software engineering mentorship programme. The output was not great. Some would blame my prompting skills; I believe they're not bad at all. Same reason I don't use them to write.

The power still lies in having a concise idea of what is expected. LLMs can help bootstrap them — still, they aren't always the best, and no tangible replacement for our brains. *Not yet.*

## Improvements?

**Of course!**

Using hosted models for everyday inference is risky; it's surprising how much ChatGPT already knows about us in all of its existence compared to Google. It makes sense to locally host some open source models if latency requirements aren't strict.
