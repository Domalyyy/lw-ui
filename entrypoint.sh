#!/usr/bin/env bash

sed -i 's@LW_SERVER@'"$LW_SERVER"'@' /usr/share/nginx/html/main.*
grep -i 'baseUrl:' /usr/share/nginx/html/main.*

nginx -g "daemon off;"
