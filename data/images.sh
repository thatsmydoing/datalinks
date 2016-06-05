#!/bin/sh

BASEPATH=$1

get_color() {
    node -p <<EOF
var data = require('../src/data.js');
var lookup = parseInt('$1');
var result = '';
data.techs.forEach(function(tech) {
    if(tech.index == lookup) {
        result = tech.direction;
    }
});
var colors = {
    '': 'white',
    build: '#e8d48c',
    conquer: '#da8677',
    discover: '#adc4c0',
    explore: '#588c2c'
}
colors[result]
EOF
}

TECHSRC="$BASEPATH/techs"
TECHDST="../img/tech"

mkdir -p $TECHDST

# remove transparency
for f in "$TECHSRC"/*.pcx; do
    convert "$f" -transparent magenta "$TECHDST/$(basename "$f" .pcx).png"
done

convert "$TECHSRC/tech000.pcx" -transparent "#11314f" $TECHDST/tech000.png

for n in 078 079 080 081 082 083 084 085 086; do
    f="$TECHSRC/tech$n.pcx"
    convert "$f" -fuzz 20% -transparent "#64109c" "$TECHDST/$(basename "$f" .pcx).png"
done

# recolor
for f in $TECHDST/*.png; do
    n=$(basename $f .png)
    c=$(get_color ${n:4})
    mogrify -fill "$c" -fuzz 100% -opaque white "$f"
done

rename() {
    node -p <<EOF
var _ = require('lodash');
var name = '$1';
if(name.startsWith('x')) {
    name.substring(1);
}
else {
    var num = parseInt(name.substring(3));
    if(num > 33) num += 31;
    'fac'+_.padStart(num, 3, '0');
}
EOF
}

FACSRC="$BASEPATH/facs"
FACDST="../img/facs"

mkdir -p $FACDST

for f in "$FACSRC"/*.pcx; do
    n=$(rename $(basename "$f" .pcx))
    convert "$f" -transparent "#64109c" "$FACDST/$n.png"
done

PROJSRC="$BASEPATH/projs"
PROJDST="../img/projs"

mkdir -p $PROJDST

for f in "$PROJSRC"/*.pcx; do
    convert "$f" -transparent "#64109c" "$PROJDST/$(basename "$f" .pcx).png"
done
