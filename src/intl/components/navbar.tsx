import { LocaleKeys } from "..";
import { Locale, LocaleTranslation, ComponentName } from "../../utils/types";

export const Navbar: Record<Locale, typeof LocaleKeys[ComponentName.navbar]> = {
  es: {
    page1: "Página 1",
    page2: "Página 2"
  },
  en: {
    page1: "Page 1",
    page2: "Page 2"
  }
}