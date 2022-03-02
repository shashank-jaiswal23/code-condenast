import { useEffect, useState } from "react";

import "styles/main.scss";

import Password from "components/Password";

function App({ Component, pageProps }) {
  const [initialLoad, setInitialLoad] = useState(false);
  const [auth, setAuth] = useState(false);

  const authorize = () => {
    setAuth(true);
  };

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default App;
