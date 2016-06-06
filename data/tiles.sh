#!/bin/sh

BASEPATH=$1

OBJECTS="$1/ter1.pcx"
TILES="$1/texture.pcx"

_OBJECTS=/tmp/alphater1.png
_TILES=/tmp/alphatexture.png

DEST="../img/map"

mkdir -p $DEST

convert "$OBJECTS" -transparent "#9818e4" -transparent "#64109c" -fill black -opaque "#fdbd76" $_OBJECTS
convert "$TILES" -transparent "#7d0080" -fill black -opaque "#fdbd76" $_TILES

crop_tile() { # x y name
    convert $_TILES -crop 56x56+$1+$2 $DEST/$3.png
}

crop_object() { # x y name
    convert $_OBJECTS -crop 100x50+$1+$2 $DEST/$3.png
}

crop_tile 1 115 land
crop_tile 280 136 sea
crop_tile 832 219 farmland
crop_tile 775 395 road
crop_tile 775 566 magtube
crop_tile 280 516 fungus
crop_tile 508 516 seafungus
crop_tile 526 6 forest
crop_tile 280 259 river

crop_object 506 64 mining-platform
crop_object 607 64 mine
crop_object 506 127 tidal-harness
crop_object 607 127 solar-collector
crop_object 607 190 kelp
crop_object 506 253 condenser
crop_object 607 253 echelon-mirror
crop_object 708 253 borehole
crop_object 506 316 bunker
crop_object 607 316 airbase
crop_object 708 316 sensor
crop_object 822 579 soil-enricher
crop_object 923 579 farm
