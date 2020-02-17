import * as React from "react";

import JsonSample from "../../JsonSample/components/JsonSample";
import "./AxiosError.scss";

function AxiosError({error}) {
  const errorMessage = error.message ? <h2>{error.message}</h2> : <h2>Request Error Encountered</h2>;
  const status = error.response ? <h3>Status Code {error.response.status}: {error.response.statusText}</h3> : "";

  return (
    <div className="axios-error">
      {errorMessage}
      {status}
      <JsonSample title="Details" object={JSON.parse(JSON.stringify(error))} initHidden/>
    </div>
  );
}

export default AxiosError;

