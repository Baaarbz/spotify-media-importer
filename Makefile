run-app:
	npm run build
	npm run electron

package-dist:
	npm run build
	npm run package:dist
	npm run postinstall

package-dir:
	npm run build
	npm run package:dist
	npm run postinstall
