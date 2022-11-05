install: # установка зависимостей
	npm ci
lint: # запуск линтера
	npx eslint
test: # запуск тестов
	npm test
test-coverage: # test-coverage
	npm test -- --coverage --coverageProvider=v8
