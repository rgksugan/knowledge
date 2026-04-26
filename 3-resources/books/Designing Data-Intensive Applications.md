---
tags: non-fiction, technology
type: book
author: Martin Kleppmann
title: Designing Data-Intensive Applications
sub-title: The big ideas behind reliable, scalable and maintainable systems
---

# Designing Data-Intensive Applications
by [[Martin Kleppmann]]

## Highlights
> The Internet was done so well that most people think of it as a natural resource like the Pacific Ocean, rather than something that was man-made. When was the last time a technology with a scale like that was so error-free?

> Many applications today are data-intensive, as opposed to compute-intensive. Raw CPU power is rarely a limiting factor for these applications—bigger problems are usually the amount of data, the complexity of data, and the speed at which it is changing.

> This is an important trade-off in storage systems: well-chosen indexes speed up read queries, but every index slows down writes. For this reason, databases don't usually index everything by default, but require you—the application developer or database administrator—to choose indexes manually, using your knowledge of the application's typical query patterns. You can then choose the indexes that give your application the greatest benefit, without introducing more overhead than necessary.

> Compaction means throwing away duplicate keys in the log, and keeping only the most recent update for each key.

> Unfortunately, if an application reads from an asynchronous follower, it may see outdated information if the follower has fallen behind. This leads to apparent inconsistencies in the database: if you run the same query on the leader and a follower at the same time, you may get different results, because not all writes have been reflected in the follower. This inconsistency is just a temporary state—if you stop writing to the database and wait a while, the followers will eventually catch up and become consistent with the leader. For that reason, this effect is known as eventual consistency

> One way of achieving monotonic reads is to make sure that each user always makes their reads from the same replica (different users can read from different replicas). For example, the replica can be chosen based on a hash of the user ID, rather than randomly. However, if that replica fails, the user's queries will need to be rerouted to another replica.

> When working with an eventually consistent system, it is worth thinking about how the application behaves if the replication lag increases to several minutes or even hours. If the answer is "no problem," that's great. However, if the result is a bad experience for users, it's important to design the system to provide a stronger guarantee, such as read-after-write. Pretending that replication is synchronous when in fact it is asynchronous is a recipe for problems down the line.

> As the most appropriate way of resolving a conflict may depend on the application, most multi-leader replication tools let you write conflict resolution logic using application code. That code may be executed on write or on read: On write As soon as the database system detects a conflict in the log of replicated changes, it calls the conflict handler. For example, Bucardo allows you to write a snippet of Perl for this purpose. This handler typically cannot prompt a user—it runs in a background process and it must execute quickly. On read When a conflict is detected, all the conflicting writes are stored. The next time the data is read, these multiple versions of the data are returned to the application. The application may prompt the user or automatically resolve the conflict, and write the result back to the database. CouchDB works this way, for example.

## Contents
### Part 1: Foundations of Data Systems
#### Reliable, Scalable & Maintainable Applications
* Mostly all applications are built with standard building blocks. These building blocks are
    * database
    * cache (to store the result of an expensive operation)
    * search index (search by keyword or filter)
    * stream processing (asynchronus messages)
    * batch processing (periodically crunch large data)
  * And these different blocks are stitched together through application code
* There are many factors that may influence the design of a data system
  * skills and experience of the people involved
  * legacy system dependencies
  * time scale for delivery
  * regulatory constraints

## Notes

## The Book in 3 Sentences

## Who Should Read It?

## My Top 3 Quotes

## Bibliography
* [[Patterns of Enterprise Application Architecture]]
* The Mythical Man-Month

[Patterns of Enterprise Application Architecture]: <Patterns of Enterprise Application Architecture> "Patterns of Enterprise Application Architecture"