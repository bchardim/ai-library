function generateCurl(method, baseUrl, subPath, body) {
  const url = new URL(subPath, baseUrl);
  let curlCmd = `curl '${url}'`;

  if (method === 'POST') {
    curlCmd += ` \\
  -X POST \\
  -H 'Content-Type: application/json'`;
  } else {
    curlCmd += ` \\
  -X ${method}`;
  }

  curlCmd += ` \\
  -H 'Accept: application/json'`;

  if (body) {
    curlCmd += ` \\
  -d '${JSON.stringify(body)}'`;
  }

  return curlCmd;
}

export default generateCurl;
