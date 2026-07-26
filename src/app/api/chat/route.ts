import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { text: "ShowSync AI is not configured. Please set the OPENROUTER_API_KEY in .env.local." },
        { status: 200 }
      );
    }

    const systemInstruction = "You are ShowSync AI, a friendly, futuristic movie and event booking assistant for ShowSync — India's first AI-powered cinema platform. Help users discover movies, find show timings, recommend seats, suggest snacks, and answer FAQs about theatres and bookings. Keep responses concise (under 3 sentences), engaging, and conversational. Do not use markdown formatting.";

    const messages = [
      { role: "system", content: systemInstruction },
      ...history.map((msg: { role: string; text: string }) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text,
      })),
      { role: "user", content: message }
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "ShowSync AI",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "cohere/north-mini-code:free",
        messages: messages,
        temperature: 0.75,
        max_tokens: 400
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenRouter API Error Details:", errorData);
      throw new Error(`OpenRouter API Error: ${response.status}`);
    }

    const data = await response.json();
    const responseText = data.choices[0]?.message?.content || "I couldn't generate a response.";

    return NextResponse.json({ text: responseText });
  } catch (error: any) {
    console.error('OpenRouter API Error:', error);
    return NextResponse.json(
      { text: "Sorry, I'm having trouble connecting to the AI brain right now. Please try again in a moment!" },
      { status: 200 }
    );
  }
}
