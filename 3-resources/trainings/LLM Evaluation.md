# LLM Evaluation

## Introduction to LLM Evaluation
Metrics
    Qualitiative
    Quantitative
## Task-specific Evaluation
* LLM tasks
  * Natural Language Understanding (NLU)
    * Intent classification
    * Named Entity Recognition (NER)
    * Sentiment analysis
      * Goal
      * Metrics -> accuracy, precision, recall, F1 score
      * Benchmarks -> GLUE
  * Question Answering (QA)
    * Extractive -> is available in the book -> F1 score
    * Abstrative -> ROGUE, BERT Score
    * Open domain
      * Goal
      * Metrics
      * Benchmarks
  * Summarization
    * Extractive
    * Abstractive
  * Machine Translation
  * Code generation
  * Reasoning
  * Agentic Behavior
  * Custom tasks

## Evaluation Metrics
* Quantitative
  * Mostly needs labeled dataset
  * Examples: Accuracy, F1, Perplexity, BLEU, ROGUE, BERT etc
  * BLEU
    * Bilinigual Evaluation Understudy
  * Two types
    * Statistical
      * F1, Precision, recall, accuracy, perplexity, hit rate
    * Model based
      * BERT scroe, MoverScore
      * GPTScore, SelfCheckGPT, QAG Score, LLM based BLEU/ROGUE
      * NLI, BLEURT
* Qualitiative
  * Fluency, relevance, coherence

## Evaluation Methods and Resources
## Common Pitfalls and Best Practices

## Abbreviations
* RAG - Retrieval Augmented Generation
* BLEU - BiLinigual Evaluation Understudy
* NER - Named Entity Recognition
* QA - Quesiton Answering
* GLUE - General Language Understanding Evaluation
* NLI - Natural Language Interference
* MBPP - Mostly Basic Python Problems
* APPS - Automated Programming Progress Standard
* MRR - Mean Reciprocal Rank
* NDCG - Nomalized Discounted Cumulative Gain
* AST - Abstract Syntax Trees
