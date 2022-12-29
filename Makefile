VERSION=$(shell ./version.sh)

.PHONY: help

help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

up: ## starts database and application
	docker-compose -f docker-compose.yml up

docker-up-recreate: ## docker recreate application
	docker-compose -f docker-compose.yml up --force-recreate

prisma-migrate: ## create prisma migration
	yarn prisma migrate dev && yarn prisma generate

prisma-generate: ## prisma generate env
	yarn prisma generate

prisma-client: ## open prisma client
	yarn prisma studio

version: ## Output the current version
	@echo $(VERSION)

