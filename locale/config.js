// Find more on https://github.com/iamkun/dayjs/blob/dev/src/locale/sr.js

const translator = {
  words: {
    m: ['један минут', 'једног минута'],
    mm: ['%d минут', '%d минута', '%d минута'],
    h: ['један сат', 'једног сата'],
    hh: ['%d сат', '%d сата', '%d сати'],
    d: ['један дан', 'једног дана'],
    dd: ['%d дан', '%d дана', '%d дана'],
    M: ['један месец', 'једног месеца'],
    MM: ['%d месец', '%d месеца', '%d месеци'],
    y: ['једну годину', 'једне године'],
    yy: ['%d годину', '%d године', '%d година']
  },
  correctGrammarCase(number, wordKey) {
    if (number % 10 >= 1 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
      return number % 10 === 1 ? wordKey[0] : wordKey[1]
    }
    return wordKey[2]
  },
  relativeTimeFormatter(number, withoutSuffix, key, isFuture) {
    const wordKey = translator.words[key]

    if (key.length === 1) {
      // Nominativ
      if (key === 'y' && withoutSuffix) return 'једна година'
      return isFuture || withoutSuffix ? wordKey[0] : wordKey[1]
    }

    const word = translator.correctGrammarCase(number, wordKey)
    // Nominativ
    if (key === 'yy' && withoutSuffix && word === '%d годину') return `${number} година`

    return word.replace('%d', number)
  }
}

dayjs.locale({
  name: 'sr',
  weekdays: ['Недеља', 'Понедељак', 'Уторак', 'Среда', 'Четвртак', 'Петак', 'Субота'],
  weekdaysShort: ['Нед.', 'Пон.', 'Уто.', 'Сре.', 'Чет.', 'Пет.', 'Суб.'],
  weekdaysMin: ['не', 'по', 'ут', 'ср', 'че', 'пе', 'су'],
  months: ['Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун', 'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар'],
  monthsShort: ['Јан.', 'Феб.', 'Мар.', 'Апр.', 'Мај', 'Јун', 'Јул', 'Авг.', 'Сеп.', 'Окт.', 'Нов.', 'Дец.'],
  weekStart: 1,
  relativeTime: {
    future: 'за %s',
    past: 'пре %s',
    s: 'неколико секунди',
    m: translator.relativeTimeFormatter,
    mm: translator.relativeTimeFormatter,
    h: translator.relativeTimeFormatter,
    hh: translator.relativeTimeFormatter,
    d: translator.relativeTimeFormatter,
    dd: translator.relativeTimeFormatter,
    M: translator.relativeTimeFormatter,
    MM: translator.relativeTimeFormatter,
    y: translator.relativeTimeFormatter,
    yy: translator.relativeTimeFormatter
  },
  ordinal: n => `${n}.`,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'D. M. YYYY.',
    LL: 'D. MMMM YYYY.',
    LLL: 'D. MMMM YYYY. H:mm',
    LLLL: 'dddd, D. MMMM YYYY. H:mm'
  }
})