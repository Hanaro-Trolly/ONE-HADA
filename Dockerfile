# Node.js를 기반으로 한 이미지 사용
FROM node:20-alpine

# 컨테이너 내 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 파일을 one-hada 폴더에서 복사
COPY one-hada/package*.json ./

# 의존성 설치
RUN npm install

# 나머지 소스 코드를 복사
COPY one-hada/ ./

# 애플리케이션 실행
CMD ["npm", "start"]