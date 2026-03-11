---
title: Software Engineering Lives On!
date: 2026-03-03
tags: [swe, ai, career]
category: vim
summary: Since the public release of GPT-3, LLMs have been integrated into many kinds of knowledge work, including software engineering. With the current pace of innovation, will knowledge work become obsolete?
cover:
  image: "/assets/don-knuth-claude-cycles.jpeg"
  caption: "[Don Knuth - Claude's Cycles](https://cs.stanford.edu/~knuth/papers/claude-cycles.pdf)"
---


### Motivation
The growth of ChatGPT and other transformer-based artificial intelligence tools has been fascinating, especially as they are applied to knowledge work — as they should be. In just a few years, we transitioned from ChatGPT being able to answer arbitrary questions to tab completions in tools like Cursor, and now to agents doing most of the coding work. With this growth, some professions have been threatened; my own field (software engineering) has witnessed hiring freezes for junior developers and reduced hiring for senior engineers. At work we have discussed the job market disruption caused by AI and the resulting developer efficiencies countless times. Some close friends have also requested my stance on the AI era for software engineers. Through all of this, my conclusion has remained the same.

I will draw most of my points from [traditional engineering](https://en.wikipedia.org/wiki/List_of_engineering_branches) disciplines, first they lay the foundation for general engineering, second, due to my extensive training as a Mechanical Engineer, so bear with me if liquids and metals infuriate you.

---

## The Great Pyramids of Egypt

{{< figure src="/assets/egyptian-tools.webp" title="" caption="[Martin Odler's book cover, *Old Kingdom Copper Tools and Model Tools*](https://www.amazon.com/Kingdom-Copper-Tools-Archaeopress-Egyptology/dp/1784914428)" align="center" >}}

The Great Pyramid of Giza was built around 2560 BC and we still don't know exactly how, which tells us knowledge was not documented in any transferable system. It lived in the hands of the master craftsman, passed it down through apprenticeship, refined through failure, and unfortunately buried with the builder. Archaeologists estimate the pyramid required [roughly 20,000–30,000 workers](https://spectrum.ieee.org/how-many-people-did-it-take-to-build-the-great-pyramid) at its peak, which is a massive human brain requirement just to move and place rock.

This is **craft engineering**: survival-driven, trial-and-error, deeply personal. It produced extraordinary things but could not survive the death of the craftsman who held it.

The [earliest programmers](https://en.wikipedia.org/wiki/History_of_programming_languages) operated similarly. In the 1950s, there were perhaps a few hundred people in the world who could write a working program which involves toggling switches on [ENIAC](https://en.wikipedia.org/wiki/ENIAC), hand-assembling machine instructions, one person per machine. A program worked because *that specific person* understood [a specific memory map](https://www.computerhistory.org/timeline/1950/). No documentation. No reproducibility. It ran, and that was enough — until that person left.

This earlier form of programming proved that large-scale construction and complex computation were achievable after all, same way the Romans would use the pyramids as a model for what organized engineering can accomplish.

## The Roman Roads

{{< figure src="/assets/roman-road.jpg" title="" caption="[By AlMare - Own work, Public Domain](https://commons.wikimedia.org/w/index.php?curid=651155)" align="center" >}}


The Romans were able to build [400,000 km of roads](https://en.wikipedia.org/wiki/Roman_roads) through better craftsmen — replacing craftsmen with process. Each [Roman legion](https://en.wikipedia.org/wiki/Roman_legion) of 5,000–6,000 soldiers carried surveying tools and construction equipment as standard kit. A legion, anywhere in the empire, can build a road segment that  will connect cleanly to any other. And this system worked because they were able to ecode knowledge  into repeatable steps that did not depend on any person


The human brain requirement did not shrink — it shifted. It required fewer master craftsmen, but much more organized laborers that follow a documented procedure. Expertise moved from *doing* in the case of the pyramids at Giza to *standardizing the doing* through knowledge encoding.

Software was on the same path in the late 1960s. The [1968 NATO Software Engineering Conference](https://en.wikipedia.org/wiki/NATO_Software_Engineering_Conferences) was to address the "[software crisis](https://en.wikipedia.org/wiki/Software_crisis)" — late projects, blown budgets, systems collapsing under their own weight. Here. the term "software engineering" was coined to eliminate their provocation of *let's treat this like a real discipline.* And after the name, structured programming, specification documents, team hierarchies were introduced. 

And by 1980 in the US alone, programmers went from the roughly [10,000 to over 300,000](https://www.aol.com/employment-computer-programmers-u-plummeted-180040565.html). Also, not because more geniuses appeared, but because process made programming learnable by ordinary trained professionals.

These replicable knowledge would lead to theorization of the processes in a future iteration.

## Knowledge Accumulation

{{< figure src="/assets/classic-books-first-edition.webp" title="" caption="[First editions of Euler's Mechanica, Bernoulli's Hydrodynamica, and Lagrange's Mechanique analytique](https://www.reddit.com/r/EngineeringPorn/comments/1bvq1r5/first_editions_of_eulers_mechanica_bernoullis/)" align="center" >}}

Every engineering discipline has a moment when theory overtakes intuition. For structural engineering, it was the application of calculus to [beam deflection](https://en.wikipedia.org/wiki/Deflection_(engineering)) — suddenly you could *calculate* whether a bridge would hold rather than build it and see. 

The workforce implications were immediate: a single structural engineer with mathematics could do what previously required a team of empirical trial-and-error builders. Creating a sharp rise for analytic reasoning, over brute-force experimentation.

Software went through the same shift with the formalization of computer science with theories like:

- [Turing's computability theory](https://en.wikipedia.org/wiki/Turing_machine).

- [Knuth's algorithm analysis](https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming). [Type theory](https://en.wikipedia.org/wiki/Type_theory)

- [Dijkstra's structured programming proofs](https://en.wikipedia.org/wiki/Structured_programming). 

The question shifted again, from "does this run on my machine?" to "is this algorithm provably correct, and at what cost?" For the first time, you could reason about software you had never written, on hardware you had never touched. 

By the 1970s–80s, computer science departments were [producing graduates](https://medium.com/@ahmedelhadi_16675/when-computers-entered-the-classroom-the-untold-story-of-how-computer-science-became-a-discipline-45ad270e1c5d) who understood not just *how* to program but *why* programs behaved as they did — at a scale no apprenticeship system could match.

At this stage, formal theory enables mass production through standardization of manufacturing process and being able to specify, predict, and verify its outputs. Again, this would make the assembly line become possible once a person can calculate material tolerances, failure loads, and production rates in advance.

## Mass Production

{{< figure src="/assets/ford-assembly-line.jpg" title="" caption="[Gas tanks being installed on the new assembly line, late 1913](https://modeltfordfix.com/fords-highland-park-manufacturing-plant/)" align="center" >}}

Henry Ford did not invent the automobile. He invented a way to build it at a cost ordinary people could afford. On October 7, 1913, the first [moving assembly line](https://en.wikipedia.org/wiki/Assembly_line) at [Highland Park](https://en.wikipedia.org/wiki/Highland_Park_Ford_Plant) began with 140 assemblers on a 150-foot chassis line. Assembly time fell from 728 minutes per car to 93. 

By 1925, the plant employed nearly 70,000 workers who were trained specialists — not master craftsmen, with mastery of one operation and trusted the system to handle the rest. This single change dropped the proice of a [Model T](https://en.wikipedia.org/wiki/Ford_Model_T) from $850 to $260.

The insight was organizational, not mechanical. A thin layer of process engineers at the top who designed and maintained the system, a fewer _all-knowing_ craftsmen, but many special skilled operators at the bottom. Total brains required *increased*, but differently organized — horizontally across many workers rather than vertically inside a few.

The 1990s and 2000s were software's assembly line era. [Git](https://en.wikipedia.org/wiki/Git), object-oriented component architectures, open-source package ecosystems, Agile sprints. The [Linux kernel](https://en.wikipedia.org/wiki/Linux_kernel), built by tens of thousands of contributors across every continent, would have been impossible without this organizational stack. By 2010, the global developer population had grown to an estimated 11 million — not because 11 million people understood computation theory, but because the tools and processes had been standardized enough for trained generalists to contribute reliably.

Now that a large part of production has become a repetitive, automatable work, it becomes economical to build machines that do them through automation.

## Automation & Optimization

[industrial robot](https://en.wikipedia.org/wiki/Industrial_robot) arrival on automotive lines in the 1960s and 70s, did not eliminate manufacturing jobs, it redistributed them upward. 

- A line worker who used to spot-weld became the technician who maintained the welding robot. 
- That technician's supervisor became the process engineer who programmed robot sequences. 

These required humans to operate at a dramatically higher level of abstraction, drastically reducing the total number of humans required to produce a car. The factory floor now require hundreds of diagnostic and design decisions against thousands of identical repetitive motions.

{{< youtube id="sjAZGUcjrP8" >}}

<p> </p>

Software followed identically with DevOps, continuous integration, and cloud infrastructure. 

Things I used to do by hand — provisioning environments, running test suites, coordinating deploys — became pipelines. An engineer that spent days configuring servers  now writes a [Terraform](https://en.wikipedia.org/wiki/Terraform_(software)) script that provisions hundreds. 

By 2022, roughly [27 million software developers](https://en.wikipedia.org/wiki/Software_engineering_demographics) existed worldwide — but the fastest-growing roles were not "write the code" but "design the systems, own the architecture, manage the reliability." The execution layer automated; the design layer expanded to absorb the talent.

This stage was possible only because mudane tasks has been automated which frees human cognition from routine execution and concentrates it at the level of system design and optimization — which is precisely the level where AI assistance now operates.


## Intelligent Engineering

{{< figure src="/assets/ai-assisted-design.png" title="" caption="[AI-assisted circuit layout — engineering at the next level of abstraction](https://www.globalspec.com/learnmore/industrial_engineering_software/engineering_scientific_software/electronic_design_automation_eda_electronic_computer_aided_design_software_ecad)" align="center" >}}

And here we are ... 

AI coding agent has automated the translation of well-specified intent into working code — faster than any human team. Continuing the unbroken pattern: 

> Once the current execution layer is automated, and human judgment moves one level up.
 
The answer to "where do humans go?" has been the same across every prior transition: 

> *higher*.

Maybe, some OGs of the industry can make you understand where we are in the history of computer science, software engineering, and human race in general.

### Linus Torvalds Leveraged LLM

Torvalds is famously skeptical about AI in the Linux kernel, and calls AI-generated contributions "slop." 

In late 2025, his personal [AudioNoise project](https://github.com/torvalds/AudioNoise) surfaced on GitHub. He had written the core signal processing in C himself, and for the Python visualization layer — outside his primary domain — he used an LLM. I am not amused becuase he used AI assisted coding, I am because of his comment:

> *"Is this much better than I could do by hand? Sure is."*[^1]

This is the man who in 2000 wrote *"Talk is cheap. Show me the code"* — a statement we have used since then. Only for him to merge AI-generated code and acknowledging it outperforms his own hand work twenty-five years later. Not because he cannot write it. Because his judgment is better spent on the part only he can do.

That is exactly what happened to the master craftsman when precision machine tools arrived — they did not abandon their expertise, they redirected them upward.

### Don Knuth in "Shock! Shock!"

[Donald Knuth](https://en.wikipedia.org/wiki/Donald_Knuth) is _the_ computer science theorist — has spent sixty-plus years writing *[The Art of Computer Programming](https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming)*, the mathematical bedrock of the entire industry. 

He has always been careful about AI: not dismissive, just precise.

In February 2026, he published **["Claude's Cycles"](https://www-cs-faculty.stanford.edu/~knuth/papers/claude-cycles.pdf)** — a five-page note with an opening statement:

> *"Shock! Shock! I learned yesterday that an open problem I'd been working on for several weeks had just been solved by Claude Opus 4.6."*[^2]

A colleague fed an unsolved graph theory [conjecture](https://en.wikipedia.org/wiki/Conjecture) —  an exercise for a future volume of [*TAOCP*](https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming) — directly to [Claude](https://claude.ai/). In roughly an hour across 31 systematic explorations, the model tried brute-force search, invented "[serpentine patterns](https://en.wikipedia.org/wiki/Serpentine_shape)," hit dead ends, pivoted, and found a construction verified correct for every odd number up to 101. Knuth wrote the formal proof himself, then published [the paper](https://www-cs-faculty.stanford.edu/~knuth/papers/claude-cycles.pdf). His closing line: 

> *Hats off to Claude!*[^2]

I am not surprised that AI solved a hard math problem, but suprised at whose problem, and his conclusions. Knuth did not say the discipline was over. He said he needed to revise his opinions. 

It also woth noting that Knuth wrote the proof, and published the paper. Emphasizing that the human expert remained essential — for verification, context, and judgment about what mattered. 

What changed was where the frontier lay.

## The Pattern, Summed Up



> **Engineering evolves when existing methods can no longer handle the scale or complexity being demanded of them. Each stage automates the prior bottleneck, formalizes the knowledge that accumulated there, and moves human judgment one level higher — making the next stage possible.**

---
Look across all six stages and the structure becomes clear:

- Building the pyramids required ~20,000 humans to move stone under the direction of a handful of master craftsmen.

- Roman road-building channeled hundreds of thousands of soldiers through documented procedure under a thin layer of engineers. 

- Ford's assembly line employed 70,000 workers at a single plant, managed and coordinated by process designers. 

- Modern DevOps teams of dozens manage infrastructure that would have required thousands of manual operators a decade earlier. 

At each transition, the total cognitive burden did not shrink — it concentrated upward into fewer, more abstractly capable roles.

The labor ladder is consistent: 

Manual laborers → craftsmen → process engineers → system designers → architects.

Human labor does not disappear at any stage. Its nature changes, and the level at which it operates rises. AI continues this sequence by automating the execution layer — translating known solutions into correct syntax, filling boilerplate, fixing well-understood bugs. 

What it cannot automate is knowing 

- *what to build*,
- *why it matters*,
- *whether the requirements are right*, and,
- *whether the resulting system is trustworthy*.

I call these _Responsibility_ - who owns what?

Those are questions of architecture, domain expertise, and judgment built over years of watching systems fail in unexpected ways. They are not getting easier but harder as systems grow more complex, faster, and more deeply integrated into things that matter.

The engineers who understand this will not be replaced. They will be asked to operate one level higher than before — and the engineers who grasp that pattern early will help define what that level looks like.

Software engineering lives on. Not despite the AI revolution, but through it. The pyramid builders are still building. They just have better tools now.

---

*If you have thoughts on this — or you're a developer figuring out what the path forward looks like — I'd genuinely like to hear from you.*


[^1]: Linus Torvalds, commit comment on [AudioNoise/93a7256](https://github.com/torvalds/AudioNoise/commit/93a72563cba609a414297b558cb46ddd3ce9d6b5), GitHub, 2025.
[^2]: Donald E. Knuth, ["Claude's Cycles,"](https://www-cs-faculty.stanford.edu/~knuth/papers/claude-cycles.pdf) Stanford Computer Science Department, 28 February 2026.