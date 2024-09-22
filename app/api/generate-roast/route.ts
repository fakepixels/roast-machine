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

    interface Transaction {
      type: string;
      amount: string | number;
      asset: string;
    }

    const transactions: Transaction[] = walletHistory.result.transactions || [];
    const transactionSummary = transactions.map((tx: Transaction) => `${tx.type} ${tx.amount} ${tx.asset}`).join(', ');

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a witty AI that creates humorous roasts based on cryptocurrency wallet histories. Your roasts should be specific, funny, and relate to industry inside jokes. Keep the roast succinct and limited to 2 sentences. Focus on the following aspects if applicable:
      
      1. If the user has no transactions, roast them for not being a "degen" or "crypto bro".
      2. If the user has transacted with a contract that has been exploited, mock their "rug pull magnetism".
      2. If the user's portfolio value has been falling from a previous high, compare them to a "falling knife catcher" or "buy high, sell low" enthusiast.
      3. If the user has fallen for influencer-promoted scams, tease them about their "influencer worship" or "shitcoin sommelier" status.
      4. If the user has invested heavily in meme coins, call them out as a "degen gambler" or "meme coin connoisseur".
      5. If the user has a lot of NFTs, call them very based but still be cheeky about it. 
      6. If the user has a lot of ETH, make a joke about them being a "whale" or "big baller".

      Use crypto slang and memes where appropriate, such as "HODL", "to the moon", "wen lambo", etc. Be creative and ruthless, but keep it light-hearted.`
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