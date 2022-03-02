import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const processLanguages = (code, name, selectedLocale) => {
  let p_code = code;
  let p_name = code;
  let selected = false;

  if (selectedLocale === code) selected = true;

  switch (code) {
    case "en-US":
      p_code = "en-US";
      p_name = "EN";
      break;
    case "zh-CN":
      p_code = "zh-CN";
      p_name = "中文";
      break;
    case "zh-Hant-TW":
      p_code = "zh-hant-tw";
      p_name = "台灣 ";
      break;
    case "ja":
      p_code = "ja";
      p_name = "日本";
      break;
    case "es":
      p_code = "es";
      p_name = "ES";
      break;
    case "es-419":
      p_code = "es-419";
      p_name = "ES-MX  ";
      break;
    case "ru":
      p_code = "ru";
      p_name = "RU";
      break;
    default:
  }

  return {
    p_code,
    p_name,
    selected,
  };
};

const Lang = ({ code }) => {
  return (
    <link
      rel="alternate"
      // hrefLang={code}
      // href={`https://code.condenast.com/${code}`}
    />
  );
};

const Option = ({ code, name, selectedLocale }) => {
  const { p_code, p_name, selected } = processLanguages(
    code,
    name,
    selectedLocale
  );

  // let locale = code === "en-US" ? "en" : code;
  // let v = code === "en-US" ? "" : code;
  // let n = name === "English (United States)" ? "English" : name;

  return <option value={p_code}>{p_name}</option>;
};

const LanguageSelector = ({ locales, selectedLocale, onChange }) => {
  const [locale, setLocale] = useState(selectedLocale);
  const router = useRouter();

  const handleChange = (e) => {
    setLocale(e.target.value);
  };

  useEffect(() => {
    if (locale !== selectedLocale) {
      onChange();
      router.push(`/`, "/", { locale });
    }
  }, [locale]);

  return (
    <>
      <Head>
        {/* manual for now !! */}
        <link
          rel="alternate"
          hrefLang={"en-US"}
          href={`https://code.condenast.com/`}
        />
        <link
          rel="alternate"
          hrefLang={"zh-CN"}
          href={`https://code.condenast.com/zh-CN`}
        />
        <link
          rel="alternate"
          hrefLang={"zh-Hant-TW"}
          href={`https://code.condenast.com/zh-Hant-TW`}
        />
        <link
          rel="alternate"
          hrefLang={"fr"}
          href={`https://code.condenast.com/fr`}
        />
        <link
          rel="alternate"
          hrefLang={"it"}
          href={`https://code.condenast.com/it`}
        />
        <link
          rel="alternate"
          hrefLang={"ja"}
          href={`https://code.condenast.com/ja`}
        />
        <link
          rel="alternate"
          hrefLang={"pt"}
          href={`https://code.condenast.com/pt`}
        />
        <link
          rel="alternate"
          hrefLang={"ru"}
          href={`https://code.condenast.com/ru`}
        />
        <link
          rel="alternate"
          hrefLang={"es"}
          href={`https://code.condenast.com/es`}
        />
        <link
          rel="alternate"
          hrefLang={"es-419"}
          href={`https://code.condenast.com/es-419`}
        />
      </Head>
      <select aria-label="Set Language" value={locale} onChange={handleChange}>
        {locales &&
          locales.items &&
          locales.items.map((locale) => (
            <Option
              code={locale.code}
              key={locale.code}
              name={locale.name}
              selectedLocale={locale}
            />
          ))}
      </select>
    </>
  );
};

export default LanguageSelector;
