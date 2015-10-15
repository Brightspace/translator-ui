## Development and deployment With Docker

* Run with environment variables
| Name | Description
| ---- | -----------
| PORT | The port to use
| BACKEND_URL | Location of the translations backend

```bash
$ docker build -t translations-frontend .
$ docker run -e BACKEND_URL=http://192.168.99.100:49160 -e PORT=3001 -p 3001:3001 -d translation-frontend
```
