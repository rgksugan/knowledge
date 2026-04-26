---
tags: non-fiction, technology
type: book
author: Martin Fowler
title: Patterns of Enterprise Application Architecture
sub-title:
---

# Patterns of Enterprise Application Architecture
by [[Martin Fowler]]

## Highlights
> But the hardest part of a layered architecture is deciding what layers to have and what the responsibility of each layer should be.

> Layers encapsulate some, but not all, things well. As a result you sometimes get cascading changes. The classic example of this in a layered enterprise application is adding a field that needs to display on the UI, must be in the database, and thus must be added to every layer in between.

> The primary responsibilities of the presentation layer are to display information to the user and to interpret commands from the user into actions upon the domain and data source.

> Presentation is an external interface for a service your system offers to someone else, whether it be a complex human or a simple remote program. Data source is the interface to things that are providing a service to you.

> The domain and data source should never be dependent on the presentation.

> An informal test I like is to imagine adding a radically different layer to an application, such as a command-line interface to a Web application. If there’s any functionality you have to duplicate in order to do this, that’s a sign of where domain logic has leaked into the presentation. Similarly, do you have to duplicate logic to replace a relational database with an XML file?

> Responsiveness is about how quickly the system acknowledges a request as opposed to processing it.

> Latency is the minimum time required to get any form of response, even if the work to be done is nonexistent.

> Load is a statement of how much stress a system is under, which might be measured in how many users are currently connected to it.

> Load is a statement of how much stress a system is under, which might be measured in how many users are currently connected to it. The load is usually a context for some other measurement, such as a response time. Thus, you may say that the response time for some request is 0.5 seconds with 10 users and 2 seconds with 20 users.

> Scalability is a measure of how adding resources (usually hardware) affects performance. A scalable system is one that allows you to add hardware and get a commensurate performance improvement, such as doubling how many servers you have to double your throughput. Vertical scalability, or scaling up, means adding more power to a single server, such as more memory. Horizontal scalability, or scaling out, means adding more servers.

> Efficiency is performance divided by resources. A system that gets 30 tps on two CPUs is more efficient than a system that gets 40 tps on four identical CPUs.

> When building enterprise systems, it often makes sense to build for hardware scalability rather than capacity or even efficiency.

