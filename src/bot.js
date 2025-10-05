import { triggers, botUsername } from './config.js';
import { postComment } from './utils/githubAPI.js';
import { 
  addPinpoint, 
  editPinpoint, 
  deletePinpoint, 
  getPinpoint, 
  listPinpoint, 
  getAllPinpoints 
} from './commands/handlers/index.js';

// Acceptable delimiters for keyword/value
const delimiters = ['→', ':', 'is', '='];

function parseKeywordValue(text) {
  for (const delim of delimiters) {
    if (text.includes(delim)) {
      const [keyword, ...rest] = text.split(delim);
      const value = rest.join(delim).trim();
      return { keyword: keyword.trim(), value };
    }
  }
  // If no delimiter found, treat whole text as keyword, empty value
  return { keyword: text.trim(), value: '' };
}

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

    if (commandText.startsWith(triggers.remember)) {
      const { keyword, value } = parseKeywordValue(commandText.replace(triggers.remember, '').trim());
      const result = await addPinpoint({ content: keyword, value, user: sender, source: `PR #${issue_number}` });
      await postComment(owner, repo, issue_number, `✅ Added pinpoint: "${keyword}" → "${value}" (by ${sender}, in PR #${issue_number})`);
    }
    else if (commandText.startsWith(triggers.edit)) {
      const { keyword, value } = parseKeywordValue(commandText.replace(triggers.edit, '').trim());
      const result = await editPinpoint(keyword, value);
      await postComment(owner, repo, issue_number, `✅ Edited pinpoint: "${keyword}" → "${value}"`);
    }
    else if (commandText.startsWith(triggers.delete)) {
      const { keyword } = parseKeywordValue(commandText.replace(triggers.delete, '').trim());
      const result = await deletePinpoint(keyword);
      await postComment(owner, repo, issue_number, `🗑️ Deleted pinpoint with ID/Keyword: "${keyword}"`);
    }
    else if (commandText === triggers.list) {
      const list = await listPinpoint();
      const listText = list.data.map(p => `• ${p.content} → ${p.value} (by ${p.user}, in ${p.source})`).join('\n');
      await postComment(owner, repo, issue_number, listText || 'No pinpoints found.');
    }
    else {
      const result = await getPinpoint(commandText.trim());
      if (result.success && result.data.length > 0) {
        const r = result.data[0];
        await postComment(owner, repo, issue_number, `🔍 ${r.content} → ${r.value} (by ${r.user}, in ${r.source})`);
      } else {
        await postComment(owner, repo, issue_number, `❌ No pinpoint found for keyword: ${commandText}`);
      }
    }

  } catch (err) {
    console.error('Error in handleComment:', err.message);
  }
}
