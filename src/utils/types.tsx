import { LocaleKeys } from '../intl/index'

export enum Locale {
    "es" = "es",
    "en" = "en"
}

export enum ComponentName {
    "home" = "home",
    "navbar" = "navbar"
}


export type LocaleTranslations = Record<ComponentName, LocaleTranslation>
export type LocaleTranslation = Record<Locale, Translation>
export type Translation = typeof LocaleKeys[ComponentName]

export type LocaleName = Record<Locale, string>