import { getAnswerGPT4 } from '../helpers'
import { IChatCompletionRequestBody } from '../api/types'
import { addRow, fetchRows } from '../api/db'

const systemContent =
  'Please analyze the following text input and identify its message content type: \n' +
  '\n' +
  '1. If it contains information to remember, process the input into a structured format and do not provide anything else. Use #remember format from DATABASE\n' +
  '\n' +
  '2. If it consists of questions, queries, or information search, process the input into a structured format and do not provide anything else. Use #question format from DATABASE\n' +
  '\n' +
  '3. For all other cases, return data in use #pass  format from DATABASE and do not provide anything else\n' +
  '\n' +
  '\n' +
  '### DATABASE\n' +
  '{\n' +
  '  "action" : "#remember",\n' +
  '  "original_message": "Adam has a dog, called Traktor",\n' +
  '  "entities": ["Adam", "dog", "Traktor"],\n' +
  '  "relationships": ["Adam has dog", "dog is called Traktor"]\n' +
  '}\n' +
  '\n' +
  '{\n' +
  '  "action" : "#question",\n' +
  '  "original_message": "Adam has a dog, called Traktor",\n' +
  '  "entities": ["Adam", "dog", "Traktor"],\n' +
  '  "relationships": ["Adam has dog", "dog is called Traktor"]\n' +
  '}\n' +
  '\n' +
  '{\n' +
  '  "action" : "#pass",\n' +
  '  "original_message": "Describe best ten sf books"\n' +
  '} \n' +
  '###    '

const askChat = async (
  input: IChatCompletionRequestBody['messages'][number],
) => {
  const { role, content } = input

  const result = await getAnswerGPT4([
    { role: 'system', content: systemContent },
    { role, content },
  ])

  const formattedAnswer = JSON.parse(result.choices[0].message.content)

  switch (formattedAnswer.action) {
    case '#remember':
      console.log('Zapisz w bazie danych informacje o encjach i relacjach')
      addRow(
        formattedAnswer.action,
        formattedAnswer.original_message,
        formattedAnswer.entities,
        formattedAnswer.relationships,
      )

      return 'Dane zapisane w bazie danych'
    case '#question': {
      console.log('Zadałeś pytanie do bazy danych')

      const relationships = await fetchRows(formattedAnswer.entities)

      const result = await getAnswerGPT4([
        { role: 'system', content: `${relationships}` },
        { role, content },
      ])

      return result.choices[0].message.content
    }
    case '#pass':
      console.log('Zwróć wiadomość do użytkownika')
      break
  }
}

export { askChat }
