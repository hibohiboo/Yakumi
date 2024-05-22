const headers = new Headers([['Content-Type', 'application/json']]);
export const okResponse = (body: unknown) => ({
  headers,
  body: JSON.stringify(body),
});

export const errorResponse = (body: unknown) => ({
  headers,
  status: 500,
  body: JSON.stringify(body),
});
