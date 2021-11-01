import { LocaleTranslations } from "../utils/types";
import { Navbar } from "./components/navbar";
import { Home } from "./pages/home";


// Sets required keys for every page/component
// Enforces that keys are set for all languages before build
// Also works as en enum for typesafing key calls in components
export const LocaleKeys = {
  home: {
    title: "title"
  },
  navbar: {
    page1: "page1",
    page2: "page2"
  }
}

export const Translations = {
  home: Home,
  navbar: Navbar
}