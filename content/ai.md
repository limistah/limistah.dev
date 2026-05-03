---
title: How I Use AI
description: This page outlines my everyday use of Artificial Intelligence, as an engineer and as a writer
layout: baseof
comments: false
tocopen: false
showPostNavLinks: false
---
I have witnessed a lot of evolution in technology but Artificial Intelligence (AI), it is just amazing. As we share the same initials (Aleem Isiaka), it makes good sense that I am very intentional about this technology.

On this page, I will continue to share how I use and explore the technology for *work*, *learning*, and *normal life*.

## At Work
Software Engineering has witnessed immense integration of AI into its workflows And for the things I do **research**, **decide** and **implement**, I have my personal approach for them.
### Researching
I mostly use ChatGPT the free version for this purpose, but Gemini can be somewhat great to the access to information Google has to have trained it, so I pair both. I pull as much information that I can from Gemini, export to a doc or text file then import into ChatGPT for a refined result.

I also learnt Grok can be so great for things like this, but I have not tried it, yet.
### Deciding
Anthropic's models are the best here. Sometimes, I merge both research and decision into a single session on Claude Code. I have also find access to Claude models via Github more economical, more on this at the implementation phase.

### Implementation
This largely involves coding.

I use [OpenCode](https://opencode.ai/) as my coding agent, and connect to Anthropic's models via [Github Copilot Subscription](https://github.com/features/copilot/plans). I mostly run out of premium requests but Copilot's pricing model is still reasonable for me – we have access to Copilot Pro through our organization at work.

I pair Copilot with a Claude Code Pro subscription, but I mostly use this when I have to one-shot a task.

I take the output of the LLMs as my initial draft, always, then ensuring they meet my requirements and coding style, through revision manual edits and manual reviews. The process enforce me to still code, increase my awareness of the outputs than teaching an LLM how I write code. Whenever there is an abnormal output, I query the model for its reasoning – a 2-Factor verification to avoid slops.

I also take extra time going over the PRs personally before requesting external reviews.

I know extreme AI usage results in brain rot and even LLMs themselves generate slops, that is not really my fear. I care more about my reputation as an engineer. I believe that once a name is tagged to a piece of work, the means stops justifying the end – responsibility has never been more important.
#### Vibe Coding

When I have to move with speed, I employ Claude Code, when I have to be more cautious – which is most of the time, I plan the task on [OpenCode](https://opencode.ai/), review and revise till an acceptable implementation plan is reached before proceeding with an implementation.
## Learning
A continuum process, and not so different from work.

The AI Mode of Google, in my opinion, is underrated. I post my questions directly to Google, and I have the option to either decide for myself by going deeper into the links, or I just click the AI Mode tab, get the summary but, with the AI Mode I have the option of asking a followup question which has always been a natural step after an initial Google Search, instead of making a new Google Search query and loosing the initial search context.

For research work, I use [NotebookLM](https://notebooklm.google.com/) – also work related research, sometimes. I love the fact that it uses my own curated sources, and a little bit of its internal knowledge for its output, this makes referencing easier and deep dive into a piece work thorough.
## Normal Life
I mostly use ChatGPT for everything else, I believe their GPT-5 models are great enough for everyday tasks. I don't have a subscription with them - I have not had a reason to need one, even for their memory feature.

I tried [OpenClaw](https://openclaw.ai/) and its varients - [PicoClaw](https://picoclaw.io/), as a Golang engineer. I don't like the idea of having such agents. I believe AI should be what I prompt not what should decide what I can/should prompt.

I believe on-device models would be the best route to go with these LLMs, some projects have started doing that like [Handy](https://handy.computer/). We will see more of these kind of AI integrations in the future.
## What I don't like
Because LLMs are large prediction engines, I don't enjoy their output for creative writing. A good example is asking Claude to help me generate a roadmap for a private software engineering mentorship programme - the output was not great, still some would blame my Prompting skills which I believe is not bad, at all.

The power still lies in having a concise idea of what is expected, LLMs can help to bootstrap them out but, they are not the best, always - no tangible replacement for our brains yet!
## Improvements?
Of course!

Using hosted models for everyday inference is risky, it is surprising how much ChatGPT knows already about us in all of its existence compared to Google. It makes sense to locally host some opensource models if the speed is not significant.
