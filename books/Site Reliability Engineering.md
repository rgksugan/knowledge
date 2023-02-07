---
tags: 
type: book
---

# Site Reliability Engineering
by [[Betsy Beyer]]

## Table of Contents
* Introduction
* Principles
  * Embracing Risk
  * Service Level Objectives
  * Eliminating Toil
  * Monitoring Distributed Systems
  * The Evolution of Automation at Google
  * Release Engineering
  * Simplicity
* Practices
  * Practical Alerting from Time-Series Data
  * Being On-Call
  * Effective Troubleshooting
  * Emergency Response
  * Managing Incidents
  * Postmortem Culture
  * Tracking Outages
  * Testing for Reliability
  * Software Engineering in SRE
  * Load balancing at the Frontend
  * Load balancing in the Data center
  * Handling Overload
  * Addressing Cascading Failures
  * Managing Critical State
  * Distributed Periodic Scheduling with Cron
  * Data Processing Pipelines
  * Data Integrity
  * Reliable Product Launches at Scale

## Highlights
> Software engineering has this in common with having children: the labor before the birth is painful and difficult, but the labor after the birth is where you actually spend most of your effort. Yet software engineering as a discipline spends much more time talking about the first period as opposed to the second, despite estimates that 40–90% of the total costs of a system are incurred after birth.1 The popular industry model that conceives of deployed, operational software as being “stabilized” in production, and therefore needing much less attention from software engineers, is wrong. Through this lens, then, we see that if software engineering tends to focus on designing and building software systems, there must be another discipline that focuses on the whole lifecycle of software objects, from inception, through deployment and operation, refinement, and eventual peaceful decommissioning.

> 50–60% are Google Software Engineers, or more precisely, people who have been hired via the standard procedure for Google Software Engineers. The other 40–50% are candidates who were very close to the Google Software Engineering qualifications (i.e., 85–99% of the skill set required), and who in addition had a set of technical skills that is useful to SRE but is rare for most software engineers. By far, UNIX system internals and networking (Layer 1 to Layer 3) expertise are the two most common types of alternate technical skills we seek.

> In general, an SRE team is responsible for the availability, latency, performance, efficiency, change management, monitoring, emergency response, and capacity planning of their service(s).

> When they are focused on operations work, on average, SREs should receive a maximum of two events per 8–12-hour on-call shift. This target volume gives the on-call engineer enough time to handle the event accurately and quickly, clean up and restore normal service, and then conduct a postmortem. If more than two events occur regularly per on-call shift, problems can’t be investigated thoroughly and engineers are sufficiently overwhelmed to prevent them from learning from these events. A scenario of pager fatigue also won’t improve with scale. Conversely, if on-call SREs consistently receive fewer than one event per shift, keeping them on point is a waste of their time.


> Google caps operational work for SREs at 50% of their time. Their remaining time should be spent using their coding skills on project work.


## Bibliography
* [Work Rules](https://www.goodreads.com/book/show/22875447-work-rules)
* [The Mythical Man-Month](https://www.goodreads.com/book/show/13629.The_Mythical_Man_Month)
* [The Checklist Manifesto](https://www.goodreads.com/book/show/6667514-the-checklist-manifesto)
* [Continuous Delivery](https://www.goodreads.com/book/show/8686650-continuous-delivery)
* [Thinking, Fast and Slow](https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow)
* [Thinking in Systems](https://www.goodreads.com/book/show/3828902-thinking-in-systems)
* [Toyota Production System](https://www.goodreads.com/book/show/376237.Toyota_Production_System)
* [Wind, Sand and Stars](https://www.goodreads.com/book/show/8837.Wind_Sand_and_Stars)