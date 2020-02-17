#!/usr/bin/env bash

echo "Rolling out new version of ai-library-ui"
oc rollout latest dc/ai-library-ui
