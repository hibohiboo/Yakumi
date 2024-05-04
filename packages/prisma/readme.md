## DBスキーマ方針
Modelファーストとする。 https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/mental-model

`prisma db push`でschema.prismaから`generated/zod/index.ts`を作成する。

types/index.d.tsでは作成されたファイルから型定義を抽出する。

## 準備

マイグレーション作業のときには、dockerで内部用DBを立ち上げておくこと。

```
cd ../../infrastructure/local-db/ && ./bin/up.sh
```

接続情報

```
Username: SA
Password: MyPassword123
Database: quickstart
Port: 1433
```

## スクリプト
npm run script の説明

migration ... migrationsフォルダの作成。シャドウデータベースを使って検証をしている。本番DBには影響なし
deploy ... migrationsフォルダ内のSQLを使って本番DBを更新する。


