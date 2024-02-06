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

module.exports = chat