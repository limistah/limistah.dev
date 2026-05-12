# 30-Month Mixed Software Engineering Curriculum Blueprint

**Program Identity:** Mixed Software Engineering  
**Target Audience:** Early 20s, beginner-to-intermediate progression  
**Duration:** 2.5 years (30 months)  
**Teaching Model:** Single-path, one mentor  
**Optimization Goals:** Deep engineering mastery + job readiness  
**Growth Model:** Visible, measurable, incremental  

---

## Program Philosophy

This curriculum produces **durable builders** who can:
- Build useful software end-to-end
- Debug independently across layers
- Think in systems
- Communicate like professionals
- Adapt to new tools and domains
- Leverage AI critically
- Keep growing after formal instruction ends

The program avoids producing:
- Framework-only developers
- Shallow bootcamp graduates
- Pure theorists without delivery skills
- Tool-dependent engineers

---

## Core Principles

1. **Foundation-first, then specialization**
   Strong fundamentals in programming, web, databases, and Git before lower-level work

2. **Spiral curriculum**
   Same engineering themes (build, test, deploy, debug, improve) repeated across languages with increasing depth

3. **Mixed software engineering**
   Combines application engineering, systems literacy, backend/service engineering, tooling, and professional practice

4. **Industry-aware, not industry-locked**
   General engineering first, then domain-flavored projects (fintech anchor) in later phases

5. **AI-assisted but verification-disciplined**
   Use AI for speed and learning, but always verify outputs critically

6. **Open source throughout**
   From using libraries correctly to meaningful contributions

---

## Language Sequence

All students follow the same path:

1. **Core:** TypeScript, Python, SQL, Bash
2. **Systems:** C
3. **Java:** Deep backend engineering
4. **Go:** Deep concurrent services and tooling
5. **Rust:** Deep safe systems and services

All three of Java, Go, and Rust are taught at equal depth.

---

## Program Structure

### Phase 1: Core (8 months)

**Languages:** TypeScript, Python, SQL, Bash

**Focus Areas:**
- Programming fundamentals (variables, control flow, functions, modules, debugging)
- Web foundations (HTTP, browsers, client-server, forms, validation)
- API development (REST, JSON, request/response)
- Database thinking (SQL, schema design, relationships, queries)
- Git and version control
- Testing basics
- Documentation
- Terminal literacy
- Simple deployment

**What students become able to do:**
- Build small full-stack applications
- Use the terminal confidently
- Use Git properly (commits, branches, PRs, reviews)
- Model and query data with SQL
- Debug application-layer issues
- Explain code and design decisions clearly
- Deploy simple apps to cloud platforms

**Projects:**
1. CLI task tracker (Python)
2. SQL-backed CRUD app
3. REST API with database
4. Simple full-stack web app (TypeScript + backend)
5. Deployed capstone with auth and persistence

**AI/ML exposure:**
- AI-assisted engineering introduced (prompting, code generation, debugging help, verification habits)

**DevOps exposure:**
- Basic deployment (Vercel, Render, or Fly.io)
- Environment variables and config
- Basic CI with GitHub Actions

**Networking concepts:**
- HTTP protocol
- DNS basics
- Browser-server communication
- API request lifecycle
- Client-server model

**Algorithms/Data Structures:**
- Arrays, lists, maps, sets
- Basic sorting and searching
- Time/space complexity introduction
- Problem decomposition

**Open source:**
- Use libraries correctly
- Read documentation well
- Inspect repo structure
- Open first issues or documentation PRs

**Checkpoint deliverables:**
- One deployed full-stack app
- One backend API
- One public repo with documentation
- One debugging practical
- One architecture explanation
- Scorecard assessment

---

### Phase 2: Systems (4 months)

**Language:** C

**Focus Areas:**
- Compilation and build process
- Stack vs heap memory
- Pointers and memory management
- Files and I/O
- Processes and signals
- Threads and basic concurrency
- Sockets and network programming
- Memory discipline and debugging tools (gdb, valgrind)
- Operating system basics
- Performance reasoning

**What students become able to do:**
- Understand what high-level languages abstract away
- Reason about memory layout and performance
- Write small systems programs
- Explain networking and process behavior
- Debug lower-level failures
- Use systems debugging tools

**Projects:**
1. File parser in C
2. Simple shell or mini CLI utility
3. TCP client/server exercise
4. Multithreaded or multiprocess mini project

**Networking concepts:**
- TCP/UDP protocols
- Sockets programming
- IP addresses and ports
- Network byte order
- Packet flow intuition

