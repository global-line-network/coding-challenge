const { localeService } = require('../../services/indexService');

function getLocale(locale) {
  return localeService.loadLocale(locale);
}

module.exports = {
  getLocale,
};
