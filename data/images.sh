#!/bin/sh

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

mkdir -p ../img/tech

# remove transparency
for f in "$1"/*.pcx; do
    convert "$f" -transparent magenta "../img/tech/$(basename "$f" .pcx).png"
done

convert "$1/tech000.pcx" -transparent "#11314f" ../img/tech/tech000.png

for n in 078 079 080 081 082 083 084 085 086; do
    f="$1/tech$n.pcx"
    convert "$f" -fuzz 20% -transparent "#64109c" "../img/tech/$(basename "$f" .pcx).png"
done

# recolor
for f in ../img/tech/*.png; do
    n=$(basename $f .png)
    c=$(get_color ${n:4})
    mogrify -fill "$c" -fuzz 100% -opaque white "$f"
done
