FROM node:8.11.1

WORKDIR /usr/src/api

COPY ./ ./

RUN yarn install

CMD ["/bin/bash"]