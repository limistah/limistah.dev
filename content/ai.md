---
title: How I Use AI
description: This page outlines my everyday use of Artificial Intelligence, as an engineer and as a writer
layout: baseof
comments: false
tocopen: false
showPostNavLinks: false
---
I have witnessed a lot of evolution in technology, but Artificial Intelligence (AI) is just great. As we share the same initials (Aleem Isiaka), I have decided to be hands-on with it.

On this page, I will continue to share how I use and explore the technology for *work*, *learning*, and *normal life*. Things I like and how I believe they can be improved.

### Summary

- **I know what I want, and there is an AI agent that does it well enough**: I structure the implementation, and use an AI to generate it faster than I could, revise and review, and even do manual intervention when necessary.
- **I know what I want, but no AI agent is good enough for it**: I gather resources, refine the idea with an LLM, and continue with manual implementation.
- **I don’t know what I want**: I just prompt an AI to get a general idea of what to expect, then transition to one of the two approaches above.
- **Everyday Random Search**: I just prompt an AI

## At Work

Software Engineering has witnessed immense integration of AI into its workflows, and for the things I **research**, **decide,** and **implement**, I have my own approach.

### Researching

I mostly use ChatGPT, the free version, for this purpose, but Gemini can be somewhat great for access to the information Google has to have trained it, so I pair both. I pull as much information as I can from Gemini, export it to a doc or text file, then import it into ChatGPT for a refined result.

I also learnt Grok can be so great for things like this, but I have not tried it yet.

### Deciding

Anthropic’s models are the best here. Sometimes, I merge both research and decision into a single session on Claude Code. I have also find access to Claude models via Github more economical, more on this at the implementation phase.

### Implementation

This largely involves coding.

I use [OpenCode](https://opencode.ai/) as my coding agent and connect to Anthropic’s models via [GitHub Copilot Subscription](https://github.com/features/copilot/plans). I mostly run out of premium requests, but Copilot’s pricing model is still reasonable for me – we have access to Copilot Pro through our organization at work.

I pair Copilot with a Claude Code Pro subscription, but I mostly use this when I have to one-shot a task.

I take the output of the LLMs as my initial draft, then revise it manually and review it to ensure it meets my requirements and coding style. This process still requires me to code and increases my awareness of the outputs, rather than teaching an LLM how I write code. Whenever there is an abnormal output, I query the model for its reasoning – a 2-Factor verification to avoid slops.

I also take extra time going over the PRs personally before requesting external reviews.

I know extreme AI usage results in brain rot, and even LLMs themselves generate slops, which is not really my fear. I care more about my reputation as an engineer. I believe that once a name is tagged to a piece of work, the means stops justifying the end – responsibility has never been more important.

### Vibe Coding

When I have to move with speed, I employ Claude Code; when I have to be more cautious, which is most of the time, I plan the task on [OpenCode](https://opencode.ai/), review and revise till an acceptable implementation plan is reached before proceeding with an implementation.

## Learning

A continuum process, and not so different from work.

The AI Mode of Google, in my opinion, is underrated. I post my questions directly to Google, and I have the option to either decide for myself by going deeper into the links, or I just click the AI Mode tab, get the summary but, with the AI Mode I have the option of asking a followup question which has always been a natural step after an initial Google Search, instead of making a new Google Search query and losing the initial search context.

For research work, I use [NotebookLM](https://notebooklm.google.com/) – also work-related research, sometimes. I love the fact that it uses my own curated sources, and a little bit of its internal knowledge for its output, which makes referencing easier and a deep dive into a piece of work more thorough.

## Normal Life

I mostly use ChatGPT for everything else. I believe their GPT-5 models are great enough for everyday tasks. I don’t have a subscription with them - I have not had a reason to need one, even for their memory feature.

I tried [OpenClaw](https://openclaw.ai/) and its variants - [PicoClaw](https://picoclaw.io/), as a Golang engineer. I don’t like the idea of having such agents. I believe AI should be what I prompt, not what decides what I can/should prompt.

I believe on-device models would be the best route to go with these LLMs; some projects have started doing that, like [Handy](https://handy.computer/). We will see more of this kind of AI integration in the future. I use [Grammarly](https://www.grammarly.com/) and [Harper](https://writewithharper.com/), not sure if they use AI internally, but this is a good way to use AI – as a tool, not as a replacement.

## What I don’t like

Because LLMs are large prediction engines, I don’t enjoy their output for creative writing - I manually do this. A good example is asking Claude to help me generate a roadmap for a private software engineering mentorship programme - the output was not great, still, some would blame my Prompting skills, which I believe is not bad at all. Same reason why I don’t use them to write.

The power still lies in having a concise idea of what is expected. LLMs can help to bootstrap them out – still, they are not always the best, and no tangible replacement for our brains, not yet!

## Improvements?

Of course!

Using hosted models for everyday inference is risky; it is surprising how much ChatGPT knows already about us in all of its existence compared to Google. It makes sense to locally host some open source models if the speed is not significant.