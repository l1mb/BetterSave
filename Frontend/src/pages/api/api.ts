export const apiGet = (url: string) =>
  fetch(url, {
    method: "GET",
  });

export const apiGetProtected = (url: string, token: string) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });

export const apiPost = <T>(url: string, body: T): Promise<Response> =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
