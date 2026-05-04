export const parseTXT = (buffer) => { 
    const text = buffer.toString("utf-8"); 
    
    return { rawText: text, }; 
};