## 初期DB作成手順

```
./bin/bash.sh
```

上記コマンドでコンテナ内のバッシュに入る。

下記コマンドでsqlcmd立ち上げ。
```
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P MyPassword123
```

quickstartデータベースを作成する。
```
CREATE DATABASE quickstart
GO
```