**Algorithms/Data Structures:**
- Algorithms tied to memory behavior
- Linked lists, stacks, queues in C
- Memory-efficient data structures
- Performance implications of choices

**Open source:**
- Build projects from source
- Read small C codebases
- Trace bugs and reproduce behavior
- Understand build systems

**Checkpoint deliverables:**
- One systems mini-project
- One networked program
- One debugging lab involving memory/process issues
- One written explanation of runtime behavior
- Scorecard assessment

---

### Phase 3: Java (6 months)

**Language:** Java

**Focus Areas:**
- Java language fundamentals
- Typed backend engineering
- Spring Boot framework
- PostgreSQL integration
- Testing (JUnit, integration tests)
- Layered architecture and clean code
- API design and REST conventions
- Persistence and ORM
- Concurrency basics (threads, ExecutorService)
- Docker containerization
- CI/CD with GitHub Actions
- Security basics (auth, authz, input validation)

**What students become able to do:**
- Build maintainable backend services
- Structure larger codebases cleanly
- Write comprehensive unit and integration tests
- Connect services to databases with proper modeling
- Work with production-style conventions
- Handle transactions and data integrity
- Apply SOLID principles where useful

**Projects:**
1. Java REST API
2. Service with authentication and role-based access control (fintech flavor: user accounts, permissions)
3. Background job or event-driven feature (fintech flavor: transaction processing, notifications)
4. Production-style team capstone service (fintech flavor: ledger, audit logs, basic fraud checks)

**AI/ML exposure:**
- Building with AI APIs (LLM integration for features)
- Structured outputs and embeddings basics

**DevOps exposure:**
- Docker containers
- Docker Compose for local dev
- CI/CD pipelines
- Environment management
- Basic AWS usage (EC2, RDS)

**Networking concepts:**
- Service-to-service communication
- HTTP headers and status codes
- Load balancing basics
- Timeouts and retries

**Algorithms/Data Structures:**
- Hash maps for caching
- Queues for job processing
- Trees for hierarchical data
- Graph basics for relationships
- Algorithm choice in real services

**Security concepts:**
- OWASP basics
- Auth vs authz
- Password hashing
- Secrets management
- Input validation and SQL injection prevention
- Session management

**Open source:**
- Java documentation and test contributions
- Bug reproduction and reporting
- Small backend fixes in real repos

**Checkpoint deliverables:**
- One serious backend service (deployed)
- Tested API with database integration
- CI-enabled repo
- Code review round with architecture feedback
- One fintech-flavored capstone
- Scorecard assessment

---

### Phase 4: Go (6 months)

**Language:** Go

**Focus Areas:**
- Go language fundamentals
- Service development
- CLI tool development
- Goroutines and channels
- Concurrency patterns
- Observability (logging, metrics, tracing)
- REST APIs in Go
- Cloud-friendly deployment
- Performance profiling
- Error handling patterns
- Context and cancellation

**What students become able to do:**
- Build small, reliable services
- Write clean concurrent programs
- Create CLIs and developer tooling
- Expose metrics and structured logs
- Reason about service operations and failure modes
- Profile and optimize Go programs

**Projects:**
1. Go CLI tool (devtools flavor: code generator, linter, or deployment tool)
2. Concurrent worker/job processor (cloud/infra flavor: log aggregator, task scheduler)
3. API service with logging and metrics (internal platform flavor: service registry, config service)
4. Deployable cloud-style service with observability

**AI/ML exposure:**
- Continue AI API integration in services
- Use AI for generating test cases and documentation

**DevOps exposure:**
- Advanced AWS usage (Lambda, S3, IAM, CloudWatch)
- Kubernetes basics (optional, light exposure)
- Infrastructure as code introduction
- Service monitoring and alerting
- Incident response basics

**Networking concepts:**
- gRPC introduction
- Service mesh concepts
- Network debugging
- Latency and throughput tradeoffs

**Algorithms/Data Structures:**
- Concurrent data structures
- Rate limiting algorithms
- Caching strategies
- Scheduling algorithms
- Bloom filters and probabilistic structures

**Systems engineering thinking:**
- Scalability patterns
- Reliability patterns
- Failure modes and fault tolerance
- Backpressure and flow control
- Resource limits and quotas

**Open source:**
- Read production Go tooling repos
- Small fixes in Go libraries or CLIs
- Contribution etiquette in active projects
- Code review participation

