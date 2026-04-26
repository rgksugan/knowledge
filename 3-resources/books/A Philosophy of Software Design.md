---
tags: non-fiction, technology
type: book
author: John Ousterhout
title: A Philosophy of Software Design
sub-title:
---

# A Philosophy of Software Design
by [[John Ousterhout]]

## Highlights
> Complexity is anything related to the structure of a software system that makes it hard to understand and modify the system.

> Complexity can take many forms. For example, it might be hard to understand how a piece of code works; it might take a lot of effort to implement a small improvement, or it might not be clear which parts of the system must be modified to make the improvement; it might be difficult to fix one bug without introducing another. If a software system is hard to understand and modify, then it is complicated; if it is easy to understand and modify, then it is simple.

> You can also think of complexity in terms of cost and benefit. In a complex system, it takes a lot of work to implement even small improvements. In a simple system, larger improvements can be implemented with less effort.

> Complexity is more apparent to readers than writers. If you write a piece of code and it seems simple to you, but other people think it is complex, then it is complex.

> Your job as a developer is not just to create code that you can work with easily, but to create code that others can also work with easily.

> Change amplification: The first symptom of complexity is that a seemingly simple change requires code modifications in many different places.

> One of the goals of good design is to reduce the amount of code that is affected by each design decision, so design changes don’t require very many code modifications.

> Cognitive load: The second symptom of complexity is cognitive load, which refers to how much a developer needs to know in order to complete a task. A higher cognitive load means that developers have to spend more time learning the required information, and there is a greater risk of bugs because they have missed something important.

> Unknown unknowns: The third symptom of complexity is that it is not obvious which pieces of code must be modified to complete a task, or what information a developer must have to carry out the task successfully.

> One of the most important goals of good design is for a system to be obvious.

> Complexity is caused by two things: dependencies and obscurity.

> Complexity isn’t caused by a single catastrophic error; it accumulates in lots of small chunks. A single dependency or obscurity, by itself, is unlikely to affect significantly the maintainability of a software system. Complexity comes about because hundreds or thousands of small dependencies and obscurities build up over time. Eventually, there are so many of these small issues that every possible change to the system is affected by several of them.

> The incremental nature of complexity makes it hard to control. It’s easy to convince yourself that a little bit of complexity introduced by your current change is no big deal. However, if every developer takes this approach for every change, complexity accumulates rapidly. Once complexity has accumulated, it is hard to eliminate, since fixing a single dependency or obscurity will not, by itself, make a big difference.

> The best modules are those whose interfaces are much simpler than their implementations.

> An abstraction is a simplified view of an entity, which omits unimportant details. Abstractions are useful because they make it easier for us to think about and manipulate complex things.

> The best modules are those that provide powerful functionality yet have simple interfaces.

> Information leakage occurs when a design decision is reflected in multiple modules. This creates a dependency between the modules: any change to that design decision will require changes to all of the involved modules.

> Information leakage occurs when a design decision is reflected in multiple modules. This creates a dependency between the modules: any change to that design decision will require changes to all of the involved modules. If a piece of information is reflected in the interface for a module, then by definition it has been leaked; thus, simpler interfaces tend to correlate with better information hiding.

> A dispatcher is a method that uses its arguments to select one of several other methods to invoke; then it passes most or all of its arguments to the chosen method.

> You shouldn’t break up a method unless it makes the overall system simpler;

> Long methods aren’t always bad. For example, suppose a method contains five 20-line blocks of code that are executed in order. If the blocks are relatively independent, then the method can be read and understood one block at a time; there’s not much benefit in moving each of the blocks into a separate method.

> Splitting up a method only makes sense if it results in cleaner abstractions, overall.

> If two pieces of code are physically separated, but each can only be understood by looking at the other, that is a red flag.

> The decision to split or join modules should be based on complexity. Pick the structure that results in the best information hiding, the fewest dependencies, and the deepest interfaces.

> Overall, the best way to reduce bugs is to make software simpler.

> Special cases of any form make code harder to understand and increase the likelihood of bugs.

> The design of large software systems falls in this category: no-one is good enough to get it right with their first try.

> If users must read the code of a method in order to use it, then there is no abstraction.

> Change amplification: a seemingly simple change requires code modifications in many places.

> Cognitive load: in order to make a change, the developer must accumulate a large amount of information.

> Unknown unknowns: it is unclear what code needs to be modified, or what information must be considered in order to make those modifications.

> Comments augment the code by providing information at a different level of detail.

> Whenever you modify any code, try to find a way to improve the system design at least a little bit in the process. If you’re not making the design better, you are probably making it worse.

> Obscurity occurs when important information about a system is not obvious to new developers. The solution to the obscurity problem is to write code in a way that makes it obvious;

> If code is obvious, it means that someone can read the code quickly, without much thought, and their first guesses about the behavior or meaning of the code will be correct.

> If code is not obvious, then a reader must expend a lot of time and energy to understand it. Not only does this reduce their efficiency, but it also increases the likelihood of misunderstanding and bugs.

> Dealing with complexity is the most important challenge in software design.


## Contents

## The Book in 3 Sentences

## Who Should Read It?

## My Top 3 Quotes

## Abbreviations

## Characters

## Bibliography
