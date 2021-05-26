FROM nginx:1.17.8

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/lw-ui /usr/share/nginx/html

EXPOSE 80

COPY ./entrypoint.sh /usr/share/nginx
RUN chmod +x /usr/share/nginx/entrypoint.sh

ENTRYPOINT ["/usr/share/nginx/entrypoint.sh"]
