import Head from "next/head";
import Cookies from "js-cookie";
import fetch from "isomorphic-unfetch";
import { useEffect, useState, useRef } from "react";

const Password = ({ authorize }) => {
  const [initialCookieCheck, setInitialCookieCheck] = useState(false);
  const [error, setErrors] = useState(false);
  const [makingReq, setMakingReq] = useState(false);
  const [pw, setPw] = useState("");

  const input = useRef(null);

  useEffect(() => {
    checkForInitialCookie();
  }, []);

  const checkForInitialCookie = () => {
    const cookieCheck = Cookies.get("cn_dni_auth");

    if (!cookieCheck) {
      setInitialCookieCheck(true);
      input.current.focus();
    } else authorizeReq();
  };

  const makeReq = async () => {
    if (makingReq) return false;

    setMakingReq(true);

    const req = await fetch(
      `/api/handlePassword.js?p=${encodeURIComponent(pw)}`
    );
    const j = await req.json();

    if (j.status === 401) {
      setMakingReq(false);
      setErrors(true);
    } else if (j.status === 200) {
      Cookies.set("cn_dni_auth", "xxx", { expires: 1 });
      authorizeReq();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    input.current.blur();

    makeReq();
  };

  const authorizeReq = () => {
    authorize(true);
  };

  const handleChange = (e) => {
    setPw(e.target.value);
  };

  const handleFocus = (e) => {
    setErrors(false);
  };

  return (
    <div id="pw" className="x xw">
      <Head>
        <title>Condé Nast - Login</title>
      </Head>

      <form
        className={`initial-cookie-check-${initialCookieCheck}`}
        onSubmit={handleSubmit}
      >
        <div className="form">
          <input
            className={`${error && "error-input"}`}
            ref={input}
            type="password"
            onFocus={handleFocus}
            onChange={handleChange}
            autoComplete="off"
            value={pw}
          />

          <div className={`error ${error && "error-active"}`}>
            Incorrect password
          </div>
        </div>
      </form>

      <footer>
        <div className="nast">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://condenast.com"
          >
            <img src={`/svgs/conde-footer-svg.svg`} alt="Condé Nast" />
          </a>
        </div>
      </footer>

      <style jsx>{`
        .initial-cookie-check-false {
          opacity: 0;
        }

        .nast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          width: 12rem;
          transform: translateX(-50%);
        }

        #pw {
          background-color: black;
          color: white;
          height: 100vh;
          min-height: 500px;
        }

        .error {
          position: absolute;
          width: 100%;
          top: 4rem;
          text-align: center;
          opacity: 0;
          pointer-events: none;
          transition: 0.3s ease-out opacity;
        }
        .error.error-active {
          opacity: 1;
          pointer-events: auto;
        }

        .form {
          position: relative;
        }

        input {
          padding: 0.56rem 0.86rem;
          font-size: 20px;
          background-color: black;
          color: white;
          border-radius: 0.25rem;
          outline: none;
          border: none;
          transition: 0.3s ease-out border;
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        input.error-input {
          border: 1px solid red;
          animation: 0.2s linear shake;
        }

        @keyframes shake {
          0% {
            transform: translateX(-0.56rem);
          }
          25% {
            transform: translateX(0.56rem);
          }
          50% {
            transform: translateX(-0.56rem);
          }
          75% {
            transform: translateX(0.56rem);
          }
          100% {
            transform: translate(0);
          }
        }

        input:focus {
          border: 1px solid white;
        }

        form {
          height: calc(100vh - 4rem);
          display: flex;
          width: 100vw;
          flex-wrap: wrap;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Password;
