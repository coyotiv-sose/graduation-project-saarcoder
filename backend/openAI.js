const OpenAI = require('openai')
const dotenv = require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'What is backtracking in computer science?' }],
    model: 'gpt-3.5-turbo',
  })

  console.log(completion.choices[0])
}
main()

async function main2() {
  const image = await openai.images.generate({
    model: 'dall-e-3',
    prompt:
      'Use a child friendly, comic style. A 2 year old turkish girl with brown curly hair and brown eyes and smiles all the time. A lovely kindergarden in the UK with a beautiful landscape and a lot of flowers. First day in the kindergarden with children in the background.',
    n: 1,
    size: '1024x1024',
  })

  console.log(image.data)
}
main2()
