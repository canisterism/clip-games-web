<p><h1 align="center">clip-games-web</h1></p>

## Development

**初回やること**

```bash
$ docker-compose up -d # DBの立ち上げ
$ yarn
$ yarn prisma migrate dev # マイグレーション
$ yarn prisma db seed     # マスタデータ投入
```

**dev server の立ち上げ**

```bash
$ yarn dev
```
### 便利ツール

**Prisma Studio**

```bash
$ npx prisma studio
```

**Apollo Studio**


```bash
$ npx prisma studio
```

## 技術的要素の概観

Next.js + GraphQL（Apollo）+ PostgreSQL（prisma）

### バックエンド

- Next.js の API Routes で GraphQL のエンドポイントを提供している。
- GraphQL サーバーについて
  - TypeGraphQL でリゾルバ・型定義をしている。
  - ビルド毎に schema.gql ファイルを出力している。

### フロントエンド

- schema.gql から graphql-codegen で hooks を生成している。
  - `yarn codegen:frontend` でファイルを生成できる。
    - `graphql/frontend/`以下がファイル生成のソース。
