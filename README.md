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

* Production nginx run to can use the following

JSON Server Setup
```json
{"servers": [{"host": "192.168.99.100","port": "49160"}]}
```

```bash
$ docker build -f Dockerfile.prod -t translations-frontend .
$ docker run -e tiller_json='{"servers": [{"host": "192.168.99.100","port": "49160"}]}' -p 80:80 -d translation-frontend
```
