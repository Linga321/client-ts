const URL = process.env["BASE_URL"];
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const apiRequestFetch = async (path: string, settings?: any) => {
  let data;
  if (settings) {
    data = await fetch(URL + path, settings);
  } else {
    data = await fetch(URL + path, settings);
  }
  if (
    data.status === 201 ||
    data.status === 200 ||
    data.status === 404 ||
    data.status === 403 ||
    data.status >= 500
  ) {
    return await data.json();
  } else {
    return undefined;
  }
};