**Checkpoint deliverables:**
- One production-style Go service
- One CLI tool
- Concurrency debugging assessment
- Observability review (logs, metrics, traces)
- Performance profiling exercise
- Scorecard assessment

---

### Phase 5: Rust (6 months)

**Language:** Rust

**Focus Areas:**
- Ownership and borrowing
- Lifetimes (practical level)
- Safe concurrency
- Error handling with Result and Option
- Performance optimization
- Robust service/tooling design
- Testing culture in Rust
- Cargo ecosystem
- Async Rust (Tokio or similar)
- Memory safety without garbage collection

**What students become able to do:**
- Build safe and precise software
- Reason about memory safety explicitly
- Write robust services or systems tools
- Compare design tradeoffs across Java, Go, and Rust
- Debug complex compile-time and runtime issues
- Apply strong engineering discipline

**Projects:**
1. Rust CLI utility (systems/security flavor: file encryption tool, backup utility)
2. Service or systems-flavored backend (performance-sensitive API, data processor)
3. Concurrent processing project (async tasks, parallel computation)
4. Final capstone with strong engineering standards (student choice: fintech, devtools, or systems project)

**AI/ML exposure:**
- Understanding ML basics (models, training vs inference, evaluation)
- Integration with ML inference APIs
- Embeddings and vector search (optional)

**DevOps exposure:**
- Production deployment best practices
- Monitoring and incident management
- Performance tuning
- Security hardening
- Release management

**Networking concepts:**
- Async I/O
- WebSockets
- Streaming protocols
- Network performance optimization

**Algorithms/Data Structures:**
- Advanced data structures in Rust
- Zero-copy techniques
- Lock-free structures
- Memory-efficient algorithms
- Performance benchmarking

**Systems engineering thinking:**
- Memory safety as a systems property
- Concurrency without data races
- Performance vs safety tradeoffs
- System design patterns in Rust

**Security concepts:**
- Memory safety and security
- Type system as security boundary
- Crypto libraries usage
- Secure coding patterns

**Open source:**
- Crate ecosystem contributions
- Documentation and test contributions
- Deeper code review habits
- Meaningful small contributions to production Rust projects

**Checkpoint deliverables:**
- One serious Rust project (deployed or published)
- One concurrency/safety assessment
- One comparative write-up: Java vs Go vs Rust tradeoffs
- Final public capstone (portfolio-quality)
- Technical presentation or demo
- Final scorecard assessment

---

## Cross-Cutting Themes

These appear throughout all phases:

### 1. AI-Assisted Engineering
- **Core:** Introduction to prompting, code generation, verification habits
- **Systems:** AI for debugging, code explanation, learning C
- **Java/Go/Rust:** AI for test generation, documentation, refactoring, code review assistance
- **Always:** Critical verification, spotting hallucinations, using AI as assistant not replacement

### 2. DevOps and Operations
- **Core:** Basic deployment, environment config, simple CI
- **Systems:** Build systems, debugging tools
- **Java:** Docker, CI/CD, database ops
- **Go:** Observability, cloud deployment, monitoring
- **Rust:** Production deployment, performance tuning, reliability

### 3. Security and Privacy
- **Core:** Input validation, basic auth concepts
- **Systems:** Memory safety basics
- **Java:** OWASP, auth/authz, secrets management
- **Go:** Secure service design
- **Rust:** Memory safety, type safety, crypto usage

### 4. Communication and Collaboration
- **Every phase:** Technical writing, documentation, code review, explaining tradeoffs, demos, retrospectives

### 5. Open Source
- **Progression:** Use libraries → Read source → Fix docs/tests → Bug fixes → Meaningful contributions → Maintain public work

### 6. Industry Awareness (Fintech anchor)
- **Java:** Transactions, ledgers, audit logs, compliance thinking
- **Go:** Internal platforms, reliability
- **Rust:** Performance-critical systems
- **General:** Data integrity, auditability, security, correctness

---

## Subjects Included

