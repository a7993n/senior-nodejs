up:
	docker-compose up

upd:
	docker-compose up -d

down:
	docker-compose down

container:
	docker exec -ti senior-server /bin/sh

clear-images:
	docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
