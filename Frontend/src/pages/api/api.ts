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

export const apiPost = <T>(url: string, body: T): Promise<Response> => {
  console.log(url);
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
};

export const apiPut = <T>(url: string, body: T): Promise<Response> =>
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });

export const apiDelete = (url: string): Promise<Response> =>
  fetch(url, {
    method: "DELETE",
  });
