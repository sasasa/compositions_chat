docker-compose run rails-api rails new . -d mysql --skip-turbolinks --skip-test 
--api

docker-compose run rails-api bundle exec rails db:create
docker-compose up


docker-compose run rails-api ash
bundle exec rails db:create
bundle exec rails db:migrate