export const helpHttp = () => {
  const customFech = (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
      "Content-Type": "application/json",
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    if (options.method !== "GET" && options.body) {
      options.body = JSON.stringify(options.body);
    } else {
      delete options.body;
    }

    options.credentials = 'include'; // Enable credentials for cookie handling

    setTimeout(() => controller.abort(), 3000);

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              error: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrio un error",
            })
      )
      .catch((error) => error);
  };

  const get = (url, options = {}) => customFech(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFech(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFech(url, options);
  };

  const deleted = (url, options = {}) => {
    options.method = "DELETE";
    return customFech(url, options);
  };

  return {
    get,
    post,
    put,
    deleted,
  };
};
