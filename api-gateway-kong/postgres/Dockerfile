FROM postgres:9.6

COPY docker-entrypoint.sh /usr/local/bin/

RUN chmod 777 /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

CMD ["postgres"]

# netsh interface portproxy set v4tov4 listenport=8000 listenaddress=0.0.0.0 connectport=8000 connectaddress=172.20.177.120 protocol=tcp
# netsh interface portproxy set v4tov4 listenport=8001 listenaddress=0.0.0.0 connectport=8001 connectaddress=172.20.177.120 protocol=tcp
# netsh interface portproxy set v4tov4 listenport=8443 listenaddress=0.0.0.0 connectport=8443 connectaddress=172.20.177.120 protocol=tcp
# netsh interface portproxy set v4tov4 listenport=8444 listenaddress=0.0.0.0 connectport=8444 connectaddress=172.20.177.120 protocol=tcp
# netsh interface portproxy set v4tov4 listenport=1337 listenaddress=0.0.0.0 connectport=1337 connectaddress=172.20.177.120 protocol=tcp

# netsh delete v4tov4 listenport=8000 listenaddress=0.0.0.0 protocol=tcp
# netsh delete v4tov4 listenport=8001 listenaddress=0.0.0.0 protocol=tcp
# netsh delete v4tov4 listenport=8443 listenaddress=0.0.0.0 protocol=tcp
# netsh delete v4tov4 listenport=8444 listenaddress=0.0.0.0 protocol=tcp
# netsh delete v4tov4 listenport=1337 listenaddress=0.0.0.0 protocol=tcp