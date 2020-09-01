# Testing Guidelines
1. [Test Tooling](#test-tooling)
2. [Running Tests](#running-tests)
3. [Tested Areas](#tested-areas)
4. [Test Setup](#test-setup)
5. [Testing Practice](#testing-practice)

------


## Test Tooling

The app is setup to use [Jest](https://jestjs.io/) as its test runner.

Jest allows us to construct test assertions in the following manner:

```javascript
// Testing a function 'sum'
test('sum of 1 and 1 should equal 2', () => {
  expect(sum(1, 1)).toBe(2);
});
```

### _React Testing Library_

In conjunction with Jest, we use [react-testing-library](https://testing-library.com/docs/react-testing-library/intro) which provides tooling to unit test React components in isolation.

Components can be unit tested in this way:

```javascript
// render component in isolation
const { container, getByText } = render(<LoginComponent />);

// find the login button element
const loginButton = getByText('Log in');

// trigger a click event on it
fireEvent.click(loginButton);

// expect to detect loading text
expect(container).toContainHTML('<p>Loading</p>');
```

------
## Running tests

You may run the entire collection of test-suites using the command:

```bash
$ yarn test
```
You will be presented with test menu. You can press `a` to run all tests.

To run a particular test-suite:

```bash
$ yarn test src/components/button/Button.test.jsx
```

### _Debug mode_

If you are in a situation where you need to place breakpoints in the code, and have the tests halt in-place - place a `debugger;` command in a convenient location which the tests will pass through.

Then run the tests with:

```bash
$ yarn test:debug
```

The command will kick off the test runner, as well as a browser debugger (will use your default browser). You may have to activate the node debugger in your browser after running the above command (In chrome, it appears at the top of the open dev-tools panel, as the green node icon).

You may then interact with the code through the interactive javascript console.

### _Code coverage_

If you want to see how much of your source code has been covered by the tests, run the command:

```bash
$ yarn test:coverage
```

After the tests run, you will be presented with table summary of the coverage. For more coverage detail, open up the following file in your browser:

```bash
$ open coverage/lcov-report/index.html
```

You may then browse the coverage of each source file covered by the tests.

------


## Tested Areas

In general, unit testing files can be found alongside the component/module they are testing. In the app you will find the following test categories:

### _Component Unit Tests_ - `/src/components`

These tests are intended to instantiate their respective components in a manner that exhibits the features of the component. This is done by rendering the components with different `props` configurations, and asserting some expectation on the DOM.

The ideology behind `react-testing-library` is to not have to test specific implementation details. Rather, we set up a component in an advantageous fashion, and test the effect that it has on the DOM.


### _Reducer Tests_ - `/src/reducers`

These tests ensure the integrity of each aspect of the application's state (Redux state). It achieves this by constructing **actions** (defined in `/src/actions`) and applying them to the state in question. The resulting state is then asserted against to ensure it reflects what we expect.

### _Redux Saga Tests_ - `/src/sagas`

These tests are meant to ensure that the application's **side effects** are accurately accounted for. A 'side effect' in this context is any operation that needs to take place outside of the standard DOM event chain, e.g. Fetching external data, accessing the browser cache, etc.

This is achieved by instantiating the Saga's generator functions, and testing that each yield contains operations that we expect it to perform.

[Examples](https://redux-saga.js.org/docs/advanced/Testing.html) can be found here, in the redux-saga documentation.

------

## Test Setup
### _Structure_

In general, we wrap a test-suite in a top-level `describe` block, which contextualises all of the test cases that lie therein. If a particular number of test cases within the same test-suite apply to the same 'context' or 'configuration', we can further wrap them in a `describe` block.

Here's an example test structure of a `Button` component that behaves differently when disabled.

```javascript
describe('Button', () => {

  it('should render its label correctly', () => {
    ...
  }); 

  it('should be blue by default', () => {
    ...
  });
  
  describe('when disabled', () => {
  
    it('should be grey', () => {
      ...
    });
    
    it('should not respond to mouse clicks', () => {
      ...
    });
  });
});
```

#### _beforeEach_

Sometimes, within the context of a `describe` block, we have common operations that pertain to every test-case in the block.

```javascript

describe('Select', () => {
  describe('when the dropdown is open', () => {
  
    beforeEach(() => {
      // simulate click event that opens dropdown
    });
  
    it('should render the menu items', () => { /* assert */ });
    it('should show me the active menu item', () => { /* assert */ });
  });

});

```
The idea here is to try to reduce each test-case's code to just the assertion line (where possible), minimising setup code repetition and de-cluttering each test-case.


### _Assertions_

Test cases need to be as specific as possible, identifying a single characteristic to assert.

Ideally, we aim for a single assertion per test case. Any further asserts should be able to be represented by their own test case. This is meant to leave tests simple, clear and concise.

For example, given a `Tab` component, we want to test that clicking on a tab changes the active tab, and deactivates the rest.

Instead of:

```javascript
describe('Tabs', () => {
  it('should activate the correct tab, and deactivate every other tab when I click on it', () => {
    // simulate click event...
  	// assert activation...
  	// assert deactivation...
  });
});
```

It is better to write:

```javascript
describe('Tabs', () => {

  describe('when clicking a tab', () => {
  
    beforeEach(() => {
      // simulate click event
    });
    
    it('activates the correct tabs', () => {
      // assert activation
    });
    
    it('deactivates the correct tabs', () => {
      // assert deactivation
    });
  
  });
});
```

## Testing Practice

When submitting code for merge, Merge Requests should typically include tests that go along with the code being submitted. **Peer review should raise a concern when a standard is not being met.**

The goal would be to **never drop test coverage** when submitting any code. Running your test coverage script, as well as verifying with Gitlab CI, will let you know if you are dropping test coverage.

While it is ambitious to aim for 100% test coverage, we want to make sure that coverage is as high as it possibly can be.
