export const apiGet = (url: string) =>
  fetch(url, {
    method: "GET",
  });

export const apiPost = <T>(url: string, body: T): Promise<Response> =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
