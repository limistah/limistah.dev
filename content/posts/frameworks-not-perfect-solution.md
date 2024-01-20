---
title: Frameworks - Not always the solution
date: 2019-05-15
tags: [Discuss]
---

Beginners do believe there is a perfect structure for setting up a project, experienced programmers know this is so far from the truth. A perfect structure is only perfect for a specific project, while project requirement varies across specifications, a perfect project setup varies across projects.

Looking further down project specifications, there are repeating patterns and procedures that make all the projects look like they are all doing the same thing. Create Read Update Delete (CRUD) was invented for this purpose, many applications are doing at least one of CRUD action, a tour around would reveal the truth about this.

Software development frameworks came as a result of abstracting the repeating patterns in applications. For PHP there is Laravel, Yii, CakePHP, Codeigniter, etc. NodeJS has a handful of its own from Sails, to Hapi to FeathersJS, and likes, even CSS is not excluded with Bootstrap and Foundation as examples of frameworks based on it.

Some application requires subtleness and fluidity that frameworks do not provide or provide too much of. An experience with writing a single about me web page does not demand the pulling of almighty Laravel. Same way, we can't generically think we could build a really large app with the setup provided by a framework.

While Development Framework is good, taking away the responsibility of having a section of our code being tested across use cases. We should not forget that the Framework could bloat or run out of use case for some project specifications. Sometimes, Frameworks provide too many details than we need or lesser than it we require.

As the goal of third-party applications is to reach the use case of a wider range of users. There is a good number of people that fall out and some do fall too deep into the use cases they have to provide. A good software delivery skill is being consciously aware of when to use frameworks and when to bootstrap a custom codebase specifically designed for the situation at hand.

Some frameworks fall too good that we tend to believe they can fit into all the use cases we can think of. This thinking obscures the fact that there is no size that fits all. If the specs are critically analyzed, we will find out that the application structure falls in one of:

- This is too little to go into a framework
- This fits perfectly into this/that Development Framework
- No, there is no known framework setup that can support this.

Before reaching a conclusion using the above points, there some preliminary questions that should be asked. Questions like:

- How much control does the core code require?
- Will there be frequent updates than the framework release timeline intervals?
- Can errors/bugs be looked over, is workaround allowed to be used
- Does the performance of the framework satisfy the application requirements?
- How knowledgable is the team/programmer handling the development?
- Could reported errors be delayed till the framework actually provide a fix?
- Does the software license provided by the framework not conflicts with the requirement of the project?

The questions above are just a generic overview, some projects will have their own specific requirements which will pose some more interesting questions to reach a conclusion about the use of third party code in the application development.

Frameworks are so good generally, but they are not always the perfect solution for some application development process. Take extreme caution when making a great decision for the base of an application.  Rewrites are never interesting, they look like walking past a previous stage in life, and humans do not like repeating a life's stage.

_Be guided!_