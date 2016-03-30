test:
	npm test

coverage:
	./node_modules/jscoverage/bin/jscoverage --no-highlight lib lib-cov
	- DMM_COV=1 ./node_modules/mocha/bin/mocha -R html-cov > coverage.html
	rm -rf lib-cov

test-istanbul:
	make clean
	./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- --require should -R spec

coveralls:
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

jslint:
	./node_modules/jsl/bin/jsl -process lib/dmm.js -process index.js

clean:
	rm -rf ./coverage

docs:
	npm run-script build-docs

.PHONY: test
