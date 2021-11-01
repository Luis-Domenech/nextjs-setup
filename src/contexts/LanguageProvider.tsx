import { createContext, Dispatch, SetStateAction, useState } from "react"
import { default_locale } from "../utils/constants"
import { Locale } from "../utils/types"

interface Context {
  locale: Locale,
  setLocale: Dispatch<SetStateAction<Locale>>
}

export const LanguageContext = createContext<Context>({
  locale: default_locale,
  setLocale: (value: SetStateAction<Locale>) => {}
})

export const LanguageProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(default_locale)

  return (
    <LanguageContext.Provider value={{locale, setLocale}}>
      {children}
    </LanguageContext.Provider>
  )
}