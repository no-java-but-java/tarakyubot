function handleCommand(command) {
    const response = `*익명으로 날아온 편지*\n${command.text}`;
    return response;
  }
 
module.exports = { handleCommand };

//test
if (require.main === module) {
  const commandText = "따라해";
  console.log(handleCommand({text:commandText}));
}
