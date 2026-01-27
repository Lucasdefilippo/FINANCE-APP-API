import 'dotenv/config.js'
import { app } from './src/app.cjs'

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
