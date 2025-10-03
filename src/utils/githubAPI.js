import dotenv from 'dotenv'; 
dotenv.config();
import { Octokit } from '@octokit/rest'; 

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function postComment(owner, repo, issue_number, body) {
  return octokit.issues.createComment({
    owner,
    repo,
    issue_number,
    body
  });
}


