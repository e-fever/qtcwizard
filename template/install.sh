#!/bin/sh
# Install %WIZARD%

NAME="%WIZARD%"
INSTALL_PATH="$HOME/.config/QtProject/qtcreator/templates/wizards/$NAME"
SOURCE_PATH=$(dirname $0)

mkdir -p "$INSTALL_PATH"
cp -va "$SOURCE_PATH/$NAME"/. "$INSTALL_PATH"
