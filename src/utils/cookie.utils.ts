import { parse, serialize } from "cookie";

export const setCookie = (name: string, value: string, options = {}) => {
  const cookieValue = serialize(name, value, options);
  document.cookie = cookieValue;
};

export const getCookie = (name: string) => {
  const cookies = parse(document.cookie);
  return cookies[name];
};

export const removeCookie = (name: string) => {
  document.cookie = serialize(name, "", { maxAge: -1 });
};
