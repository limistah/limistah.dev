openring:
	@go install git.sr.ht/~sircmpwn/openring@latest
	./openring.sh

serve: openring
	hugo serve -p 1313

build: openring
	hugo

build-prod: openring
	hugo --minify