import CSS from "csstype";

export const themeStyles: CSS.Properties = {
  backgroundColor: "rgba(255, 255, 255, 0.85)",
};

export const toggleTheme = () => {
  const activetheme = getTheme();
  if (activetheme === "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
  return getTheme();
};

export const getTheme = () => {
  const activetheme = localStorage.getItem("theme") as string;
  document.documentElement.className = activetheme;
  return activetheme;
};

const setTheme = (themeName: string) => {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
  document.documentElement.style.setProperty(
    "--dynamic-colour",
    themeName == "dark" ? "light" : "dark"
  );
  document.documentElement.style.setProperty(
    "--dynamic-text-colour",
    themeName == "dark" ? "black" : "white"
  );
};
