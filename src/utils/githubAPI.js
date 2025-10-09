import dotenv from 'dotenv'; 
dotenv.config();
import { Octokit } from '@octokit/rest'; 

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function postComment(owner, repo, issue_number, body) {
  console.log("post comment called"); 
  try {
    return octokit.issues.createComment({
      owner,
      repo,
      issue_number,
      body
    });
    console.log("Comment successfully sent"); 
  } catch (err) {
    console.error("Error posting comment"); 
  }
}


