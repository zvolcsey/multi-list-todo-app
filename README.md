# To-do List Portfolio Project

## Overview

> ### TypeScript + React + React Context API to-do list portfolio project

## Table of Contents

1. [Features](#features)
2. [Run locally](#run-locally)
3. [Port](#port)
4. [License](#license)

## Features

* **Core CRUD Functionality**:
  * **Create**: Users can add new to-do items using the `AddTodo` component. This includes input validation to ensure that users only add valid to-do items.
  * **Read**: The `TodoList` component displays the list of existing to-do items. It allows users to view all their current task.
  * **Update**: (Planned) Users will be able to change their existing to-do items.
  * **Delete**: (Planned) Users will be able to remove their existing to-do items from the list.
* **Validation**:
  * Frontend validation helps to check the recently created to-do items.
* **State management**:
  * The project uses the **React Context API** for state management. This approach ensures efficient data flow without the need for prop drilling.
  * **Todo Context**: `Todo Provider` component wraps around the app. It provides the **todos** state and related functions to all consumer components. It allows them to access and manipulate the **todos** state.

## Run locally

You need have Node.js 20 or higher.

- clone the repository

```sh
  npm ci
  npm run dev
```

## Port

The project uses 5173.

## License

MIT
