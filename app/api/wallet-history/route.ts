import { NextResponse } from 'next/server';

const RPC_ENDPOINT = 'https://api.developer.coinbase.com/rpc/v1/base/h30rRxwzpdcFgqYN5LMYjYiBqDukMpQA';

export async function POST(request: Request) {
  try {
    const { address } = await request.json();

    const response = await fetch(RPC_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'cdp_listAddressTransactions',
        params: [{
          address,
          pageToken: '',
          pageSize: 10 // Fetch last 10 transactions
        }]
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching wallet transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch wallet transactions' }, { status: 500 });
  }
}