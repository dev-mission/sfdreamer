# Start with the latest Node.js LTS release
FROM --platform=linux/amd64 node:14

# Set an env variable for the location of the app files
ENV APP_HOME=/opt/node/app

# update path to include any installed node module executables
RUN echo "export PATH=$APP_HOME/node_modules/.bin:\$PATH\n" >> /root/.bashrc

RUN echo "deb http://archive.debian.org/debian/ stretch main non-free contrib\ndeb http://archive.debian.org/debian-security/ stretch/updates main non-free contrib" > /etc/apt/sources.list

RUN wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | apt-key add - && \
    echo "deb http://apt-archive.postgresql.org/pub/repos/apt/ stretch-pgdg main" >> /etc/apt/sources.list.d/pgdg.list && \
    apt-get update -y && \
    apt-get install -y postgresql-client-11 && \
    apt-get clean

# Create a directory for the server app to run from
RUN mkdir -p $APP_HOME

# Add the project files into the app directory
ADD . $APP_HOME

# Switch to the client directory and install its dependencies
WORKDIR $APP_HOME/client
RUN npm install && \
    npm run build

# Switch to the server directory and install its dependencies
WORKDIR $APP_HOME
RUN npm install

CMD ["node", "./bin/www"]
