import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { pool } from '../helper.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const execMigrations = async () => {
    const client = await pool.connect()

    try {
        const files = fs
            .readdirSync(__dirname)
            .filter((file) => file.endsWith('.sql'))

        for (const file of files) {
            const filePath = path.join(__dirname, file)
            const script = fs.readFileSync(filePath, 'utf-8')
            await client.query(script)

            console.log(`Reading file ${file}`)
        }

        console.log('All migration executed successfully.')
    } catch (error) {
        console.error('Error executing migration:', error)
    }
    await client.release()
}

execMigrations()
