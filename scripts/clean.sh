#!/usr/bin/env bash
set -euo pipefail

watchman watch-del-all || true
rm -rf node_modules
rm -rf $TMPDIR/metro-* || true
rm -rf $TMPDIR/react-* || true
rm -rf android/app/build android/build || true
rm -rf ios/Pods ios/Podfile.lock || true
rm -rf ios/build || true
YARN_CACHE_FOLDER=${YARN_CACHE_FOLDER:-"$TMPDIR/yarn-cache"}
rm -rf "$YARN_CACHE_FOLDER" || true
