.PHONY: lint
lint:
	deno fmt --check **/*.ts
	deno lint --unstable

.PHONY: outdated
# https://github.com/hayd/deno-udd
# deno install -A -f -n udd https://deno.land/x/udd@0.7.2/main.ts
outdated:
	udd **/*.ts
