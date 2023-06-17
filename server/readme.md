# Server App

### TODO

- TypeORM 설정
- DB 스키마 설계
- nginx 설정

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
