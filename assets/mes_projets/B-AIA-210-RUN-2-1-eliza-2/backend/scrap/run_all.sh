#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

python menus.py &
python burgers.py &
python desserts.py &
python boissons.py &
python wraps_salade.py &

wait