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

const handleError = response => {
  if (response.status === 401) {
    localStorage.isLoggedIn = 'false';
  }

  if (response.status !== 200) {
    throw Error(response);
  }

  return response;
};

const handleRequest = request =>
  request.catch(handleError).then(response => response.json());

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
