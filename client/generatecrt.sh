#!/bin/bash

mkdir ssl
cd ssl

openssl req -x509 -newkey rsa:2048 -nodes -keyout localhost.key -out localhost.crt -days 365
