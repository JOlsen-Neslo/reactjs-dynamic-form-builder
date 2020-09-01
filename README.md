# reactjs-dynamic-form-builder
Dynamic form builder written in ReactJS

Stand-alone front end application for our app.

## Configuring the application

### Environment

The application contains a `sample.env` file containing all necessary environment variables needed
for the application to function.

Copy this file, name it `.env` and keep it under the root of the project for React Scripts to parse
the provided environment variables.

All environment variables need to be prefixed with `REACT_APP_` to be parsed by React Scripts.


### Setup

This application was built using **node v12.16**. We recommend using a node package manager like `nvm`, `nodenv` or similar, for simple management of node version on your system.

From the root folder, simply run a

```bash
$ yarn
```
or

```bash
$ yarn install
```
---
## Running the application

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


### `yarn storybook`

Runs Storybook at [http://localhost:9009](http://localhost:9009) by default.

You may use the Storybook to browse all the components that are used within the app. Storybook works well as a construction tool, for composing your components in isolation.


### `yarn test`

Launches the test runner in the interactive watch mode.

For more details regarding testing setup and practice, please see the [Testing Readme](TestingGuidelines.md).


### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.


---

## Running the application with Docker

To run the application with Docker, run the following commands:

`$ docker build -t form-builder:latest .`

`$ docker run -p 80:80 form-builder:latest`

---

## Other reading

- [Testing Guidelines](TestingGuidelines.md)
- [Stylesheet Guidelines](StylesheetGuidelines.md)

