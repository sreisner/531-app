const buildApiUri = path => `http://localhost:3001${path}`;

const commonRequestConfig = {
    cache: 'no-cache',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    redirect: 'manual'
};

const buildRequestConfig = (config = {}) => ({
    ...commonRequestConfig,
    ...config
});

const handleError = response => {
    if (response.status !== 200) {
        throw Error(response.status);
    }
    
    return response;
}

const handleRequest = request =>
    request
        .then(handleError)
        .then(response => response.json());

const get = path =>
    handleRequest(
        fetch(
            buildApiUri(path),
            buildRequestConfig({
                method: 'GET'
            })));

const post = (path, data) => 
    handleRequest(
        fetch(
            buildApiUri(path),
            buildRequestConfig({
                method: 'POST',
                body: JSON.stringify(data)
            })));

export default {
    get,
    post
};