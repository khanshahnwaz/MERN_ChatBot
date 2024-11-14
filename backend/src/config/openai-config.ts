import { Configuration } from "openai";

export const  configureOpenAI=()=>{

    // Check if the necessary environment variables are set
    if (!process.env.OPEN_AI_SECRET || !process.env.OPENAI_ORGANIZATION_ID) {
        throw new Error("Missing OpenAI API key or Organization ID");
    }
    
    const config= new Configuration(
        {
            apiKey:process.env.OPEN_AI_SECRET,
            organization:process.env.OPENAI_ORGANIZATION_ID

        }
    );
    return config;

}