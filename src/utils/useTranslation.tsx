import { useContext } from "react"
import { LanguageContext } from "../contexts/LanguageProvider"
import { LocaleKeys, Translations } from "../intl"
import { default_locale } from "./constants"

import { ComponentName } from "./types"

export default function useTranslation(comp: ComponentName) {
  const { locale } = useContext(LanguageContext)  



  function t(k: string) {
    const key = k as keyof typeof LocaleKeys[typeof comp]
    
    if (!Translations[comp][locale][key]) {
      console.warn(`No string '${key}' for locale '${locale} in component ${comp}'`)
    }

    return Translations[comp][locale][key] || Translations[comp][default_locale][key] || ""
  }

  // Returns a custom page function for every page as we need page info for sorting translations
  return { t, locale }
}