<p><h1 align="center">clip-games-web</h1></p>

## Development

### 初回やること

development.keyを1passwordから取得して、`./backend/config/credentials/development.key`に配置する。

```bash
$ cd backend
# 下記コマンドで開ければOK
$ EDITOR='code --wait' rails credentials:edit --environment development
```

**機密情報をコミットしないようにする**

https://docs.gitguardian.com/ggshield-docs/integrations/git-hooks/pre-commit

## Graphq周辺

### graphql-rubyのスキーマを更新する

```bash
$ rails graphql:schema:dump 
```
