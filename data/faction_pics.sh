#!/bin/sh

FACTIONSRC="$1"
FACTIONDST="../img/factions"

mkdir -p $FACTIONDST

crop_pic() {
    convert "$FACTIONSRC/$1.pcx" -transparent magenta -crop 164x198+531+1 "$FACTIONDST/$1.png"
}

crop_pic gaians
crop_pic hive
crop_pic univ
crop_pic morgan
crop_pic spartans
crop_pic believe
crop_pic peace
crop_pic cyborg
crop_pic pirates
crop_pic drone
crop_pic angels
crop_pic fungboy
crop_pic usurper
crop_pic caretake
