#!/usr/bin/expect

sudo openvpn --config /home/khiem/Downloads/downloaded-client-config.ovpn
expect "[sudo] password for khiem:"
send "123123"
expect "Enter Auth Username:"
send "khiem.nguyen"