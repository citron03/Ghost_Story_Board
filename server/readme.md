# Server App

- 배포된 서버의 도메인 ghost-rabbit.shop

### TODO

- TypeORM 설정 X
- DB 스키마 설계 X
- nginx 설정 X

#### TypeORM을 사용한 이유

- TypeScript 지원
- 간편한 설정
- Entity 및 Repository 패턴과 같은 객체지향식 접근으로 추상화
- 쿼리 빌더 및 Query Language 지원 및 다양한 데이터베이스 지원
- 많은 사용 수
  https://npmtrends.com/prisma-vs-sequelize-vs-typeorm

### TypeORM 설정

- ghost_story_board DB를 미리 생성한다.
- .env.example을 참고하여 .env를 작성한다.

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

#### HTTP 상태 코드

- 1xx (정보): 요청을 받았으며 프로세스를 계속한다
- 2xx (성공): 요청을 성공적으로 받았으며 인식했고 수용하였다
- 3xx (리다이렉션): 요청 완료를 위해 추가 작업 조치가 필요하다
- 4xx (클라이언트 오류): 요청의 문법이 잘못되었거나 요청을 처리할 수 없다
- 5xx (서버 오류): 서버가 명백히 유효한 요청에 대해 충족을 실패했다
