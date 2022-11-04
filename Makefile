install: # установка зависимостей
	npm ci
lint: # запуск линтера
	npx eslint
test: # запуск тестов
    npm test