| Subject | Why Included | Where It Appears |
|---------|-------------|------------------|
| **Programming fundamentals** | Foundation for everything | Core |
| **TypeScript** | Modern frontend + backend, typed development | Core |
| **Python** | Fundamentals, scripting, AI tooling, interviews | Core |
| **SQL** | Essential for real software, data modeling | Core, used throughout |
| **Bash** | Terminal literacy, automation, systems confidence | Core, used throughout |
| **Git** | Version control, collaboration, professional workflow | Core, used throughout |
| **Web foundations** | HTTP, browsers, APIs, full-stack thinking | Core |
| **Database thinking** | Schema design, queries, transactions, indexing | Core, Java, Go, Rust |
| **Testing** | Quality, refactoring safety, professionalism | Core, then deeper each phase |
| **Debugging** | Independence, problem-solving, confidence | Every phase |
| **C** | Systems understanding, memory, low-level thinking | Systems |
| **Systems concepts** | Memory, processes, networking, OS, performance | Systems, applied in later phases |
| **Networking** | Internet fundamentals, debugging, service design | Core, Systems, Java, Go, Rust |
| **Algorithms/Data structures** | Problem-solving, performance, tradeoffs | Core, Systems, applied in later phases |
| **Java** | Enterprise backend, employability, typed OOP | Java phase |
| **Spring Boot** | Production backend framework | Java phase |
| **Go** | Services, concurrency, tooling, cloud/infra | Go phase |
| **Rust** | Safety, performance, modern systems thinking | Rust phase |
| **Docker** | Containerization, deployment | Java onwards |
| **CI/CD** | Automation, quality gates, delivery | Java onwards |
| **AWS** | Cloud literacy, production deployment | Core (light), Java/Go/Rust (deeper) |
| **Observability** | Logs, metrics, traces, debugging production | Go, Rust |
| **Security** | OWASP, auth, secrets, input validation, memory safety | Core, Java, Go, Rust |
| **AI-assisted engineering** | Leverage AI, verify outputs, modern workflow | Core onwards |
| **AI/ML basics** | Product integration, understanding models | Java, Go, Rust |
| **Communication** | Docs, explanations, collaboration, professionalism | Every phase |
| **Open source** | Real-world code, collaboration, contribution | Every phase |
| **Architecture/System design** | Scaling, reliability, tradeoffs, failure modes | Java, Go, Rust |
| **DevOps** | Delivery, operations, monitoring, incidents | Core (basics), Java/Go/Rust (deeper) |

---

## Monthly Rhythm

Every month follows the same pattern:

**Week 1:** Concepts and guided labs  
**Week 2:** Small implementations and exercises  
**Week 3:** Project build or feature extension  
**Week 4:** Code review, debugging assessment, write-up, and demo  

This rhythm:
- Makes growth visible
- Reduces teaching overhead
- Creates predictable milestones
- Builds professional habits

---

## Assessment Scorecard

Use the same scorecard throughout all phases:

1. **Correctness** - Does the software work reliably?
2. **Code quality** - Structure, readability, maintainability
3. **Testing quality** - Coverage, meaningful tests, edge cases
4. **Debugging ability** - Independence, tools usage, problem-solving
5. **Systems understanding** - Performance, tradeoffs, resource reasoning
6. **Deployment/operations** - Can deploy, monitor, troubleshoot
7. **Communication** - Docs, explanations, collaboration
8. **Professionalism** - Git usage, reviews, delivery habits

Students see improvement on these same dimensions across all 30 months.

---

## Quarterly Milestones

Every quarter (3 months) should produce:

1. One shipped artifact
2. One debugging evaluation
3. One code review score
4. One systems/design explanation
5. One technical write-up
6. One public proof of work (repo, PR, blog, demo)

This makes progress:
- Visible (portfolio grows)
- Measurable (scorecard + artifacts)
- Incremental (compare quarter to quarter)

---

## Project Ladder

Use repeated project shapes across the program so students can compare their growth:

1. CLI tool
2. CRUD/data application
3. API service
4. Auth-enabled application
5. Concurrent/background-job system
6. Observable deployable service
7. Capstone project
8. Open source contribution

Each language phase should include several of these shapes, with increasing engineering maturity.

---

## Standardized Tooling

Keep these stable across the program to reduce cognitive load:

- **Cloud:** AWS (with Vercel/Render/Fly.io early on)
- **Database:** PostgreSQL
- **Version control:** GitHub
- **CI/CD:** GitHub Actions
- **Containers:** Docker
- **Editor baseline:** VS Code
- **API testing:** curl, Postman
- **Observability:** Logs, metrics, health checks
- **AI tooling:** GitHub Copilot or similar, with verification discipline

---

## Materials Strategy

Use a balanced mix:

**30%** Structured reading
- Textbooks, official docs, language guides, fundamentals resources

**20%** Guided labs
- Short, focused exercises for each concept

**35%** Projects
- Build tasks, specs, real implementations

