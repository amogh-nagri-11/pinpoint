const storage = require('./storage');

// This function is called by bot.js when @pinpoint remember is used
async function addPinpointCommand(commandText, user, source) {
  const [keyword, value] = commandText.split(' is ').map(s => s.trim());
  return storage.addPinpoint({ keyword, value, user, source });
}

module.exports = addPinpointCommand;
