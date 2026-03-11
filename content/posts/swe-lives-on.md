---
title: Software Engineering Lives On!
date: 2026-03-03
tags: [swe, ai, career]
category: vim
summary: Since the release of GPT 3 to the public, we have seen integration of LLMs into knowledge work, Software Engineering inclusive. With the rate of innovation, will knowledge work become obsolete?
cover:
  image: "/assets/don-knuth-claude-cycles.jpeg"
  caption: "[Don Knuth - Claude's Cycles](https://cs.stanford.edu/~knuth/papers/claude-cycles.pdf)"
---


### Motivation
The growth of ChatGPT and other transformer based Artificial Intelligence has been fascinating, mostly applied to knowledge work – and that should be the case. In a space of X years, we transitioned from ChatGPT being able to answer arbitrary questions to Tab completions in Cursor, now agents doing most of the coding work. With these growth, some professions have been threatened, mine(software engineering) has witnessed frozen hirings for junior developers and low hiring for senior engineers. At work we have discussed the job market disruption by AI and developer efficiencies countless of times. Also, some close friends requested my stand on the AI era for software engineers. In all these, my conclusion has remained the same.

I will draw most of my points from [traditional engineering](https://en.wikipedia.org/wiki/List_of_engineering_branches) disciplines, first they lay the foundation for general engineering, second, due to my extensive training as a Mechanical Engineer, so bear with me if liquid and metals infuriates you.

---

## The Great Pyramids of Egypt

{{< figure src="/assets/egyptian-tools.webp" title="" caption="[Martin Odler's book cover, *Old Kingdom Copper Tools and Model Tools*](https://www.amazon.com/Kingdom-Copper-Tools-Archaeopress-Egyptology/dp/1784914428)" align="center" >}}

The Great Pyramid of Giza was built around 2560 BC and we still don't know exactly how, which tells us knowledge was not documented in any transferable system. It lived in the hands of the master craftsman, passed it down through apprenticeship, refined through failure, and unfortunately buried with the builder. Archaeologists estimate the pyramid required [roughly 20,000–30,000 workers](https://spectrum.ieee.org/how-many-people-did-it-take-to-build-the-great-pyramid) at its peak, which is a massive human brain requirement just to move and place rock.

This is **craft engineering**: survival-driven, trial-and-error, deeply personal. It produced extraordinary things but could not survive the death of the craftsman who held it.

The [earliest programmers](https://en.wikipedia.org/wiki/History_of_programming_languages) operated similarly. In the 1950s, there were perhaps a few hundred people in the world who could write a working program which involves toggling switches on ENIAC, hand-assembling machine instructions, one person per machine. A program worked because *that specific person* understood [a specific memory map](https://www.computerhistory.org/timeline/1950/). No documentation. No reproducibility. It ran, and that was enough — until that person left.

And this earlier form of programming proved that large-scale construction and complex computation were achievable at all, same way the Romans would used the pyramids as a model for what organized engineering can accomplish.

## The Roman Roads

{{< figure src="/assets/roman-road.jpg" title="" caption="[By AlMare - Own work, Public Domain](https://commons.wikimedia.org/w/index.php?curid=651155)" align="center" >}}

The Romans were able to build [400,000 km of roads](https://en.wikipedia.org/wiki/Roman_roads) through better craftsmen — replacing craftsmen with process. Each Roman legion of 5,000–6,000 soldiers carried surveying tools and construction equipment as standard kit. Standard layered beds, standard widths, standard drainage. Any legion, anywhere in the empire, can build a road segment that  will connect cleanly to any other. This system worked because knowledge was encoded into repeatable steps that did not depend on any one person, not individual genius.

The human brain requirement did not shrink — it shifted. Fewer master craftsmen, vastly more organized laborers following documented procedure. Expertise moved from *doing* in the case of the pyramids at Giza to *standardizing the doing* through knowledge encoding.

Software was on the same path in the late 1960s. The [1968 NATO Software Engineering Conference](https://en.wikipedia.org/wiki/NATO_Software_Engineering_Conferences) was to address the "software crisis" — late projects, blown budgets, systems collapsing under their own weight. Where the term "software engineering" was coined as a provocation: *let's treat this like a real discipline.* Structured programming, specification documents, team hierarchies followed. 

And by 1980 in the US alone, programmers went from the roughly 10,000 to over 300,000. Again, not because more geniuses appeared, but because process made programming learnable by ordinary trained professionals.

These replicable knowledge would lead to theorization of the processes in future iteration.

---

## Knowledge Accumulation

{{< figure src="/assets/classic-books-first-edition.webp" title="" caption="[First editions of Euler's Mechanica, Bernoulli's Hydrodynamica, and Lagrange's Mechanique analytique](https://www.reddit.com/r/EngineeringPorn/comments/1bvq1r5/first_editions_of_eulers_mechanica_bernoullis/)" align="center" >}}

Every engineering discipline has a moment when theory overtakes intuition. For structural engineering, it was the application of calculus to [beam deflection](https://en.wikipedia.org/wiki/Deflection_(engineering)) — suddenly you could *calculate* whether a bridge would hold rather than build it and see. The workforce implications were immediate: a single structural engineer with mathematics could do what previously required a team of empirical trial-and-error builders. Brain requirement fell for brute-force experimentation; rose sharply for analytical reasoning.

Software went through the same shift with the formalization of computer science. [Turing's computability theory](https://en.wikipedia.org/wiki/Turing_machine). [Knuth's algorithm analysis](https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming). [Type theory](https://en.wikipedia.org/wiki/Type_theory). [Dijkstra's structured programming proofs](https://en.wikipedia.org/wiki/Structured_programming). The question shifted from "does this run on my machine?" to "is this algorithm provably correct, and at what cost?" For the first time, you could reason about software you had never written, on hardware you had never touched. By the 1970s–80s, computer science departments were producing graduates who understood not just *how* to program but *why* programs behaved as they did — at a scale no apprenticeship system could match.

At this stage, formal theory enables mass production through standardization of manufacturing process and being able to specify, predict, and verify its outputs. Again, this would make the assembly line become possible once a person can calculate material tolerances, failure loads, and production rates in advance.

---

## Mass Production

{{< figure src="/assets/ford-assembly-line.jpg" title="" caption="[Gas tanks being installed on the new assembly line, late 1913](https://modeltfordfix.com/fords-highland-park-manufacturing-plant/)" align="center" >}}

Ford did not invent the automobile. He invented a way to build it at a cost ordinary people could afford. On October 7, 1913, the first [moving assembly line](https://en.wikipedia.org/wiki/Assembly_line) at Highland Park began with 140 assemblers on a 150-foot chassis line. Assembly time fell from 728 minutes per car to 93. By 1925, the plant employed nearly 70,000 workers — not master craftsmen, but trained specialists who each mastered one operation and trusted the system to handle the rest. The Model T's price dropped from $850 to $260.

The insight was organizational, not mechanical. And the workforce transformation it produced was sharp: fewer all-knowing craftsmen; many more narrowly skilled operators; a thin layer of process engineers above them who designed and maintained the system. Total brains required *increased*, but they were organized differently — horizontally across many workers rather than vertically inside a few.

The 1990s and 2000s were software's assembly line era. [Git](https://en.wikipedia.org/wiki/Git), object-oriented component architectures, open-source package ecosystems, Agile sprints — a startup in 2005 did not need to write its own database or web server. The [Linux kernel](https://en.wikipedia.org/wiki/Linux_kernel), built by tens of thousands of contributors across every continent, would have been impossible without this organizational stack. By 2010, the global developer population had grown to an estimated 11 million — not because 11 million people understood computation theory, but because the tools and processes had been standardized enough for trained generalists to contribute reliably.

Industrial production generates enormous volumes of repetitive, automatable work. Once you have enough of it concentrated in one place, it becomes economical to build machines that do it. Mass production seeds its own automation.

## Automation & Optimization

When [industrial robots](https://en.wikipedia.org/wiki/Industrial_robot) arrived on automotive lines in the 1960s and 70s, they did not eliminate manufacturing jobs — they redistributed them upward. The line worker who used to spot-weld became the technician who maintained the welding robot. That technician's supervisor became the process engineer who programmed robot sequences. The total number of humans required per car produced fell sharply; but the humans who remained operated at a dramatically higher level of abstraction. The factory floor went from requiring thousands of identical repetitive motions to requiring hundreds of diagnostic and design decisions.

{{< youtube id="sjAZGUcjrP8" >}}

<p> </p>


Software followed identically with DevOps, continuous integration, and cloud infrastructure. Things I used to do by hand — provisioning environments, running test suites, coordinating deploys — became pipelines. The engineer who once spent days configuring servers writes a [Terraform](https://en.wikipedia.org/wiki/Terraform_(software)) script that provisions hundreds. By 2022, roughly [27 million software developers](https://en.wikipedia.org/wiki/Software_engineering_demographics) existed worldwide — but the fastest-growing roles were not "write the code" but "design the systems, own the architecture, manage the reliability." The execution layer automated; the design layer expanded to absorb the talent.

**What this stage made possible:** Automation frees human cognition from routine execution and concentrates it at the level of system design and optimization — which is precisely the level where AI assistance now operates. Each stage creates the conditions the next one needs.

---

## VI. Intelligent Engineering

{{< figure src="/assets/ai-assisted-design.png" title="" caption="[AI-assisted circuit layout — engineering at the next level of abstraction](https://www.globalspec.com/learnmore/industrial_engineering_software/engineering_scientific_software/electronic_design_automation_eda_electronic_computer_aided_design_software_ecad)" align="center" >}}

Which brings us to now. AI code generation automates the translation of well-specified intent into working code — faster than any human team. This is real, and it continues the unbroken pattern: the current execution layer gets automated, and human judgment moves one level up. The answer to "where do humans go?" has been the same across every prior transition: *higher*.

If you need convincing, consider who is saying it — not AI evangelists, but the two figures who more than anyone else defined what software engineering *is*.

### Linus Torvalds: "Sure is."

Torvalds is famously skeptical about AI in the Linux kernel — calling AI-generated contributions "slop," rejecting special policies for them. For the kernel, the standard is the standard, full stop. But in late 2025, his personal [AudioNoise project](https://github.com/torvalds/AudioNoise) surfaced on GitHub. He wrote the core signal processing in C himself. For the Python visualization layer — outside his primary domain — he used an LLM. His commit comment:

> *"Is this much better than I could do by hand? Sure is."*[^1]

This is the man who in 2000 wrote *"Talk is cheap. Show me the code"* — the defining axiom of serious software engineering for a generation. Twenty-five years later, he is merging AI-generated code and acknowledging it outperforms his own hand work. Not because he cannot write it. Because his judgment is better spent on the part only he can do. That is exactly what happened to the master craftsman when precision machine tools arrived — you do not abandon expertise, you redirect it upward.

### Don Knuth: "Shock! Shock!"

If Torvalds is the era's craftsman, [Donald Knuth](https://en.wikipedia.org/wiki/Donald_Knuth) is its theorist — sixty-plus years writing *[The Art of Computer Programming](https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming)*, the mathematical bedrock of the entire industry. He has always been careful about AI: not dismissive, just precise.

In February 2026, he published **["Claude's Cycles"](https://www-cs-faculty.stanford.edu/~knuth/papers/claude-cycles.pdf)** — a five-page note that opens:

> *"Shock! Shock! I learned yesterday that an open problem I'd been working on for several weeks had just been solved by Claude Opus 4.6."*[^2]

A colleague fed an unsolved graph theory conjecture — destined for a future volume of *TAOCP* — directly to Claude. In roughly an hour across 31 systematic explorations, the model tried brute-force search, invented "serpentine patterns," hit dead ends, pivoted, and found a construction verified correct for every odd number up to 101. Knuth wrote the formal proof himself, then published the paper. His closing line: *"Hats off to Claude!"*[^2]

The significance is not that AI solved a hard math problem. It is *who noticed*, and what he concluded. Knuth did not say the discipline was over. He said he needed to revise his opinions. He wrote the proof. He published the paper. The human expert remained essential — for verification, context, and judgment about what mattered. What changed was where the frontier lay.

---

## The Pattern, Summed Up

Look across all six stages and the structure becomes clear:

**Engineering evolves when existing methods can no longer handle the scale or complexity being demanded of them. Each stage automates the prior bottleneck, formalizes the knowledge that accumulated there, and moves human judgment one level higher — making the next stage possible.**

The workforce numbers tell the story precisely. Building the pyramids required ~20,000 humans to move stone under the direction of a handful of master craftsmen. Roman road-building channeled hundreds of thousands of soldiers through documented procedure under a thin layer of engineers. Ford's assembly line employed 70,000 workers at a single plant, coordinated by process designers. Modern DevOps teams of dozens manage infrastructure that would have required thousands of manual operators a decade earlier. At each transition, the total cognitive burden did not shrink — it concentrated upward into fewer, more abstractly capable roles.

The labor ladder is consistent: manual laborers → craftsmen → process engineers → system designers → architects. Human labor does not disappear at any stage. Its nature changes, and the level at which it operates rises.

AI continues this sequence. What it automates is the execution layer — translating known solutions into correct syntax, filling boilerplate, fixing well-understood bugs. What it cannot automate is knowing *what to build*, *why it matters*, *whether the requirements are right*, and *whether the resulting system is trustworthy*. Those are questions of architecture, domain expertise, and judgment built over years of watching systems fail in unexpected ways. They are not getting easier. They are getting harder as systems grow more complex, faster, and more deeply integrated into things that matter.

The engineers who understand this will not be replaced. They will be asked to operate one level higher than before — and the engineers who grasp that pattern early will help define what that level looks like.

Software engineering lives on. Not despite the AI revolution, but through it. The pyramid builders are still building. They just have better tools now.

---

*If you have thoughts on this — or you're a developer figuring out what the path forward looks like — I'd genuinely like to hear from you.*


[^1]: Linus Torvalds, commit comment on [AudioNoise/93a7256](https://github.com/torvalds/AudioNoise/commit/93a72563cba609a414297b558cb46ddd3ce9d6b5), GitHub, 2025.
[^2]: Donald E. Knuth, ["Claude's Cycles,"](https://www-cs-faculty.stanford.edu/~knuth/papers/claude-cycles.pdf) Stanford Computer Science Department, 28 February 2026.