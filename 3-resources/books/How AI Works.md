---
tags: non-fiction
type: book
author: Ronald T. Kneusel
title: How AI Works
sub-title: From Sorcery to Science
---

# How AI Works
by [[Ronald T. Kneusel]]

## Highlights
> AI is a largely empirical science.

> The primary goal of machine learning is to condition a model using known data so that the model produces meaningful output when given unknown data.

> Decision trees are among the few model types that readily explain themselves.

> Correlation is when two things are linked so that the occurrence of one implies the occurrence of the other, often in a particular order. More concretely, correlation measures how strongly a change in one thing is associated with a change in another.

> A rooster crows, and the sun comes up. The two events are time-dependent: the rooster first, then the sun. This correlation does not imply causation, as the rooster crowing doesn’t cause the sun to rise, but if such a correlation is observed often enough, the human mind begins to see one as causing the other, even when there is no real evidence of this. Why humans act this way isn’t hard to understand. Evolution favored early humans who made such associations because, sometimes, the associations led to behavior beneficial for survival.

> Correlation does not imply causation.

> AI lives and dies by data and is only as good as the data we feed to it.

## Contents
### And Away We Go: An AI Overview
* A machine learning model is a black box that accepts an input, usually a collection of numbers, and produces an output, typically a label like “dog” or “cat,” or a continuous value like the probability of being a “dog” or the value of a house with the characteristics given to the model (size, number of bathrooms, ZIP code, and so on).
* Training implies that we have a collection of inputs, and the outputs the model should produce when given those inputs. At first blush, this seems a bit silly; why do we want the model to give us an output we already have? The answer is that we will, at some future point, have inputs for which we don’t already have the output. This is the entire point of making the model: to use it with unknown inputs and to believe the model when it gives us an output.
* Training uses the collection of known inputs and outputs to adjust the model’s parameters to minimize mistakes. If we can do that, we begin to believe the model’s outputs when given new, unknown inputs.
* Training a model is fundamentally different from programming. In programming, we implement the algorithm we want by instructing the computer step by step. In training, we use data to teach the model to adjust its parameters to produce correct output. There is no programming because, most of the time, we have no idea what the algorithm should be. We only know or believe a relationship exists between the inputs and the desired outputs. We hope a model can approximate that relationship well enough to be useful.
* Since we’re using known labeled data to train the model, this approach is called supervised learning: we supervise the model while it learns to produce correct output.
* A vector is a string of numbers treated as a single entity. For example, the four measurements of each iris flower mean we can represent the flower as a string of four numbers, say, (4.5, 2.3, 1.3, 0.3). The flower described by this vector has a sepal length of 4.5 cm, sepal width of 2.3 cm, petal length of 1.3 cm, and petal width of 0.3 cm. By grouping these measurements together, we can refer to them as a single entity.
* Vectors are strings of numbers often representing measurements in a dataset.
* Matrices are two-dimensional arrays of numbers often representing datasets (stacks of vectors).
* The neural networks behind modern AI are not so transparent.
* Confusion matrices are the most common way to evaluate a model because they show how it behaves on the test data.
* Interpolation approximates within the range of known data, and extrapolation goes beyond known data.
* Interpolation good. Extrapolation bad.
* Bad datassets leads to bad models; good datasets lead to good models.
* Confusion matrices are the most common way to evaluate a model because they show how it behaves on the test data.
* Interpolation approximates within the range of known data, and extrapolation goes beyond known data.
* Because models learn from data, we must use datasets that are as complete as possible so our models interpolate and do not extrapolate.
* There are many types of AI models, and this chapter introduced two: decision trees and neural networks.
* Proper development of machine learning models means we must have a test set, a collection of known input and output pairs that we do not use when training. We use this set after training to evaluate the model. If the dataset is constructed correctly, the test set provides an idea of how well we can expect the model to perform in the wild.
* Because AI is only as good as the data fed to it, it’s on us to make datasets fair and unbiased and to understand what the AI has truly learned without assumptions.

## The Book in 3 Sentences

## Who Should Read It?
Anyone who wants to understand Artificial Engineering and Machine Learning.

## My Top 3 Quotes

## Bibliography
* Cautionary Tales for Children
