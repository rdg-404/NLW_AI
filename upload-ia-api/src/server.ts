import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { getAllPrompts } from './routes/get-all-prompts'
import { uploadVideos } from './routes/upload-video'
import { createTranscription } from './routes/create-transcription'
import { generateAICompletion } from './routes/generate-ai-completion'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(getAllPrompts)
app.register(uploadVideos)
app.register(createTranscription)
app.register(generateAICompletion)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server running')
  })
