test:
	npm test

coverage:
	./node_modules/jscoverage/bin/jscoverage --no-highlight lib lib-cov
	- DMM_COV=1 ./node_modules/mocha/bin/mocha -R html-cov > coverage.html
	rm -rf lib-cov

jslint:
	./node_modules/jsl/bin/jsl -process lib/dmm.js -process index.js

.PHONY: test