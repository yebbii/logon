FROM    node      AS builder
RUN     mkdir /logon-app
WORKDIR /logon-app
COPY    . .
RUN     echo REACT_APP_IP=192.168.0.34 > .env
RUN     echo REACT_APP_PORT=8888 >> .env
RUN     npm install
RUN     npm run build

FROM    nginx      AS runtime
COPY    --from=builder /logon-app/build/ /usr/share/nginx/html/
RUN     rm /etc/nginx/conf.d/default.conf
COPY    ./nginx.conf /etc/nginx/conf.d
CMD     ["nginx", "-g", "daemon off;"]