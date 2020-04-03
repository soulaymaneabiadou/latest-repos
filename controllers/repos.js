const asyncHandler = require('../middleware/async');
const axios = require('axios');

/**
 * Get the date that corresponds to 30 days from now
 * @returns {String} Date in the format of 'YYYY-MM-DD'
 */
const targetedDate = () => {
  let targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - 30);
  return targetDate.toISOString().substring(0, 10);
};

/**
 * Returns the last 100 repos created in the last 30 days on github
 * @returns {Array} an array of repo objects
 */
const getRepos = asyncHandler(async () => {
  const smallestCreatedDate = targetedDate();
  const result = await axios.get(
    `https://api.github.com/search/repositories?q=created:>${smallestCreatedDate}&sort=stars&per_page=100`
  );
  const { items } = result.data;

  return items;
});

/**
 * Creates a languages array that belongs to the repos that were fetched before
 * @param {Array<Object>} items the repos array
 * @returns {Array<String>} an Array of strings
 */
const fillLanguages = (items) => {
  const languages = new Set();
  items.forEach((repo) => languages.add(repo.language));

  return languages;
};

/**
 * Creates an array of languages and their repos
 * @param {Array<Object>} repos the repos array
 * @param {Array<String>} languages the languages array previously created
 * @returns {Array<{language: String, repos_number: Number, repos: Array<Object>}>} an array containing objects mapped to to following
 * {
 *  language: the language used,
 *  repos_number: the number of repos using that language,
 *  repos: the repos array that are using the language
 * }
 */
const fillLanguagesList = (repos, languages) => {
  let reposByLanguages = [];

  languages.forEach((language) =>
    reposByLanguages.push({ language, repos: [], repos_number: 0 })
  );

  for (let r = 0; r < repos.length; r++) {
    for (let i = 0; i < reposByLanguages.length; i++) {
      if (repos[r].language === reposByLanguages[i].language) {
        reposByLanguages[i].repos.push(repos[r]);
        reposByLanguages[i].repos_number++;
      }
    }
  }

  return reposByLanguages;
};

/**
 * Returns the list of languages used by the top 100 repos created in the last 30 days and htemselves
 * @method GET
 * @route /api/v1/repos
 * @access Public
 */
exports.getReposByLanguages = asyncHandler(async (req, res, next) => {
  const repos = await getRepos();
  const languages = fillLanguages(repos);
  const reposByLanguages = fillLanguagesList(repos, languages);

  res.status(200).json({
    success: true,
    count: reposByLanguages.length,
    data: reposByLanguages,
  });
});
