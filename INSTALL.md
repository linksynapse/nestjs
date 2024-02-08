### 필수
Node.js v12.6.0 or later
npm v6.2.0 or later

### Nest 프로젝트 생성
```sh
npx create-nest-app <project-name>
```

### Prisma 설치

```sh
npm install prisma --save-dev
```

### Database 정보 관리 (prisma/schema.prisma 파일)

```sh
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

### Environment 변수 관리 (.env - 개발용)

```sh
DATABASE_URL="file:./dev.db"
```
