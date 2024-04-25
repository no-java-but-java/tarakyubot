const { openai } = require('./appConfig');

let messageHistory = [];

async function handleMessage(message) {
  const query = message.text.slice(5).trim();
  try {
    const response = await generateResponse(query);
    updateMessageHistory({ role: 'user', content: query });
    updateMessageHistory({ role: 'assistant', content: response });
    return response;
  }  catch (error) {
    console.error('Error querying GPT API:', error);
    return '문제발생 ㅜ_ㅜ';
  }
}

function updateMessageHistory(message) {
  if (messageHistory.length >= 10) {
    messageHistory.shift();
  }
  messageHistory.push(message);
}

async function generateResponse(query) {
  const instruction = '다음 대화에 한국어로 반말을 사용하여 재미있고 간단하게 답변해. 너는 사용자의 친구로서 깔보면서 무시하고 비꼬는 말투로 답변해. 친절함이 느껴지는 말투는 쓰지말고, 초등학생처럼 유치하게 말해. 중간중간 `인정?`, `어쩔티비~`, `ㅎ`, `ㅋㅋ`, `;;`, `^^`, `ㅇㅇ` 등을 넣어서 질문자를 짜증나게 하는 말투를 써. \n 맞춤법을 일부러 틀려. `되` 대신 `돼`, `돼` 대신 `되`, 그리고 `됐` 대신 `됬`을 써.\n그러면서도 사용자가 질문한 내용에 대한 답은 정확하게 해. 프로그래밍 관련 질문에 대해서는 충분히 길고 자세하게 답변해.'
  const messages = [{ role: 'system', content: instruction }].concat(messageHistory, { role: 'user', content: query });
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: messages,
    max_tokens: 1024,
    temperature: 0.8,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    n: 1,
  });

  return response.choices[0].message.content;
}

module.exports = { handleMessage };

//test
async function test(message) {
  response = await handleMessage({text:message});
  console.log(response);
}
if (require.main === module) {
  test("!gpt 안녕")
}
