# Prompt Structure

## Prompt Elements

1. **Instruction specifying general behavior**: Assigning a persona or defining a general context.
2. **Description of the task being performed**: Precise definition of the task and expected result.
3. **Additional context**: Useful information for solving the task.
4. **Examples of the target result**: Showcasing expected results and pairs in the form of "data set - answer."
5. **Question or data set**: The target question, message, or set of information on which the action is to be performed.

## Useful phrases for TextExpander

- `return X and nothing more.`: Obtaining a message without additional commentary.
- `answer as truthfully as possible`: Answering based on context and nothing more. In the absence of information in the context, say `I don't know`.
- `Act as X`: Pretending that the model is someone else. Helpful in narrowing the context of the discussion.
- `skip explanation.`: Avoiding detailed explanation, allowing for token savings and shortening response time.
- `Your only job is to...`: Emphasizing the need to perform the task. Can be used in conjunction with `return responses in JSON format and nothing more.`

# Machine learning methods

## Zero-Shot Learning

- **Definition**: The model learns to recognize objects for which it has not been trained before.
- **Key features**: No training data for new classes, use of existing knowledge, generalization based on relationships between classes.
- **Application examples**: Image recognition, text analysis, object classification.

## One-Shot Learning

- **Definition**: The model learns to recognize objects based on one or very few examples.
- **Key features**: Little training data for new classes, use of existing knowledge, generalization based on a small number of examples.
- **Application examples**: Handwriting recognition, speech recognition, classification of objects with a small amount of data.

```
        Act as a highly skilled and detailed copywriter who creates persuasive content. 
        Respond only in Polish. Provide answers in the format shown in the example below. 
        Each element in the array should be a string with at least three sentences.
        
        ###Example:
        
        User: Please provide information on topic X, chapters: Title 1, Title 2, Title N
        System: [
        "Respond to Title 1 without repeating the title. Sentence two. Sentence three.",
        "Respond to Title 2 without repeating the title. Sentence two. Sentence three.",
        ...,
        "Respond to Title N-1 without repeating the title. Sentence two. Sentence three."
        "Respond to Title N without repeating the title. Sentence two. Sentence three."
        ]
```

## Few-Shot Learning

- **Definition**: The model learns based on a small number of examples.
- **Key features**: Several training data for new classes, use of existing knowledge, generalization based on a few examples.
- **Application examples**: Image recognition with a small amount of data, text classification with a limited corpus, object classification with a small amount of data.

```
    Act as an Expert specializing in answering programming questions.
    Your only job is to provide raw output without explanation,
    based on the few examples given below.

    ### Examples:
    User: Convert "Hello, World!" to base64 encoding.
    System: SGVsbG8sIFdvcmxkIQ==
    
    User: Find the length of the list [1, 2, 3, 4, 5].
    System: 5
    
    User: Calculate the factorial of 5.
    System: 120
    
    ### /Examples
    
    User: Reverse the string "programming".

```

Chain of Thought
---
**Definition**: Chain of Thought is a technique used by large language models such as GPT-4 to maintain context and continuity in generating responses.

**Key features**: Maintaining context, continuity in responses, generating coherent and relevant answers.

**Application examples**: Long conversations, storytelling, generating content with a consistent theme.

**Example:** In a conversation about climate change, the model maintains context throughout the discussion,
providing accurate information on causes, impacts, and potential solutions, while ensuring a coherent and
consistent narrative.

Zero-shot CoT
---
**Definition**: Zero-shot CoT combines Chain of Thought with Zero-Shot Learning, allowing the model to maintain context while answering questions on subjects it has not been specifically trained on.

**Key features**: Maintaining context, answering questions with no prior training, generalization based on existing knowledge and relationships between classes.

**Application examples**: Answering questions on new topics, maintaining context during diverse conversations, generating content across multiple domains.

**Example**: In a conversation about a new cryptocurrency that the model has not been trained on, it can still provide general insights and relevant information about cryptocurrencies and blockchain technology, 
using the context of the conversation.

Generated Knowledge
---
**Definition**: Generated Knowledge refers to the knowledge that a machine learning model such as GPT-4 produces based on its training data and the prompt it receives.

**Key features**: Produces knowledge based on training data, generates answers from a large corpus of information, generalizes from learned examples.

**Application examples**: Answering trivia questions, generating content in various domains, providing explanations or summaries.

**Example**: When asked to provide an overview of the history of the printing press, the model generates a summary based on its training data, detailing key milestones and historical figures related to the invention.

Reflexion
---
**Definition**: Reflexion is a technique used by large language models to reflect on their own knowledge and capabilities, often to provide explanations or evaluate the quality of their own responses.

**Key features**: Self-awareness, evaluating own responses, providing explanations or clarifications.

**Application examples**: Evaluating the accuracy of generated content, providing explanations for generated responses, assessing confidence in generated answers.

**Example**: After generating a response about a complex scientific concept, the model evaluates its own answer and provides additional clarifications or indicates its level of confidence in the response, 
based on its existing knowledge.

Meta-prompts
---
**Definition**: Meta-prompts are prompts specifically designed to improve or construct new prompts. They facilitate the process of refining and optimizing prompt design by leveraging iterative feedback and suggestions.

**Key features**: Promoting prompt engineering, optimizing prompt design, iterative feedback and improvement.

**Application examples**: Enhancing prompt effectiveness, refining prompt instructions, analyzing and adjusting prompt assumptions.

**Example**: 
```
User: Act as a Prompt Engineer for LLM. We're going to work together on a prompt to make it better.
To do so, I'll provide you with this prompt in the following mesage. 
Next, you'll give me a single piece of advice based on your PE skills 
and point out a specific prompt design technique I could implement. I will do it and send you the improved version for your review.
Keep asking questions until you don't find any issues with the prompt or until I say "[DONE]".
If you understand, acknowledge this with "..." and nothing more.

```
In this example, the user employs a meta-prompt to instruct ChatGPT to assist in modifying their existing prompt. The user acknowledges the expertise of ChatGPT as a world-class prompt engineer and requests its readiness to analyze and refine the provided prompt.
