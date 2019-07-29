const axios = require("axios");

export const protectedApi = token =>
  axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 1000,
    headers: { Authorization: "Bearer " + token }
  });

export const publicApi = () =>
  axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 1000
  });

export const post = (
  url,
  body,
  token,
  thenCallback,
  catchCallback,
  protectedRoute
) => {
  protectedRoute
    ? protectedApi(token)
        .post(url, body)
        .then(thenCallback)
        .catch(catchCallback)
    : publicApi()
        .post(url, body)
        .then(thenCallback)
        .catch(catchCallback);
};

export const get = (
  url,
  params,
  token,
  thenCallback,
  catchCallback,
  protectedRoute
) => {
  protectedRoute
    ? protectedApi(token)
        .get(url, params)
        .then(thenCallback)
        .catch(catchCallback)
    : publicApi()
        .post(url, params)
        .then(thenCallback)
        .catch(catchCallback);
};
