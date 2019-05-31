# Descartes Server

Go RESTful backend for Descartes.


<div align="right"><sup>
  made with ❤️ in Pittsburgh, PA by <a href="https://quantumstack.xyz">QuantumStack</a>
</sup></div>

## Configuration

Go to `./config/config.json`.

1. Set `GO_ENV` to either `dev` or `production` depending on the deployment. 
2. Fill in the database credentials `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`, and `DB_HOST`.

Now, we need to run the app.

```sh
$ go run application.go
   ____    __
  / __/___/ /  ___
 / _// __/ _ \/ _ \
/___/\__/_//_/\___/ v3.3.10-dev
High performance, minimalist Go web framework
https://echo.labstack.com
____________________________________O/_______
                                    O\
⇨ http server started on [::]:1323
```
