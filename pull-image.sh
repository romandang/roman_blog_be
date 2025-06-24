docker-compose down
docker system prune -a --volumes
docker network create shared-net
docker-compose up -d