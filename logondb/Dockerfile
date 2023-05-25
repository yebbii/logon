FROM mysql:5.7
ENV  MYSQL_ROOT_PASSWORD=root
ENV  MYSQL_DATABASE=logondb
ADD  ./dictionary-db/* /docker-entrypoint-initdb.d
