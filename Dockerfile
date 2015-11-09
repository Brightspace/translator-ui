FROM nginx:latest

# Install dependencies
RUN apt-get update && apt-get install ruby -y
RUN gem install tiller

# Remove the default Nginx configuration file
RUN cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.original

RUN mkdir -p /var/www
COPY ./public /var/www/public

EXPOSE 80

ADD ./config/tiller /etc/tiller

CMD ["/usr/local/bin/tiller" , "-v"]
