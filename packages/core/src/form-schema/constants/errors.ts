export const messages = {
  ko: {
    required: (l: string) => `${l}은(는) 필수 입력 항목입니다.`,
    minLength: (l: string, n: number) => `${l}은(는) 최소 ${n}자 이상입니다.`,
    maxLength: (l: string, n: number) => `${l}은(는) 최대 ${n}자 이하입니다.`,
    pattern: (l: string) => `${l} 형식이 올바르지 않습니다.`,
    email: (l: string) => `${l} 형식이 올바르지 않습니다.`,
    min: (l: string, n: number) => `${l}은(는) ${n} 이상이어야 합니다.`,
    max: (l: string, n: number) => `${l}은(는) ${n} 이하이어야 합니다.`,
    minSelected: (l: string, n: number) => `${l}을(를) 최소 ${n}개 선택하셔야 합니다.`,
    maxSelected: (l: string, n: number) => `${l}을(를) 최대 ${n}개 선택하셔야 합니다.`,
    select: (l: string) => `${l}을(를) 선택하세요.`,
    check: (l: string) => `${l}을(를) 체크하세요.`,
    dateInput: (l: string) => `${l}을(를) 입력하세요.`,
    dateFormat: (l: string) => `${l} 형식이 올바르지 않습니다.`,
    dateMin: (l: string, min: string) => `${l}은(는) ${min} 이후여야 합니다.`,
    dateMax: (l: string, max: string) => `${l}은(는) ${max} 이전이어야 합니다.`,
    integer: (l: string) => `${l}은(는) 정수여야 합니다.`,
    multipleOf: (l: string, s: number) => `${l}은(는) ${s}의 배수여야 합니다.`,
  },
  en: {
    required: (l: string) => `${l} is required.`,
    minLength: (l: string, n: number) => `${l} must be at least ${n} characters.`,
    maxLength: (l: string, n: number) => `${l} must be at most ${n} characters.`,
    pattern: (l: string) => `${l} format is invalid.`,
    email: (l: string) => `${l} format is invalid.`,
    min: (l: string, n: number) => `${l} must be ${n} or greater.`,
    max: (l: string, n: number) => `${l} must be ${n} or less.`,
    minSelected: (l: string, n: number) => `You must select at least ${n} ${l}.`,
    maxSelected: (l: string, n: number) => `You can select at most ${n} ${l}.`,
    select: (l: string) => `Please select ${l}.`,
    check: (l: string) => `Please check ${l}.`,
    dateInput: (l: string) => `Please enter ${l}.`,
    dateFormat: (l: string) => `${l} format is invalid.`,
    dateMin: (l: string, min: string) => `${l} must be after ${min}.`,
    dateMax: (l: string, max: string) => `${l} must be before ${max}.`,
    integer: (l: string) => `${l} must be an integer.`,
    multipleOf: (l: string, s: number) => `${l} must be a multiple of ${s}.`,
  },
  ja: {
    required: (l: string) => `${l}は必須項目です。`,
    minLength: (l: string, n: number) => `${l}は${n}文字以上入力してください。`,
    maxLength: (l: string, n: number) => `${l}は${n}文字以下で入力してください。`,
    pattern: (l: string) => `${l}の形式が正しくありません。`,
    email: (l: string) => `${l}の形式が正しくありません。`,
    min: (l: string, n: number) => `${l}は${n}以上である必要があります。`,
    max: (l: string, n: number) => `${l}は${n}以下である必要があります。`,
    minSelected: (l: string, n: number) => `${l}を最低${n}個選択してください。`,
    maxSelected: (l: string, n: number) => `${l}は最大${n}個まで選択できます。`,
    select: (l: string) => `${l}を選択してください。`,
    check: (l: string) => `${l}をチェックしてください。`,
    dateInput: (l: string) => `${l}を入力してください。`,
    dateFormat: (l: string) => `${l}の形式が正しくありません。`,
    dateMin: (l: string, min: string) => `${l}は${min}以降である必要があります。`,
    dateMax: (l: string, max: string) => `${l}は${max}以前である必要があります。`,
    integer: (l: string) => `${l}は整数である必要があります。`,
    multipleOf: (l: string, s: number) => `${l}は${s}の倍数である必要があります。`,
  },
} as const;

