FROM node:16.2.0-alpine

WORKDIR /app

RUN apk update && \
    apk add git && \
    apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh

ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH


# ホットリロード
ENV CHOKIDAR_USEPOLLING=true
RUN yarn global add @vue/cli@latest

RUN mkdir -p /app
WORKDIR /app
#COPY ./package.json /app/package.json
COPY . /app
RUN yarn

EXPOSE 8080

CMD ["/bin/sh"]