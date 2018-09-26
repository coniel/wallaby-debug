# Developer guide <!-- omit in toc -->

## Table of contents <!-- omit in toc -->

- [Project conventions](#project-conventions)
  - [Code naming conventions](#code-naming-conventions)
  - [File naming conventions](#file-naming-conventions)
- [Project structure](#project-structure)
  - [ui](#ui)
  - [modules](#modules)
  - [libs](#libs)
  - [apps](#apps)
- [Redux](#redux)
  - [Actions](#actions)
  - [Reducers](#reducers)

## Project conventions

### Code naming conventions

| Code                 | Convention          |
| -------------------- | ------------------- |
| variables, constants | camelCase           |
| redux type constants | ALL_CAPS_SNAKE_CASE |
| functions            | camelCase           |
| components           | PascalCase          |

### File naming conventions

| File type                | Convention |
| ------------------------ | ---------- |
| component directory/file | PascalCase |
| module directory         | PascalCase |
| other directories/files  | kebab-case |

> Note: we use the `.js` extension even for files containing JSX.

## Project structure

We use yarn workspaces to turn the project into a manageable monorepo. The repo contains all of the individual apps (web and native) and their components/modules/libraries/etc which make up both the admin and client systems.

The root directory contains config files (e.g. .eslintrc) which are applied to the entire repo. The source code is organised into packages under the `packages` directory.

The packages are organised as follows:

- **ui** simple, standalone UI components (e.g. buttons) which are shared accross projects
- **modules** modules consiting of components, containers, reducers (e.g. lesson module) which are shared accross projects
- **libs** libraries, helpers and imported library setups (e.g. apollo)
- **apps** the actual apps (web and native) which will be bundled and deployed

### ui

Note that `packages/ui` in itself is a single package containing all the UI components rather than each component being its own package.

Every UI component should be created in its own directory under the `ui` package. The name of the directory should be the name of the component in PascaleCase (same goes for component files). The directory must contain:

- **`ComponentName.js`** the file in which the component is implemented
- **`ComponentName.test.js`** tests for the component implementation
- **`index.js`** a file which exports `default` from `ComponentName.js`

```js
/LargeButton
  index.js
  LargeButton.js
  LargeButton.test.js
```

```js
// index.js

export { default } from './LargeButton'

```

Components may contain sub-components if they are closely tied to the component and will not likely be used individually from the parent component. For example, a `UnitList` component which renders a list of units, would contain a `UnitListItem` sub-component. Sub-components should be created in a sub-directory inside the parent component's directory. They should contain the same file structure, with the exception of the index.js file which is not needed. Instead, add a named export the the parent's index.js file.

```js
/UnitList
  index.js
  UnitList.js
  UnitList.test.js
  /UnitListItem
    UnitListItem.js
    UnitListItem.test.js
```

```js
// index.js

import UnitListItem from './UnitListItem/UnitListItem';
export UnitListItem;

export { default } from './UnitList';

```

### modules

Modules make up the core functionality of apps. For example, the `Lesson` module is used in the `ibguides` app to enable students to complete lessons.

Modules should limit themselves to a single general purpose. For example, the `Lesson` module should only provide the functionality to do lessons. It should not provide any admin functionality. A seperate `LessonEditor` module (which can make use of the `Lesson` module for previewing) is used to allow the edditing of lessons.

A module should make use of at least one container. If a module does not require a container, it is classed as a UI component and belongs in the `ui` package.

### libs

### apps

## Redux

### Actions

All actions must follow the Flux standard action pattern:

An action MUST

* be a plain JavaScript object.
* have a `type` property.

An action MAY

* have an `error` property.
* have a `payload` property.
* have a `meta` property.

An action MUST NOT include properties other than `type`, `payload`, `error`, and `meta`.

#### Example <!-- omit in toc -->

A basic Flux Standard Action:

```js
{
  type: 'ADD_TODO',
  payload: {
    text: 'Do something.'  
  }
}
```

An FSA that represents an error, analogous to a rejected Promise:

```js
{
  type: 'ADD_TODO',
  payload: new Error(),
  error: true
}
```

### Reducers

Reducers should be kept small and locted in the same directory as the primary container which uses them.

```
/Foo
  foo-reducer.js
  foo-reducer.test.js
  FooContainer.js
  FooContainer.test.js
  Foo.js
  Foo.test.js
  index.js
```

Reducers should follow the ducks pattern:

1. MUST `export default` a function called `reducer()`
2. MUST `export` its action creators as functions
3. MUST have action types in the form `module/reducer/ACTION_TYPE`
4. MAY export its action types as `UPPER_SNAKE_CASE`, if an external reducer needs to listen for them, or if it is a published reusable library

You can then do:

```js
import * as fooActions from './foo-reducer';
```

...and it will only import the action creators, ready to be passed to `bindActionCreators()`.

> Actually, it'll also import `default`, which will be the reducer function. It'll add an action creator named `default` that won't work. This is not a problem.

```javascript
// foo-reducer.js

// Actions
const LOAD   = 'Foo/foo/LOAD';
const CREATE = 'Foo/foo/CREATE';
const UPDATE = 'Foo/foo/UPDATE';
const REMOVE = 'Foo/foo/REMOVE';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default: return state;
  }
}

// Action Creators
export function loadWidgets() {
  return { type: LOAD };
}

export function createWidget(widget) {
  return { type: CREATE, payload: widget };
}

export function updateWidget(widget) {
  return { type: UPDATE, payload: widget };
}

export function removeWidget(widget) {
  return { type: REMOVE, payload: widget };
}
```