export type SupportedLanguage = keyof typeof messages;
export type ErrorMessageKey = keyof (typeof messages)['ko'];
export type MessageFunction = (...args: any[]) => string;

class PriorityI18n {
  private currentLanguage: SupportedLanguage = 'en';
  private userSpecifiedLanguage: SupportedLanguage | null = null;
  private autoDetectedLanguage: SupportedLanguage | null = null;
  private initialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.detectLanguages();
    }
  }

  private detectLanguages() {
    if (this.initialized) return;

    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && this.isValidLanguage(savedLang)) {
      this.autoDetectedLanguage = savedLang as SupportedLanguage;
    } else {
      const browserLangs = navigator.languages || [navigator.language];

      for (const lang of browserLangs) {
        const shortLang = lang.split('-')[0];
        if (this.isValidLanguage(shortLang)) {
          this.autoDetectedLanguage = shortLang as SupportedLanguage;
          break;
        }
      }
    }

    if (!this.autoDetectedLanguage) {
      this.autoDetectedLanguage = 'en';
    }

    this.currentLanguage = this.autoDetectedLanguage;
    this.initialized = true;
  }

  private isValidLanguage(lang: string): boolean {
    return Object.keys(messages).includes(lang);
  }

  setUserLanguage(language: SupportedLanguage | null) {
    this.userSpecifiedLanguage = language;
    this.updateCurrentLanguage();
  }

  setLanguage(language: SupportedLanguage) {
    this.autoDetectedLanguage = language;

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('preferred-language', language);
      } catch (error) {
        console.error(error);
      }
    }

    this.updateCurrentLanguage();
  }

  private updateCurrentLanguage() {
    if (this.userSpecifiedLanguage) {
      this.currentLanguage = this.userSpecifiedLanguage;
    } else if (this.autoDetectedLanguage) {
      this.currentLanguage = this.autoDetectedLanguage;
    } else {
      this.currentLanguage = 'en';
    }
  }

  getCurrentLanguage(): SupportedLanguage {
    if (!this.initialized && typeof window !== 'undefined') {
      this.detectLanguages();
    }
    return this.currentLanguage;
  }

  getErrorMessage(key: ErrorMessageKey, label: string, ...args: any[]): string {
    const messageFunc = messages[this.getCurrentLanguage()][key] as MessageFunction;
    return messageFunc(label, ...args);
  }

  getLanguageStatus() {
    return {
      current: this.currentLanguage,
      userSpecified: this.userSpecifiedLanguage,
      autoDetected: this.autoDetectedLanguage,
      priority: this.userSpecifiedLanguage ? 'user-specified' : 'auto-detected',
    };
  }
}

export const i18n = new PriorityI18n();

export const setFormLanguage = (language: SupportedLanguage | null) => {
  i18n.setUserLanguage(language);
};

export const setGlobalLanguage = (language: SupportedLanguage) => {
  i18n.setLanguage(language);
};

export const ERROR = {
  required: (l: string) => i18n.getErrorMessage('required', l),
  minLength: (l: string, n: number) => i18n.getErrorMessage('minLength', l, n),
  maxLength: (l: string, n: number) => i18n.getErrorMessage('maxLength', l, n),
  pattern: (l: string) => i18n.getErrorMessage('pattern', l),
  email: (l: string) => i18n.getErrorMessage('email', l),
  min: (l: string, n: number) => i18n.getErrorMessage('min', l, n),
  max: (l: string, n: number) => i18n.getErrorMessage('max', l, n),
  minSelected: (l: string, n: number) => i18n.getErrorMessage('minSelected', l, n),
  maxSelected: (l: string, n: number) => i18n.getErrorMessage('maxSelected', l, n),
  select: (l: string) => i18n.getErrorMessage('select', l),
  check: (l: string) => i18n.getErrorMessage('check', l),
  dateInput: (l: string) => i18n.getErrorMessage('dateInput', l),
  dateFormat: (l: string) => i18n.getErrorMessage('dateFormat', l),
  dateMin: (l: string, min: string) => i18n.getErrorMessage('dateMin', l, min),
  dateMax: (l: string, max: string) => i18n.getErrorMessage('dateMax', l, max),
  integer: (l: string) => i18n.getErrorMessage('integer', l),
  multipleOf: (l: string, s: number) => i18n.getErrorMessage('multipleOf', l, s),
} as const;
