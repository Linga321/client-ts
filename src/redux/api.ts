const BASE_URL = 'http://localhost:5000'
export const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  

export const apiRequestFetch = async (path: string, settings?: any) => {
    let data;
    if (settings) {
      data = await fetch(BASE_URL+path, settings);
    } else {
      data = await fetch(BASE_URL+path, settings);
    }
    if (
      data.status === 201 ||
      data.status === 200 ||
      data.status === 404 ||
      data.status >= 500
    ) {
      return await data.json();
    } else {
      return undefined;
    }
};