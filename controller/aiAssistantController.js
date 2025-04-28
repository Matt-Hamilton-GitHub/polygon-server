const OpenAI = require('openai')
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

exports.assistWithTask = async (req, res) =>{

    const {task, userInput} = req.body
    

    if (!task || !userInput){
        return res.status(400).json({message: "Missing Input"})
    }
    try {

        const ai_response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: task },
              { role: "user", content: userInput }
            ]
          });
          
        
        return res.status(200).json(ai_response.choices)
    }catch(error){
        return res.status(500).json({ message: "Failed to get AI response", error: error.message });
    }
}