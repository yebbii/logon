FROM    node      AS builder
RUN     mkdir /logon-app
WORKDIR /logon-app
ARG     GIT_REPOSITORY_ADDRESS
ARG     REST_API_SERVER_IP
ARG     REST_API_SERVER_PORT
RUN     git clone $GIT_REPOSITORY_ADDRESS
RUN     mv ./logon-react/* ./
RUN     echo REACT_APP_IP=$REST_API_SERVER_IP > .env
RUN     echo REACT_APP_PORT=$REST_API_SERVER_PORT >> .env
RUN     npm install --silent
RUN     npm run --silent build

FROM    nginx      AS runtime
COPY    --from=builder /logon-app/build/ /usr/share/nginx/html/
RUN     rm /etc/nginx/conf.d/default.conf
COPY    --from=builder /logon-app/nginx.conf /etc/nginx/conf.d
CMD     ["nginx", "-g", "daemon off;"]
