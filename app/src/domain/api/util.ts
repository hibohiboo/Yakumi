const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to get the nth Fibonacci number
const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
};

export const putAndRetry = async (
  args: {
    requestUrl: string;
    data: object;
  },
  retryCount = 3,
  maxRetries = 3,
): Promise<Response> => {
  try {
    const response = await fetch(args.requestUrl, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args.data),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
  } catch (error) {
    if (retryCount === 0) throw error;
    console.log(`Retrying... attempts left: ${retryCount - 1}`);
    // Wait for a Fibonacci number of seconds before retrying
    const waitTime = fibonacci(maxRetries - retryCount + 1) * 1000;
    await sleep(waitTime);
    return putAndRetry(args, retryCount - 1, maxRetries);
  }
};
