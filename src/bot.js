import { triggers, botUsername } from './config.js';
import { postComment } from './utils/githubAPI.js'; 

// This function receives the GitHub comment payload from /webhook
export async function handleComment(payload) {
  try {
    const commentBody = payload.comment.body;
    const sender = payload.comment.user.login;
    const issue_number = payload.issue.number;
    const repo = payload.repository.name;
    const owner = payload.repository.full_name.split('/')[0];

    // Check if comment mentions the bot
    if (!commentBody.includes(`@${botUsername}`)) return;

    let commandText = commentBody.split(`@${botUsername}`)[1].trim();

    // Determine command type
    if (commandText.startsWith(triggers.remember)) {
      // Person B handles addPinpoint
      const addPinpoint = require('./commands/addPinpoint');
      const result = await addPinpoint(commandText.replace(triggers.remember, '').trim(), sender, `PR #${issue_number}`);
      await postComment(owner, repo, issue_number, `✅ Added pinpoint: "${result.keyword}" → "${result.value}" (by ${sender}, in PR #${issue_number})`);
    }

    else if (commandText.startsWith(triggers.edit)) {
      const editPinpoint = require('./commands/editPinpoint');
      const result = await editPinpoint(commandText.replace(triggers.edit, '').trim());
      await postComment(owner, repo, issue_number, `✅ Edited pinpoint: "${result.keyword}" → "${result.value}"`);
    }

    else if (commandText.startsWith(triggers.delete)) {
      const deletePinpoint = require('./commands/deletePinpoint');
      const result = await deletePinpoint(commandText.replace(triggers.delete, '').trim());
      await postComment(owner, repo, issue_number, `🗑️ Deleted pinpoint with ID: ${result.id}`);
    }

    else if (commandText === triggers.list) {
      const listPinpoints = require('./commands/listPinpoints');
      const list = await listPinpoints();
      const listText = list.map(p => `• ${p.keyword} → ${p.value} (by ${p.user}, in ${p.source})`).join('\n');
      await postComment(owner, repo, issue_number, listText || 'No pinpoints found.');
    }

    else {
      // Ask command
      const askPinpoint = require('./commands/askPinpoint');
      const result = await askPinpoint(commandText);
      if (result) {
        await postComment(owner, repo, issue_number, `🔍 ${result.keyword} → ${result.value} (by ${result.user}, in ${result.source})`);
      } else {
        await postComment(owner, repo, issue_number, `❌ No pinpoint found for keyword: ${commandText}`);
      }
    }

  } catch (err) {
    console.error('Error in handleComment:', err.message);
  }
}

// module.exports = { handleComment };
