<p><h1 align="center">clip-games-web</h1></p>

## Development

### 初回やること

- バックエンド用のクレデンシャルのキーであるdevelopment.keyを1passwordから取得して、`./backend/config/credentials/development.key`に配置する。
- フロントエンドのクレデンシャルの.env.localを1passwordから取得して、`./frontend/.env.local`に配置する。

```bash
$ cd backend
# 下記コマンドで開ければOK
$ EDITOR='code --wait' rails credentials:edit --environment development
```

```bash
# api.localhost にアクセスできるようにする
echo "127.0.0.1 api.localhost" >> /etc/hosts
```

**機密情報をコミットしないようにする**

https://docs.gitguardian.com/ggshield-docs/integrations/git-hooks/pre-commit

## Graphql周辺

### graphqlのスキーマ更新

```bash
$ cd backend
$ rails graphql:schema:dump 
```
※ /backendに生成されるが、ルートに移動させないとfrontend側で認識されないので注意
### graphqlのコード自動生成

```bash
$ cd ../frontend
$ yarn codegen
```
