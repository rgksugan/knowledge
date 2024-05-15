---
tags: non-fiction
type: book
---

# Patterns of Enterprise Application Architecture
by [[Martin Fowler]]

## Notes
### 0. Introduction
#### Architecture
* Architecture is subjective and is a shared understanding of a system’s design by the expert developers on a project.
* It’s also about decisions, in that it’s the decisions that developers wish they could get right early on because they’re perceived as hard to change. The subjectivity comes in here as well because, if you find that something is easier to change than you once thought, then it’s no longer architectural. In the end architecture boils down to the important stuff—whatever that is.

#### Enterprise Applications
* In some ways enterprise applications are much easier than telecoms software—we don’t have very hard multithreading problems, and we don’t have hardware and software integration.
* Enterprise applications usually involve
  * persistent data
  * a lot of data
  * access data concurrently
  * a lot of user interface screens
  * integration with other enterprise applications
  * conceptual dissonance
  * complex business illogic

#### Thinking about performance
* Many architectural decisions are about performance.
* Scalability is a measure of how adding resources (usually hardware) affects performance. A scalable system is one that allows you to add hardware and get a commensurate performance improvement, such as doubling how many servers you have to double your throughput. Vertical scalability, or scaling up, means adding more power to a single server, such as more memory. Horizontal scalability, or scaling out, means adding more servers.
* Adding more servers is often cheaper than adding more programmers—providing that a system is scalable.


### 1. Layering
One of the well known layering architecture is the Network OSI model.
<img style="display: block; margin-left: auto; margin-right: auto;" src="../../assets/images/101osi.png" alt="OSI network model" />


#### Pros and cons of Layer Architecture
##### Pros:
* You can understand a single layer as a coherent whole without knowing much about the other layers. You can understand how to build an FTP service on top of TCP without knowing the details of how ethernet works.
* You can substitute layers with alternative implementations of the same basic services. An FTP service can run without change over ethernet, PPP, or whatever a cable company uses.
* You minimize dependencies between layers. If the cable company changes its physical transmission system, providing they make IP work, we don’t have to alter our FTP service.
* Layers make good places for standardization. TCP and IP are standards because they define how their layers should operate.
* Once you have a layer built, you can use it for many higher-level services. Thus, TCP/IP is used by FTP, telnet, SSH, and HTTP. Otherwise, all of these higher-level protocols would have to write their own lower-level protocols.

##### Cons:
* Layers encapsulate some, but not all, things well. As a result you sometimes get cascading changes. The classic example of this in a layered enterprise application is adding a field that needs to display on the UI, must be in the database, and thus must be added to every layer in between.
* Extra layers can harm performance. At every layer things typically need to be transformed from one representation to another. However, the encapsulation of an underlying function often gives you efficiency gains that more than compensate. A layer that controls transactions can be optimized and will then make everything faster.

#### The Three Principal layers of Enterprise Applications
* Presentation
* Domain (Business logic)
* Data source

### 2. Organizing Domain Logic
* Transaction Script
* Domain Model
* Table Module

## Bibliography
* [[A Pattern Language]]
* [Extreme Programming Explained](./Extreme%20Programming%20Explained.md)
* [[Test-Driven Development]]
* [[Domain-Driven Design]]
* [[Refactoring]]
* [[Design Patterns]]

