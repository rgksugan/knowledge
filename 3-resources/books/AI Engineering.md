---
tags: non-fiction
type: book
author: Chip Huyen
title: AI Engineering
sub-title: Building Applications with Foundation Models
---

# AI Engineering
by [[Chip Huyen]]

## Highlights
> Evaluation is one of the hardest, if not the hardest, challenges of AI engineering.

## Contents

## The Book in 3 Sentences

## Who Should Read It?

## My Top 3 Quotes

## Notes
* Lindy’s Law
* Given a query, the quality of a model’s response depends on the following aspects (outside of the model’s generation setting):
  * The instructions for how the model should behave.
  * The context the model can use to respond to the query.
  * The model itself.
### Introduction to Building AI Applications with Foundation Models
#### The Rise of AI Engineering
##### From Language Models to Large Language Models
* The process of breaking the original text into tokens is called tokenization.
* There are two main types of language models:
  * Masked language models
    * Masked language models are commonly used for non-generative tasks such as sentiment analysis and text classification. They are also useful for tasks requiring an understanding of the overall context, such as code debugging, where a model needs to understand both the preceding and following code to identify errors.
  * Autoregressive language models.
<img style="display: block; margin-left: auto; margin-right: auto; width: 80%;" src="../../assets/images/ai-engineering/masked vs autoregressive.png" alt="Masked vs Autoregressive LM" />

* The outputs of language models are open-ended. A language model can use its fixed, finite vocabulary to construct infinite possible outputs. A model that can generate open-ended outputs is called generative, hence the term generative AI.
* It’s important to note that completions are predictions, based on probabilities, and not guaranteed to be correct. This probabilistic nature of language models makes them both so exciting and frustrating to use.
* While completion is powerful, completion isn’t the same as engaging in a conversation.
* Language modeling is just one of many ML algorithms. There are also models for object detection, topic modeling, recommender systems, weather forecasting, stock price prediction, etc.
* The answer is that language models can be trained using self-supervision, while many other models require supervision. Supervision refers to the process of training ML algorithms using labeled data, which can be expensive and slow to obtain. Self-supervision helps overcome this data labeling bottleneck to create larger datasets for models to learn from, effectively allowing models to scale up.
* A drawback of supervision is that data labeling is expensive and time-consuming.
* Self-supervision differs from unsupervision. In self-supervised learning, labels are inferred from the input data. In unsupervised learning, you don’t need labels at all.

##### From Large Language Models to Foundation Models
* A model that can work with more than one data modality is also called a multimodal model.
<img style="display: block; margin-left: auto; margin-right: auto; width: 80%;" src="../../assets/images/ai-engineering/multi-modal-model.png" alt="Multi modal model" />

* Foundation models also mark the transition from task-specific models to general-purpose models. Previously, models were often developed for specific tasks, such as sentiment analysis or translation. A model trained for sentiment analysis wouldn’t be able to do translation, and vice versa.
* Prompt engineering, RAG, and finetuning are three very common AI engineering techniques that you can use to adapt a model to your needs.

##### From Foundation Models to AI Engineering
* AI engineering refers to the process of building applications on top of foundation models.

#### Foundation Model Use Cases

## Bibliography
