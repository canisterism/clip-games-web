<p><h1 align="center">clip-games-web</h1></p>

## Development

```bash
$ docker-compose up -d # DBの立ち上げ
$ yarn
$ yarn prisma migrate dev
$ yarn prisma db seed
$ yarn dev
```

**DBへの接続**

```bash
$ npx prisma studio # http://localhost:5555 で prisma studio が立ち上がる
```
