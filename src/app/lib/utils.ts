export const getBotResponse = (message: string): string => {
    if (message.includes('hello') || message.includes('hi')) {
      return "Hello! How can I assist you today?"
    } else if (message.includes('how are you')) {
      return "I'm just a computer program, but I'm functioning well. How can I help you?"
    } else if (message.includes('bye') || message.includes('goodbye')) {
      return "Goodbye! Have a great day!"
    } else {
      return "I'm sorry, I didn't understand that. Can you please rephrase or ask me something else?"
    }
  }