**15%** Review and debugging
- Code reading, broken code, performance problems, architecture critiques, open source exploration

### Recommended Material Types by Phase

**Core:**
- Python fundamentals book/course
- TypeScript handbook
- SQL practice platform
- Git/GitHub workflow guides
- MDN for web concepts
- API design resources
- Database design primer

**Systems:**
- C programming text
- Computer systems / systems programming resources
- Socket programming examples
- gdb/valgrind debugging material
- Operating systems primer
- Networking fundamentals

**Java:**
- Java language fundamentals
- Spring Boot official docs and guides
- JUnit and testing resources
- PostgreSQL documentation
- Clean architecture resources
- Backend service design examples

**Go:**
- Official Go tour and language docs
- Effective Go and Go proverbs
- Goroutines/channels practice
- API and CLI examples
- Observability guides (logs, metrics, traces)

**Rust:**
- The Rust Book
- Rust by Example
- Tokio/axum or similar async docs
- Performance and memory safety exercises
- Crate ecosystem documentation

---

## What Students Graduate With

After 30 months, each student should have:

1. **Portfolio:**
   - 15-20 substantial projects across multiple languages
   - Several deployed services
   - Open source contributions
   - Public repos with documentation

2. **Skills:**
   - Build software end-to-end
   - Debug across frontend, backend, database, systems layers
   - Read unfamiliar codebases and make safe changes
   - Use Git and collaborate professionally
   - Write tests for important behavior
   - Explain tradeoffs, not just copy solutions
   - Use AI critically for acceleration
   - Design simple systems that scale
   - Deploy and monitor production services

3. **Languages:**
   - TypeScript, Python, C, Java, Go, Rust, SQL, Bash

4. **Mindset:**
   - Disciplined learners
   - Competent builders
   - Clear thinkers
   - Adaptable engineers
   - Can keep growing independently

5. **Employability:**
   - Strong backend engineering skills
   - Production deployment experience
   - Open source contributions
   - Portfolio-quality capstones
   - Interview-ready technical communication

---

## Expected Weekly Time Commitment

- **Structured learning:** 8-10 hours
- **Project work:** 10-15 hours
- **Review/debugging/reading:** 5-8 hours
- **Total:** 25-30 hours per week

This is ambitious but sustainable for focused learners in their early 20s.

---

## Success Metrics

Students should be able to answer these at each phase checkpoint:

1. What can I build now that I could not build before?
2. What can I explain now that I could not explain before?
3. What can I debug now that I could not debug before?
4. What standards do I now follow automatically?
5. What is my next growth edge?

---

## Program Differentiation

This program is NOT:
- A bootcamp (too deep, too long)
- A CS degree (more practical, less theoretical)
- A certification track (focus on engineering, not credentials)
- Framework training (focus on fundamentals and adaptability)

This program IS:
- Deep engineering education
- Practical and production-oriented
- Balanced between theory and building
- Optimized for long-term career durability
- AI-aware but verification-disciplined
- Open source-friendly
- Industry-aware (fintech anchor)

---

## Teaching Philosophy

1. **Teach capabilities, not just topics**
   Focus on what students can do, not just what they know

2. **Build, debug, explain, improve**
   Every topic cycles through these four modes

3. **Verification before trust**
   Especially with AI-generated code and solutions

4. **Incremental, visible growth**
   Students should see their progress clearly

5. **Professional habits from day one**
   Git, testing, docs, reviews, communication

6. **Open source as reality, not special topic**
   Integrated throughout, not isolated module

7. **Depth over breadth in core areas**
   Better to know fewer things deeply than many things shallowly

8. **Industry context without industry lock-in**
   Real constraints, transferable skills

---

## Next Steps

To operationalize this blueprint:

1. **Quarter-by-quarter breakdown**
   - Detailed week-by-week plans for each phase
   - Specific project specs
   - Assessment rubric templates

2. **Materials procurement**
   - Textbooks and resources list
   - Lab exercises repository
   - Project specification library

3. **Assessment infrastructure**
   - Scorecard templates
   - Code review guidelines
   - Debugging practical designs

4. **Open source pipeline**
   - Curated repos for each phase
   - Contribution guidelines
   - Review process

5. **Student onboarding**
   - Prerequisites assessment
   - Learning expectations
   - Time commitment agreements

---

**Document Status:** Blueprint v1.0  
**Date:** 2026-05-12  
**Author:** OpenCode (with user collaboration)  
**Purpose:** Complete 30-month software engineering curriculum design
