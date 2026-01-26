openring:
	@go install git.sr.ht/~sircmpwn/openring@latest
	./openring.sh

serve:
	hugo serve -p 1313

build:
	hugo

build-prod: openring
	hugo --minify
