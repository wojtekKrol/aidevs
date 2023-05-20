import { createServer, IncomingMessage, ServerResponse } from 'http'
import { IChatCompletionRequestBody } from './api/types'
import { initDb, closeDb } from './api/db'
import { askChat } from './tasks/lekcja9'

const server = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Max-Age': '86400', // 24 hours
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    }

    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, headers)
      res.end(JSON.stringify({ success: true }))
      return
    }

    if (req.method === 'OPTIONS') {
      // Handle preflight request
      res.writeHead(204, headers)
      res.end()
      return
    }

    if (req.method === 'POST' && req.url === '/api/ask-chat') {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk.toString()
      })
      req.on('end', async () => {
        const message = JSON.parse(
          body,
        ) as IChatCompletionRequestBody['messages'][number]

        const response = await askChat(message)
        console.log(response)
        res.writeHead(200, headers)
        res.end(JSON.stringify(response))
      })
      return
    }

    res.writeHead(404)
    res.end()
  },
)

const PORT = process.env.PORT || 3000

const handleExit = (signal: string) => {
  console.log(`Received ${signal}. Close the database and exit...`)
  closeDb(signal)
  server.close(() => {
    console.log('Server closed.')
    process.exit(0)
  })
}

process.on('SIGINT', handleExit)
process.on('SIGTERM', handleExit)

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  initDb()
  console.log('Database initialized')
})
