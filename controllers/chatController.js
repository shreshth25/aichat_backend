const  OpenAI = require("openai");

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const chat = async(req, resp)=>{
    const chats = req.body.chat
    const completion = await openai.chat.completions.create({
        messages: chats,
        model: "gpt-3.5-turbo",
      });
    
      const reply = completion.choices[0].message.content;

    return resp.json({"content": reply})
}

const analyzeEmotion = async(req, resp)=> {
  try {
      const text = req.body.text
      const content = `What emotion is the following text expressing?\n${text}`;
      const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-16k",
          messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: content }
          ],
          max_tokens: 200
      });
      const emotion = response.choices[0].message.content;
      return resp.json({"message":emotion.trim()});
  } catch (error) {
      console.log(error)
      console.error(`${new Date()} [ERROR]: Error in emotion analysis: ${error}`);
      return null;
  }
}

const analyzeStory = async(req, resp)=> {
    try {
        const narrative_style = 'linear narrative'
        const text = req.body.text
        const content = `Turn the following transcript into an engaging story with real-world examples and ensure the content in bullet points.The narrative style should be a ${narrative_style}:\n${text}`

        const messages = [{"role": "system", "content": "You are a helpful assistant that can convert transcripts into engaging stories with characters and real-world examples."}, {"role": "user", "content": content}]

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k",
            messages: messages,
            max_tokens: 10000
        });
        const emotion = response.choices[0].message.content;
        return resp.json({"message":emotion.trim()});
    } catch (error) {
        console.log(error)
        console.error(`${new Date()} [ERROR]: Error in emotion analysis: ${error}`);
        return null;
    }
  }


module.exports = {analyzeEmotion, chat, analyzeStory}