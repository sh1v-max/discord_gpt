require('dotenv').config();
const {Client, GatewayIntentBits}=require('discord.js');
const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

const { Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
    organization:process.env.OPENAI_ORG,
    apiKey:process.env.OPENAI_KEY,
})
const openai=new OpenAIApi(configuration);


client.on('messageCreate', async function(message){

    try{
        if(message.author.bot) return;

        const gptResponse = await openai.createCompletion({
            model: "davinci",
            prompt:`Bubble is a frinedly chatbot.\n\
            Bubble: Hello, how are you?\n\
            ${message.author.username}:${message.content}\n\
            Bubble:`,
            temperature:0.9,
            max_tokens:100,
            stop:["Bubble:", "Singh Shiv: "],
        })

        message.reply(`${gptResponse.data.choices[0].text}`);
        return;

    }catch(err){
        console.log(err)
    }
});

client.login(process.env.DISCORD_TOKEN);
console.log("Bubble is online")