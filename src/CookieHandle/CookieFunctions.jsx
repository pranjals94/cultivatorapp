import Cookie from "js-cookie";

const SetCookie = (cookiename, userin) => {
  Cookie.set(cookiename, userin, {
    expires: 1, // 1day
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

const GetCookie = (cookiename) => {
  return Cookie.get(cookiename);
};

export default { SetCookie, GetCookie };
