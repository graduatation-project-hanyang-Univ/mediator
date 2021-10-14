#!/bin/bash

AGENT="$1"
YARN_COMMAND=yarn
BUILD="$2"


if [[ "$AGENT" = "mediator01" ]] || [[ "$AGENT" = "mediator" ]]; then
  AGENT_ENDPOINT="${AGENT_ENDPOINT:-http://localhost:3001}"
  AGENT_HOST=http://localhost
  AGENT_PORT=3001
  AGENT_LABEL=RoutingMediator01
  WALLET_NAME=mediator01
  WALLET_KEY=0000000000000000000000000Mediator01
  PUBLIC_DID_SEED=00000000000000000000000Forward01
  MEDIATOR_COMMAND="mediator:start"
else
  echo "Please specify which agent you want to run. Choose from 'alice', 'alice-ws', 'bob' or 'bob-ws'."
  exit 1
fi

AGENT_ENDPOINT=${AGENT_ENDPOINT} AGENT_HOST=${AGENT_HOST} AGENT_PORT=${AGENT_PORT} AGENT_LABEL=${AGENT_LABEL} WALLET_NAME=${WALLET_NAME} WALLET_KEY=${WALLET_KEY} PUBLIC_DID=${PUBLIC_DID} PUBLIC_DID_SEED=${PUBLIC_DID_SEED} ${YARN_COMMAND} ${MEDIATOR_COMMAND}
