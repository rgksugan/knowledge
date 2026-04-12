---
tags: non-fiction
type: book
author: Niall Richard Murphy, Betsy Beyer, Chris Jones, Jennifer Petoff
title: Site Reliability Engineering
sub-title: How Google Runs Production Systems
---

# Site Reliability Engineering
by [[Niall Richard Murphy]], [[Betsy Beyer]], [[Chris Jones]], [[Jennifer Petoff]]

## Highlights
> In general, for any software service or system, 100% is not the right reliability target because no user can tell the difference between a system being 100% available and 99.999% available. There are many other systems in the path between user and service (their laptop, their home WiFi, their ISP, the power grid…) and those systems collectively are far less than 99.999% available. Thus, the marginal difference between 99.999% and 100% gets lost in the noise of other unavailability, and the user receives no benefit from the enormous effort required to add that last 0.001% of availability.

> Monitoring is one of the primary means by which service owners keep track of a system’s health and availability.

> User-facing serving systems, such as the Shakespeare search frontends, generally care about availability, latency, and throughput. In other words: Could we respond to the request? How long did it take to respond? How many requests could be handled?

> Storage systems often emphasize latency, availability, and durability. In other words: How long does it take to read or write data? Can we access the data on demand? Is the data still there when we need it?

> Big data systems, such as data processing pipelines, tend to care about throughput and end-to-end latency. In other words: How much data is being processed? How long does it take the data to progress from ingestion to completion? (Some pipelines may also have targets for latency on individual processing stages.)

> Many indicator metrics are most naturally gathered on the server side, using a monitoring system such as Borgmon (see Chapter 10) or Prometheus, or with periodic log analysis — for instance, HTTP 500 responses as a fraction of all requests. However, some systems should be instrumented with client-side collection, because not measuring behavior at the client can miss a range of problems that affect users but don’t affect server-side metrics. For example, concentrating on the response latency of the Shakespeare search backend might miss poor user latency due to problems with the page’s JavaScript: in this case, measuring how long it takes for a page to become usable in the browser is a better proxy for what the user actually experiences.

> Start by thinking about (or finding out!) what your users care about, not what you can measure. Often, what your users care about is difficult or impossible to measure, so you’ll end up approximating users’ needs in some way. However, if you simply start with what’s easy to measure, you’ll end up with less useful SLOs.

> These questions reflect a fundamental philosophy on pages and pagers: Every time the pager goes off, I should be able to react with a sense of urgency. I can only react with a sense of urgency a few times a day before I become fatigued.

> These questions reflect a fundamental philosophy on pages and pagers: Every time the pager goes off, I should be able to react with a sense of urgency. I can only react with a sense of urgency a few times a day before I become fatigued.  Every page should be actionable.  Every page response should require intelligence. If a page merely merits a robotic response, it shouldn’t be a page.  Pages should be about a novel problem or an event that hasn’t been seen before.

> The four golden signals of monitoring are latency, traffic, errors, and saturation. If you can only measure four metrics of your user-facing system, focus on these four.

> The later in the product lifecycle a problem is discovered, the more expensive it is to fix.

> In the industry, automation is the term generally used for writing code to solve a wide variety of problems, although the motivations for writing this code, and the solutions themselves, are often quite different. More broadly, in this view, automation is “meta-software” — software to act on software.

> An unreviewed postmortem might as well never have existed. To ensure that each completed draft is reviewed, we encourage regular review sessions for postmortems. In these meetings, it is important to close out any ongoing discussions and comments, to capture ideas, and to finalize the state.

> Once the initial review is complete, the postmortem is shared more broadly, typically with the larger engineering team or on an internal mailing list. Our goal is to share postmortems to the widest possible audience that would benefit from the knowledge or lessons imparted.

> In the spirit of nurturing the postmortem culture, SREs proactively create activities that disseminate what we learn about system infrastructure. Some example activities include: Postmortem of the month In a monthly newsletter, an interesting and well-written postmortem is shared with the entire organization.

> In the spirit of nurturing the postmortem culture, SREs proactively create activities that disseminate what we learn about system infrastructure. Some example activities include: Postmortem of the month In a monthly newsletter, an interesting and well-written postmortem is shared with the entire organization. Google+ postmortem group This group shares and discusses internal and external postmortems, best practices, and commentary about postmortems. Postmortem reading clubs Teams host regular postmortem reading clubs, in which an interesting or impactful postmortem is brought to the table (along with some tasty refreshments) for an open dialogue with participants, nonparticipants, and new Googlers about what happened, what lessons the incident imparted, and the aftermath of the incident. Often, the postmortem being reviewed is months or years old! Wheel of Misfortune New SREs are often treated to the Wheel of Misfortune exercise (see “Disaster Role Playing”), in which a previous postmortem is reenacted with a cast of engineers playing roles as laid out in the postmortem. The original incident commander attends to help make the experience as “real” as possible.

> One key responsibility of Site Reliability Engineers is to quantify confidence in the systems they maintain.

> Passing a test or a series of tests doesn’t necessarily prove reliability. However, tests that are failing generally prove the absence of reliability.

> Remember that not all software is created equal. Life-critical or revenue-critical systems demand substantially higher levels of test quality and coverage than a non-production script with a short shelf life.

> Don’t wait for the perfect design; rather, keep the overall vision in mind while moving ahead with design and development. When you encounter areas of uncertainty, design the software to be flexible enough so that if process or strategy changes at a higher level, you don’t incur a huge rework cost.

> In order to limit your distractibility, you should try to minimize context switches. Some interrupts are inevitable. However, viewing an engineer as an interruptible unit of work, whose context switches are free, is suboptimal if you want people to be happy and productive. Assign a cost to context switches. A 20-minute interruption while working on a project entails two context switches; realistically, this interruption results in a loss of a couple hours of truly productive work.

> Polarizing time means that when a person comes into work each day, they should know if they’re doing just project work or just interrupts. Polarizing their time in this way means they get to concentrate for longer periods of time on the task at hand. They don’t get stressed out because they’re being roped into tasks that drag them away from the work they’re supposed to be doing.

> A person should never be expected to be on-call and also make progress on projects (or anything else with a high context switching cost).

> People might ignore problems for months at a time because they believe the new solution that’s on the horizon obviates temporary fixes.

> Such alerts are frequently triaged as transient, but still distract your teammates from fixing real problems. Either investigate such alerts fully, or fix the alerting rules.


## Contents

## The Book in 3 Sentences

## Who Should Read It?

## My Top 3 Quotes

## Abbreviations

## Characters

## Bibliography
