const buildApiUri = path => {
  return `${process.env.REACT_APP_API_URI || 'http://localhost:3001'}${path}`;
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
  request.then(response => {
    if (response.status === 204) {
      return undefined;
    } else if (response.ok) {
      return response.json();
    } else {
      return response.text().then(text => {
        throw text;
      });
    }
  });

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

const patch = (path, data) =>
  handleRequest(
    fetch(
      buildApiUri(path),
      buildRequestConfig({
        method: 'PATCH',
        body: JSON.stringify(data),
      })
    )
  );

export default {
  get,
  post,
  put,
  patch,
};
