import {dataService} from "./dataService";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

class TranslationService {
    _defaultLocalesPath = "";
    _translations = new Map();
    _i18n = null;
    proxy = new Proxy({}, {});
    placeholder = '...';

    constructor() {
        this.proxy = new Proxy({}, {
            has: (target, key) => this._translations.get('translationsRepository').has(key),
            get: (target, key) => this.get(key),
        });
        this._translations.set('translationsRepository', new Map());
        this._i18n = dataService.getLangCode().then(fallback => i18next.use(LanguageDetector).use(Backend).init({
                fallbackLng: fallback,
                partialBundledLanguages: true,
                backend: {
                    loadPath: `${this._defaultLocalesPath}`
                },
                detection: {
                    order: ['cookie','sessionStorage'],

                    // keys or params to lookup language from
                    lookupQuerystring: 'lng',
                    lookupCookie: 'i18next',
                    lookupSessionStorage: 'msmLang',
                    lookupFromPathIndex: 0,
                    lookupFromSubdomainIndex: 0,

                    // cache user language on
                    caches: ['sessionStorage', 'cookie'],
                }
            }, (err, t) => {
                if (err) {
                    return console.log('something went wrong loading', err);
                }
            }
        ));

    }

    setLocalesPath(loadPath = `${this._defaultLocalesPath}`) {
        this._i18n = dataService.getLangCode().then(fallback => i18next.use(LanguageDetector).use(Backend).init({
                fallbackLng: fallback,
                backend: {
                    loadPath: `${loadPath}`
                },
                detection: {
                    order: ['cookie','sessionStorage'],

                    // keys or params to lookup language from
                    lookupQuerystring: 'lng',
                    lookupCookie: 'i18next',
                    lookupSessionStorage: 'msmLang',
                    lookupFromPathIndex: 0,
                    lookupFromSubdomainIndex: 0,

                    // cache user language on
                    caches: ['sessionStorage', 'cookie'],
                }
            }, (err, t) => {
                if (err) {
                    return console.log('something went wrong loading', err);
                }
            }
        ));
    }

    addResourceBundle(lang,ns,translations){
        i18next.addResourceBundle(lang,ns,translations);
    }

    load(key, repository = 'translationsRepository') {
        const translation = dataService.fetchMSM('translationServiceImpl', 'PROTOTYPE', 'getTranslation', [key, repository]).then(e => {
            if(e.result?.value) {
                return e.result.value;
            }
            else {
                console.warn(`Translation not found for "${key}"`)
                return key;
            }
        });
        if(!this._translations.has(repository)) this._translations.set(repository, new Map());
        this._translations.get(repository).set(key, translation);
        return translation;
    }

    clearCache() {
        this._translations = new Map();
    }

    get(key, repository = 'translationsRepository') {
        return this._translations.has(repository) && this._translations.get(repository).has(key)
            ? this._translations.get(repository).get(key)
            : this.load(key, repository);
    }

    async many(...keys) {
        const translations = await Promise.all(keys.map(async key => [key, await this.get(key)]));
        return Object.fromEntries(translations);
    }

    loadByLangCodeForEntity(entityId,lang,repository = 'translationsRepository') {
        return dataService.fetchMSM('translationServiceImpl', 'PROTOTYPE', 'getTranslation', [entityId, lang, repository]).then(e => {
            if (e.result?.value) {
                return e.result.value;
            } else {
                console.warn(`Translation not found for "${entityId}"`)
                return entityId;
            }
        });
    }

    loadByLangCode(key,lang) {
        const query = { query : { _id : `${key}_${lang}` } };
        return dataService.fetchRepositoryMSM('translationsRepository',query)
            .then(e => e.result.map(({text})=>({text})).map(item => item.text)[0]);
    }

    loadTranslationById(id) {
        const query = { query : { _id : id } };
        return dataService.fetchRepositoryMSM('translationsRepository',query)
            .then(e => e.result[0]);
    }

    getLanguages() {
        return dataService.fetchMSM('translationServiceImpl', 'PROTOTYPE', 'findLanguages', []).then(e => e.result);
    }

    getAlphabetForActiveLanguage() {
        return dataService.fetchMSM('translationServiceImpl', 'PROTOTYPE', 'getAlphabetForActiveLanguage', ['true']);
    }

    translate(...args) {
        return this._i18n.then(() => new Promise((resolve, reject) => {
            resolve(i18next.t(...args));
        })) ;
    };
}

const translationService = new TranslationService();
const translations = translationService.proxy;
const translate = (...args) => translationService.translate(...args);
const setLocalesPath = (...args) => translationService.setLocalesPath(...args);
const addResourceBundle = (...args) => translationService.addResourceBundle(...args);
const loadTranslation = (...args) => translationService.load(...args);
const clearTranslationsCache = (...args) => translationService.clearCache(...args);
const tr = (...args) => translationService.get(...args);
const loadManyTranslations = (...args) => translationService.many(...args);
const loadByLangCodeForEntity = (...args) => translationService.loadByLangCodeForEntity(...args);
const loadByLangCode = (...args) => translationService.loadByLangCode(...args);
const loadTranslationById = (...args) => translationService.loadTranslationById(...args);
const getLanguages = (...args) => translationService.getLanguages(...args);
const getAlphabetForActiveLanguage = (...args) => translationService.getAlphabetForActiveLanguage(...args);

export {
    translate,
    setLocalesPath,
    addResourceBundle,
    translations,
    loadTranslation,
    loadManyTranslations,
    loadByLangCodeForEntity,
    loadByLangCode,
    loadTranslationById,
    clearTranslationsCache,
    tr,
    getLanguages,
    getAlphabetForActiveLanguage
};