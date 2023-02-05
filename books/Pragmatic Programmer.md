---
tags: non-fiction
title: Pragmatic Programmer
type: book
---

# The Pragmatic Programmer: Your journey to mastery
by [Andy Hunt](https://www.goodreads.com/author/show/2815.Andy_Hunt), [Dave Thomas](https://www.goodreads.com/author/show/13.Dave_Thomas)

## Highlights
> What distinguishes Pragmatic Programmers? We feel it’s an attitude, a style, a philosophy of approaching problems and their solutions. They think beyond the immediate problem, placing it in its larger context and seeking out the bigger picture.

> When you find yourself saying, “I don’t know,” be sure to follow it up with “—but I’ll find out.” It’s a great way to admit what you don’t know, but then take responsibility like a pro.

> While there’s a glut of short-form essays and occasionally reliable answers on the web, for deep understanding you need long-form books. Browse the booksellers for technical books on interesting topics related to your current project. Once you’re in the habit, read a book a month. After you’ve mastered the technologies you’re currently using, branch out and study some that don’t relate to your project.

> A thing is well designed if it adapts to the people who use it. For code, that means it must adapt by changing. So we believe in the ETC principle: `Easier to Change`. ETC. That’s it.

> Giving a computer two contradictory pieces of knowledge was Captain James T. Kirk’s preferred way of disabling a marauding artificial intelligence. Unfortunately, the same principle can be effective in bringing down your code.

> Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

> #DRY is about the duplication of knowledge, of intent. It’s about expressing the same thing in two different places, possibly in two totally different ways.

> Two or more things are orthogonal if changes in one do not affect any of the others. In a well-designed system, the database code will be orthogonal to the user interface: you can change the interface without affecting the database, and swap databases without changing the interface.

> When components are isolated from one another, you know that you can change one without having to worry about the rest. As long as you don’t change that component’s external interfaces, you can be confident that you won’t cause problems that ripple through the entire system.

> If you need to change an object’s state, get the object to do it for you. This way your code remains isolated from the other code’s implementation and increases the chances that you’ll remain orthogonal.

> Every time your code references global data, it ties itself into the other components that share that data.

> In general, your code is easier to understand and maintain if you explicitly pass any required context into your modules. In object-oriented applications, context is often passed as parameters to objects’ constructors. In other code, you can create structures containing the context and pass around references to them.

> Writing unit tests is itself an interesting test of orthogonality. What does it take to get a unit test to build and run? Do you have to import a large percentage of the rest of the system’s code? If so, you’ve found a module that is not well decoupled from the rest of the system.

> What to Say When Asked for an Estimate You say “I’ll get back to you.”

> When in doubt, it always pays to reduce scope.

> All programs transform data, converting an input into an output. And yet when we think about design, we rarely think about creating transformations. Instead we worry about classes and modules, data structures and algorithms, languages and frameworks.

> Concurrency is when the execution of two or more pieces of code act as if they run at the same time. Parallelism is when they do run at the same time.

> There are also code invariants, things that remain true about some piece of state when it’s passed through a function. For example, if you sort a list, the result will have the same number of elements as the original—the length is invariant.

> That’s where we programmers come in. Our job is to help people understand what they want. In fact, that’s probably our most valuable attribute.

> As soon as you start discussing requirements, users and domain experts will use certain terms that have specific meaning to them. They may differentiate between a “client” and a “customer,” for example. It would then be inappropriate to use either word casually in the system. Create and maintain a project glossary—one place that defines all the specific terms and vocabulary used in a project.

> It’s hard to succeed on a project if users and developers call the same thing by different names or, even worse, refer to different things by the same name.

> The inherent peer-pressure of a second person helps against moments of weakness and bad habits of naming variables foo and such. You’re less inclined to take a potentially embarrassing shortcut when someone is actively watching, which also results in higher-quality software.

> Criticize the code, not the person. “Let’s look at this block” sounds much better than “you’re wrong.”

> 1. Work out where you are.
> 2. Make the smallest meaningful step towards where you want to be.
> 3. Evaluate where you end up, and fix anything you broke.

## Bibliography
* [The Mythical Man-Month](https://www.goodreads.com/book/show/13629.The_Mythical_Man_Month) by [Frederick P. Brooks Jr.](https://www.goodreads.com/author/show/3174788.Frederick_P_Brooks_Jr_)
* [The Gift of Fear](https://www.goodreads.com/book/show/56465.The_Gift_of_Fear) by [Gavin de Becker](https://www.goodreads.com/author/show/31933.Gavin_de_Becker)
* [Peopleware](https://www.goodreads.com/book/show/67825.Peopleware) by [Tom DeMarco](https://www.goodreads.com/author/show/38238.Tom_DeMarco), [Timothy R. Lister](https://www.goodreads.com/author/show/38237.Timothy_R_Lister)
* [Refactoring](https://www.goodreads.com/book/show/44936.Refactoring) by [Martin Fowler](https://www.goodreads.com/author/show/25215.Martin_Fowler)
* [Design Patterns](https://www.goodreads.com/book/show/85009.Design_Patterns) by [Grady Booch](https://www.goodreads.com/author/show/32713.Grady_Booch), [Erich Gamma](https://www.goodreads.com/author/show/48622.Erich_Gamma), [Richard Helm](https://www.goodreads.com/author/show/48619.Richard_Helm), [Ralph Johnson](https://www.goodreads.com/author/show/48620.Ralph_Johnson), [John Vlissides](https://www.goodreads.com/author/show/48621.John_Vlissides)
* [Pragmatic Thinking and Learning](https://www.goodreads.com/book/show/3063393-pragmatic-thinking-and-learning), [Andy Hunt](https://www.goodreads.com/author/show/2815.Andy_Hunt)
* [The Practice of Programming](https://www.goodreads.com/book/show/1032758.The_Practice_of_Programming) by [Rob Pike](https://www.goodreads.com/author/show/193420.Rob_Pike)
* [Algorithms](https://www.goodreads.com/book/show/10803540-algorithms) by [Robert Sedgewick](https://www.goodreads.com/author/show/15721.Robert_Sedgewick), [Kevin Wayne](https://www.goodreads.com/author/show/4699621.Kevin_Wayne)