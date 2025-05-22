#!/bin/bash
cd /home/kavia/workspace/code-generation/unifiedinventory-suite-93816-93871/main_container_for_unifiedinventory_suite
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

