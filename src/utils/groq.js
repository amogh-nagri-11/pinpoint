import Groq from "groq-sdk"; 
import dotenv from "dotenv"; 
dotenv.config(); 

const groq = new Groq({ apiKey: process.env.API_KEY }); 

export async function interpretCommand(commentText) {
    const prompt = `
    You are a command interpreter to the pinpoint github bot. 
    Convert natural language comments into one of the structured commands below. 

    Possible command formats: 
    1. remember: <keyword> is <value> 
    2. edit: <keyword> is <new value> 
    3. delete: <keyword> 
    4. list 
    5. ask: <keyword> 

    User said: "${commentText}" 
    Return only the converted command, no explanation. 
    `;

    try { 
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }], 
            temperature: 0.2, 
        }); 

        const interpreted = completion.choices[0].message.content.trim();
        console.log("Groq interpreted: ", interpreted); 
        return interpreted; 
    } catch (err) {
        console.error("Groq interpretation failed: ", err.message); 
        return commentText;  
    }
}