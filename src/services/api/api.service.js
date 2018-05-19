const buildApiUri = path => {
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:3001${path}`;
};

const commonRequestConfig = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

const buildRequestConfig = (config = {}) => ({
  ...commonRequestConfig,
  ...config,
});

const handleRequest = request =>
  request.then(response => response.json()).catch(() => ({}));

const get = path =>
  handleRequest(
    fetch(
      buildApiUri(path),
      buildRequestConfig({
        method: 'GET',
      })
    )
  );

const post = (path, data) =>
  handleRequest(
    fetch(
      buildApiUri(path),
      buildRequestConfig({
        method: 'POST',
        body: JSON.stringify(data),
      })
    )
  );

const put = (path, data) =>
  handleRequest(
    fetch(
      buildApiUri(path),
      buildRequestConfig({
        method: 'PUT',
        body: JSON.stringify(data),
      })
    )
  );

export const ApiService = {
  get,
  post,
  put,
};
