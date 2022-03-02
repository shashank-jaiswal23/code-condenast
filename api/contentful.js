const contentful = require("contentful");

export const client = contentful.createClient({
  space: "hbmwn5pbkdff",
  resolveLinks: true,
  accessToken: "TfnZU2G6OYa_3e5sNpAFUlQU0DwRM4sug0rRIMk9VGo",
});

const tempEntryId = "5DAXJaR6qWKH4Lhm0TNT54";

export const getEntry = async (locale = null) => {
  const req = await client.getEntry(tempEntryId, { include: 5, locale });
  const locales = await client.getLocales();

  return {
    req,
    locales,
  };
};

export const getEntries = async () => {
  const req = await client.getEntries();
  return req;
};

// const contentful = require("contentful");

// export const client = contentful.createClient({
//   // This is the space ID. A space is like a project folder in Contentful terms
//   space: "hbmwn5pbkdff",
//   resolveLinks: true,
//   // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
//   accessToken: "5RiC9w7IeJKB2M4u6-ZO3LXIHP-OS12SZ2Y1Z-_tfj8",
// });

// const tempEntryId = "7cAjRMpGJ7uVVa1EwicDeO";

// export const getEntry = async (locale = null) => {
//   const req = await client.getEntry(tempEntryId, { include: 5, locale });
//   const locales = await client.getLocales();

//   return {
//     req,
//     locales,
//   };
// };

// export const getEntries = async () => {
//   const req = await client.getEntries();
//   return req;
// };
