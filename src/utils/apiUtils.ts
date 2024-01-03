export type ApiOptions = {
  url: string;
  method: "GET";
};

export async function makeApiCall<T>(options: ApiOptions): Promise<T> {
  const { url, method } = options;

  const request = await fetch(url, {
    method,
  });

  const data = await request.json();

  return data;
}
