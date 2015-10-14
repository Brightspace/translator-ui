FROM node:0.12

WORKDIR /home/translator

RUN npm install -g bower
RUN npm install -g phantomjs

ADD package.json /home/translator/package.json
RUN npm install

# Manually trigger bower. Why doesnt this work via npm install?
ADD .bowerrc /home/translator/.bowerrc
ADD bower.json /home/translator/bower.json
RUN bower install --config.interactive=false --allow-root

# Make everything available for start
ADD . /home/translator

# Make sure client tests can run in headless browser.
ENV PHANTOMJS_BIN /usr/local/lib/node_modules/phantomjs/lib/phantom/bin/phantomjs

# Port 3001 for server
EXPOSE 3001

CMD ["npm", "start"]
