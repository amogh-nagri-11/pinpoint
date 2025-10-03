const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function postComment(owner, repo, issue_number, body) {
  return octokit.issues.createComment({
    owner,
    repo,
    issue_number,
    body
  });
}

module.exports = { postComment, octokit };
