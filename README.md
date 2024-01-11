

# Mailer backend

A coursework for UzhNU. An e-mailing app that utilizes Node.js runtime and follows clean architecture approach.

## Table of Contents

- [Setup](#setup)
- [Todos](#todos)

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yevhenprudnik/mailer-backend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd mailer-backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```
4. Setup postgres database:

    ```bash
    cd db && ./setup.sh
    ```
5. Start the app:

    ```bash
    npm start
    ```
6. Ensure the app is running:

    ```bash
	curl http://localhost:3000/root/healthcheck
    ```
## Todos:
1. Implement publish functionality.
2. Add input validation for use case handlers.
3. Add tests.
