# Zapier Frontend Engineering Mini Project

Please consider this document as a set of requirements, and deliver the code necessary to fulfill these requirements. If a requirement seems ambiguous, state your understanding of the requirements in a readme or inline comments along with your solution.

## Scenario

Your mission is to create a public gist viewer. Once finished, we should be able to search for a GitHub username and see all the public gists for that user. From each gist, we should be able to view all the files in that gist. To make things a little more interesting, we also want to be able to mark our favorite files inside a gist.

## Deliverables

There are two deliverables for this project:

1. A small JavaScript **library** that wraps the GitHub REST API for gists.
2. A single page **React app** that uses your small JavaScript library. (Most of your time will be spent here.)

## Specs

### Library:

- Your library should provide a function that, given a username, retrieves the public gists for that particular user.
- Your library should provide a function that, given a gist ID, retrieves a specific gist.
- Your library will be an internal module inside your project for now. No need to separately package it.
- You don't have to worry about authentication. Anonymous access is fine, since you're only retrieving public gists. (See note about our proxy below though.)
- Feel free to use any data-fetching libraries like axios, etc., if you prefer. Vanilla `fetch` tends to work just as well for this project though.
- Do **not** use any libraries specifically related to GitHub, for example a library that wraps GitHub’s REST API.

_Keep in mind that in the future, this API may grow to support more methods of GitHub's REST API._

Documentation for the gist REST API can be found here: https://developer.github.com/v3/gists/

Note that GitHub’s API allows any origin, and you can assume modern browsers, so there are no cross-origin or legacy issues to worry about.

GitHub's API is rate limited to 60 requests per hour for anonymous users. For that reason, you can use our proxy if needed. Simply replace api.github.com with zapier-frontend-test.herokuapp.com/api/github to use our proxy. So, for example, these two are equivalent:

* https://api.github.com/gists/abc123
* https://zapier-frontend-test.herokuapp.com/api/github/gists/abc123

### App:

- A text box should be provided to enter a username.
- After entering the username, it should list the public gists for that user in summary form. The summary should contain at least the description and the date the gist was created. (Feel free to provide additional properties if you want.)
- Clicking on a gist should open up a detail page for that gist.
- The detail of the gist should list all the files for that gist.
- The contents of each file in the gist must be viewable somehow, but you can decide how best to do this. You can choose whether to show links to each file in the gist, a summary view of each file that expands, or the full content of each file on the detail page, etc. However, your app must render the file contents, so do **not** open external links to GitHub. Otherwise, there's no right or wrong choice here, just your personal preference.
- Using a button, link, icon, etc., you should be able to mark a particular _file_ in a gist as a favorite. Once marked as a favorite, it should be clear (via text, icon, button state, etc.) that a particular file is a favorite. It should also be possible to unmark a particular file as a favorite.
- The list of favorites should be retained across different page views. So, for example, if a file "foo.txt" is marked as a favorite for username "foouser", and then a search is done for "baruser", "foo.txt" should still be marked as a favorite if we later search for "foouser" again and return to the "foo.txt" file. It is okay if favorites don't persist beyond a browser refresh.
- Some basic navigation/header should make it possible to return from a particular gist to the list of gists for a user and to perform a search for a different user, without having to refresh the browser or use the back button. It is okay if the browser’s URL doesn’t change while navigating.
- Do **not** use any third-party React components. All React components must be yours.
- Do **not** use any third-party hook libraries. You can only use built-in hooks like `useState`, `useEffect`, etc.
- Don’t worry too much about presentation. This means no particular CSS, fonts, or images are required. This is a coding activity and not a design activity. That’s not to say we don’t appreciate great design or that we don’t value those skills if you have them! It’s just that we won’t be considering design when scoring this particular project.
- Do make sure the available interactions are intuitive. In other words, we will be considering usability.

_Keep in mind that in the future, this app may grow to support additional features._

### Other

- Feel free to use any utility libraries like Lodash, Ramda, Moment.js, etc.
- Your project should have a package.json with all dependencies listed so that we can install with npm.
- Feel free to google for code examples, look at Stack Overflow, peek at React components on GitHub, etc. But please do **not** copy-paste third-party code into your project.
- Unit tests are not required. That's not to say we don't appreciate the value of unit tests, but they won't directly impact your score.

## How we'll review your code:

We did this project ourselves, so we should have a good time comparing versions. Once complete, _some_ of the criteria we'll be considering are:

* **Code Quality** - Is your code well structured and clean?
* **Completeness** - Did you complete an implementation that meets the spec?
* **Maintainability** - How easy would it be to add additional features?
* **Usability** - Is it intuitive and easy to use? (Again, we're not concerned with how it _looks_, just with how it _works_.)

## Project time limit:

Please do not spend more than four hours on the project. It's a good idea to wrap things up early and have time for cleanup, **even if that means that all features aren't complete**. As mentioned in the previous section, factors other than completeness will be considered.

Having said that, note also that completing the project in less than four hours will not improve your score. If you have extra time left, we’d love to see you improve your code or app in some way.

Be sure to commit your code regularly as you work through your solution. This is helpful for us to understand how you work. Especially if you have extra time and continue working, make sure to commit your working solution first! At the very least, you must commit and push to GitHub once in the four hour window, or we will not be able to score your solution. **Commits after 4 hours 15 minutes will not be scored.** Go over time? Don't worry! Wrap up and commit what you've got. We will still review everything up to the limit.

## Once finished

* To deliver your project, simply commit your final work and push to the `project` branch of the private GitHub repo provided by Zapier.
* Open a pull request to merge your `project` branch to `master`. Time spent opening up the pull request will **not** count as part of your project time, but please make sure to open the pull request within (roughly) one hour after your final commit.
* Make sure to add a description to your pull request with any details you want to provide.
* If you finish early and work on extra features but get into a buggy state, don't worry! Just commit the extra work to a different branch and mention it in your PR.
* Email us a link to your PR when you're ready for us to check it out!
