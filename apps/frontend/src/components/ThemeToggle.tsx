import { Logo } from "./Logo";

const LIGHT_THEME = "lightforge";
const DARK_THEME = "darkforge";

export function ThemeToggle() {
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;

    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem("theme", nextTheme);
  };

  return (
    <button
      type="button"
      class="cursor-pointer rounded-xl transition-transform hover:scale-[1.02]"
      onDblClick={toggleTheme}
      aria-label="Toggle theme"
      title="Double click to toggle theme"
    >
      <Logo />
    </button>
  );
}
