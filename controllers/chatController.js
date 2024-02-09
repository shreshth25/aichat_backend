const  OpenAI = require("openai");

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const chat = async(req, resp)=>{
    const chats = req.body.chat
    console.log(chats) 
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
      console.log(content)
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


module.exports = {analyzeEmotion, chat}