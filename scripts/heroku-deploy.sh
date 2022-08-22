#!/usr/bin/env bash
yarn build
./scripts/clear-cloudflare-cache.js
rm -rf static
