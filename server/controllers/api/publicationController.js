const { authService, publicationService } = require('../../services/indexService');

const { requireAuthentication } = authService;
const { createPublication, findPublications } = publicationService;

function getPublications() {
  return findPublications();
}

function postPublication(user, content) {
  requireAuthentication(user);
  return createPublication(user, content);
}

module.exports = {
  getPublications,
  postPublication,
};
