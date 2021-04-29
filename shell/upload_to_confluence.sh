#!/bin/bash
for filen in *.md
do
sudo docker run --rm -v $(pwd):/data -i kovetskiy/mark:latest mark -u 'xxx@xxx.com' -p <API_KEI> -f /data/$filen -b  https://XXX.atlassian.net/wiki/
done
