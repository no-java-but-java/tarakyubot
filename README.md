# 따라큐봇

따라큐 슬랙봇입니다.

## 설치 방법


```bash
git clone https://github.com/no-java-but-java/tarakyubot.git
cd tarakyubot
npm install
```

## 기능
- !gpt [쿼리]
- /대나무숲 [텍스트]

## 기술 스택
- Node.js
- Express
- Google Cloud Functions

## 환경 변수 설정

- SLACK_BOT_TOKEN: Slack 봇 토큰
- SLACK_SIGNING_SECRET: Slack 요청의 유효성 검증
- OPENAI_API_KEY: OpenAI API에 접근

## 배포
GitHub Actions와 Google Cloud Functions를 사용한 자동 배포