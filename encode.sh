#!/bin/bash
mkdir -p video2
ffmpeg -hide_banner -y -i $1 \
       -r 25 -c:v libx264 -pix_fmt yuv420p -preset veryfast -profile:v main \
       -keyint_min 250 -g 250 -sc_threshold 0 \
       -c:a aac -b:a 128k -ac 2 -ar 48000 \
       -map v:0 -filter:v:0 "scale=-2:360"  -b:v:0 800k  -maxrate:0 856k  -bufsize:0 1200k \
       -map v:0 -filter:v:1 "scale=-2:432"  -b:v:1 1400k -maxrate:1 1498k -bufsize:1 2100k \
       -map v:0 -filter:v:2 "scale=-2:540"  -b:v:2 2000k -maxrate:2 2140k -bufsize:2 3500k \
       -map v:0 -filter:v:3 "scale=-2:720"  -b:v:3 2800k -maxrate:3 2996k -bufsize:3 4200k \
       -map v:0 -filter:v:4 "scale=-2:1080" -b:v:4 5000k -maxrate:4 5350k -bufsize:4 7500k \
       -map 0:a \
       -init_seg_name "init-\$RepresentationID\$.\$ext\$" \
       -media_seg_name "chunk-\$RepresentationID\$-\$Number%05d\$.\$ext\$" \
       -dash_segment_type mp4 \
       -use_template 1 \
       -use_timeline 0 \
       -seg_duration 10 \
       -adaptation_sets "id=0,streams=v id=1,streams=a" \
       -f dash \
       $2.mpd