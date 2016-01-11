# koa-babel-sample

## Setup development
### clone reqpository
```
git clone https://github.com/freedom1989/koa-babel-sample.git
```
### ~~generate self-signed SSL Certificate~~
```
cd koa-babel-sample
mkdir keys
cd keys
openssl genrsa -des3 -out server.key 1024
openssl req -new -key server.key -out server.csr
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```
### start development
```
gulp dev
```
or
```
gulp
```