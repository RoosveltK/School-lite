import Router from "next/router";

export const getServerSideToken = (req) => {
  const { signedCookies = {} } = req;

  if (!signedCookies) {
    return {};
  } else if (!signedCookies.token) {
    return {};
  }
  return { user: signedCookies.token };
};

const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";

export const signIn = async (user) => {
  const { data } = await axios.post("/api/signin", user);
  return data;
};

export const getUserScript = (user) => {
  return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`;
};
