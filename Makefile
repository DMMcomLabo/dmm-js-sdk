test:
	npm test

coverage:
	./node_modules/jscoverage/bin/jscoverage --no-highlight lib lib-cov
	- DMM_COV=1 ./node_modules/mocha/bin/mocha -R html-cov > coverage.html
	rm -rf lib-cov

coveralls:
	./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage

jslint:
	./node_modules/jsl/bin/jsl -process lib/dmm.js -process index.js

docs:
	npm run-script build-docs

.PHONY: test
