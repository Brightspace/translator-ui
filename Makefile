
all: build

build: 
	npm run bundle

build-prod:
	npm run bundle-prod

dev-redeploy:
	make build
	docker build -t translator-ui .
	docker run -e tiller_json='{"servers":[{"host":"$(BACKEND_URL)","port":"$(BACKEND_PORT)"}]}' -p 80:80 -d translator-ui
