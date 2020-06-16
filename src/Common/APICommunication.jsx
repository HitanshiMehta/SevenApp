import getCookie from "./Cookies.jsx";

export const PATCH = "PATCH";
export const POST = "POST";
export const GET = "GET";

const CREDENTIALS_INCLUDE = "include";
export const CREDENTIALS = {
  credentials: CREDENTIALS_INCLUDE,
};

const CACHE = {
  cache: "no-cache",
};

const CORS = {
  mode: "cors",
  credentials: "same-origin",
};

export let HEADER_JSON = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

/* Get single data API call */
export const get_api = (url) =>
  fetch(url, {
    ...CREDENTIALS,
    ...CACHE,
    ...CORS,
    method: GET,
    headers: {
      ...HEADER_JSON,
      "X-CSRFToken": getCookie("csrftoken"),
    },
  });

/* post data API call */
export const post_api = (url, values) =>
  fetch(url, {
    ...CREDENTIALS,
    ...CACHE,
    ...CORS,
    method: POST,
    body: values,
    headers: {
      ...HEADER_JSON,
      "X-CSRFToken": getCookie("csrftoken"),
    },
  });

/* post data API call without any special action after completion of request */
export const post_api_without_action = (url, values) =>
  fetch(url, {
    ...CREDENTIALS,
    ...CACHE,
    ...CORS,
    method: POST,
    body: values,
    headers: {
      ...HEADER_JSON,
      "X-CSRFToken": getCookie("csrftoken"),
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:");
    })
    .catch((error) => {
      console.log("Error:", error);
    });

/* Update data API call with parameter(not kwrgs(pk)) and 
without any special action after completion of request*/
export const update_api_without_pk_without_action = (url, values) =>
  fetch(url, {
    ...CREDENTIALS,
    ...CACHE,
    ...CORS,
    method: PATCH,
    body: values,
    headers: {
      ...HEADER_JSON,
      "X-CSRFToken": getCookie("csrftoken"),
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:");
    })
    .catch((error) => {
      console.log("Error:", error);
    });
