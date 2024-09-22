import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { walletHistory } = await request.json();

    if (!walletHistory || !walletHistory.result) {
      throw new Error('Invalid wallet history data');
    }

    const transactions = walletHistory.result.transactions || [];
    const transactionSummary = transactions.map((tx: any) => `${tx.type} ${tx.amount} ${tx.asset}`).join(', ');

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a witty AI that creates humorous roasts based on cryptocurrency wallet histories. Keep the roast succinct and limited to 2 sentences."
        },
        {
          role: "user",
          content: `Create a funny roast based on this wallet transaction history: ${transactionSummary}`
        }
      ],
    });

    const roast = completion.choices[0].message.content;

    return NextResponse.json({ roast });
  } catch (error) {
    console.error('Error generating roast:', error);
    return NextResponse.json({ error: 'Failed to generate roast' }, { status: 500 });
  }
}