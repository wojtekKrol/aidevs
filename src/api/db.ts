import { verbose, Database } from 'sqlite3'
import { IDBRow } from './types'

const sqlite3 = verbose()

let db: Database | null = null

const initDb = () => {
  db = new sqlite3.Database(
    './database.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.error(err.message)
      }
      console.log('Connected to the SQLite database.')
    },
  )

  db.serialize(() => {
    if (!db) {
      console.error('Database is not initialized.')
      return
    }

    db.run(
      `CREATE TABLE IF NOT EXISTS knowledge (
                action TEXT NOT NULL,
                original_message TEXT NOT NULL,
                entities TEXT,
                relationships TEXT);`,
      (err) => {
        if (err) {
          console.error(err.message)
        }
      },
    )
  })
}

// Adding new row to the table
const addRow = (
  action: string,
  original_message: string,
  entities: string[],
  relationships: string[],
) => {
  if (!db) {
    console.error('Database is not initialized.')
    return
  }

  const entitiesString = JSON.stringify(entities)
  const relationshipsString = JSON.stringify(relationships)

  db.run(
    'INSERT INTO knowledge(action, original_message, entities, relationships) VALUES(?, ?, ?, ?)',
    [action, original_message, entitiesString, relationshipsString],
    (err) => {
      if (err) {
        console.error(err.message)
      }
    },
  )
}

// Fetch rows from the table based on entities
const fetchRows = (input: string[]): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject('Database is not initialized.')
      return
    }
    const inputEntities = input.map((entity) => entity.toLowerCase())

    db.all('SELECT * FROM knowledge', function (err, rows: IDBRow[]) {
      if (err) {
        console.error(err)
      } else {
        const filteredRows = rows
          .filter(({ entities }) => {
            const rowEntities = JSON.parse(entities)
            for (let i = 0; i < rowEntities.length; i++) {
              if (inputEntities.includes(rowEntities[i].toLowerCase())) {
                return true
              }
            }
            return false
          })
          .flatMap(({ relationships }) => JSON.parse(relationships))

        resolve(filteredRows)
      }
    })
  })
}

const closeDb = (signal: string) => {
  if (!db) {
    console.error('Database is not initialized.')
    return
  }
  db.close((err) => {
    if (err) {
      console.error(err.message)
    }
    console.log(`Received ${signal}. Close the database and exit...`)
  })
}

export { initDb, closeDb, addRow, fetchRows }
