---
tags: non-fiction
type: book
---

# Patterns of Enterprise Application Architecture
by [[Martin Fowler]]

## Notes
### 0. Introduction
   
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

### 2. 

## Bibliography
* [[A Pattern Language]]
* [Extreme Programming Explained](./Extreme%20Programming%20Explained.md)
* [[Test-Driven Development]]
* [[Domain-Driven Design]]
* [[Refactoring]]
* [[Design Patterns]]

