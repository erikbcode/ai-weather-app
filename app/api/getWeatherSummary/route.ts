import { NextResponse } from 'next/server';
import openai from '@/openai';

export async function POST(request: Request) {
  // weatherdata in the body of the post request
  const { weatherData } = await request.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const response: ResponseType = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    max_tokens: 2048,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'system',
        content: `Pretend you're a weather news presenter presenting LIVE on television. Be energetic and full of charisma. Introduce yourself as GPT-Weatherman and say you are presenting
      to the viewer live from an undisclosed location. State the city you are providing a summary for. Then give a summary of todays weather only. Make it easy for the viewer to understand
      and know what to do to prepare for those weather conditions such as wear SPF if the UV is high etc. Use the uv_index data to provide UV advice. The time provided 
      as part of the current_weather property is the time that the data was last updated, not the actual current time. Provide a joke regarding the weather. Assume the data came from your team at the news office and not the user.`,
      },
      {
        role: 'user',
        content: `Hi there, can I get a summary of todays weather, use the the following information to get the weather data: ${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  });

  const { data } = response;

  return NextResponse.json(data.choices[0].message);
}
