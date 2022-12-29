jq -rM '.version' package.json

cat mix.exs | grep version | grep '\([0-9]\+\.\?\)\{3\}' -o