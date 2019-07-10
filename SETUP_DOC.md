# Zapier Frontend Engineering Mini Project Setup

We want your Zapier project to go as smooth as possible! Instead of starting from scratch, following are some bullet points to help you get a blank canvas ready. When the clock starts on your project, you should be able to just start coding!

## 1. Clone this repo

```bash
git clone https://github.com/zapier-interviews/yourreponame.git
cd yourreponame
```

Your repo will be named something like `interview-yourname-abc123`. Use the real repo name in place of `yourreponame`. Use SSH or HTTPS, whatever works for you.

## 2. Create a branch for your project

All work for the project should be done on a branch named `project`, and after completing your project, you'll create a pull request to merge it to `master`.

```bash
git checkout -b project
```

## 3. Seed your project

Set up a working npm project in a subdirectory named `project`. It should build a JS bundle and serve it locally. While we won't be building a node.js project, we will be making a very small single-page app, so optimize for that. We highly recommend create-react-app (https://github.com/facebookincubator/create-react-app) to make things really easy. You’re welcome to use any other boilerplate or your own, but create-react-app makes it quick and easy to seed a working React project. Make sure your app starts with the `npm start` command.

So if you use create-react-app, from within the cloned repo directory:

```bash
npx create-react-app project
cd project
npm start
```

Or if you're using `yarn`:

```bash
yarn create react-app project
cd project
yarn start
```

And you're done with this step!

## 4. Push your seed project

Push your seed project to your private zapier repo to make sure everything is working.

```bash
git add .
git commit -m "seed project"
git push -u origin project
```

If you're reading this file, everything should be fine with permissions. But if for some reason this doesn't work, let us know!

## 5. Prepare your project

You'll have to wait until you start your project to see the actual project spec. For now, we can tell you: you'll receive a simple REST API, and you'll build a simple React app to render data from that API. You might need to manage a couple of "pages" in your app, but no complex routing will be required (i.e., the URL doesn't have to change). So prepare your project accordingly!

Feel free to add any npm modules you need, with the following caveats.

- Avoid large frameworks, CMS’s, etc.
- **Do not add any third-party React components or hooks.** This includes presentation components like those from `material-ui` and `styled-components`, for example. It also includes container components like those from `react-redux` which has a `Provider`, `react-router` which has a `Router` component, and `react-apollo` which has a `Query` component. This also includes higher-order components like `connect` from `react-redux` or `observer` from `mobx-react`. And it includes hook libraries like `react-use` or `constate`. Feel free to use things like `redux`, `mobx`, or `apollo-client` directly, but you'll have to wire them up yourself! And feel free to use built-in hooks that you can import from `react`.
- If in doubt, ask us if a particular module is okay.

Feel free to use any generic utility libraries like Lodash, Ramda, Moment.js, etc.

Feel free to use any generic data-fetching libraries like whatwg-fetch, axios, etc.

Feel free to add your own code that you think might help you (including React components). You will likely be asked to explain this code in a follow-up interview, so be sure to keep it simple and specific to this project.

You won't need to worry much about presentation. This means no particular CSS, fonts, or images are required for the project.

You won't be expected to write any unit tests. Normally we love tests! But the spec in this case is pretty narrow, so we don't want to take up your time by having you write tests.

## 6. Push your prepared app

Once you’re satisfied with your project setup, push your project again.

```bash
git add .
git commit -m "project ready"
git push origin project
```

---

**It is essential** to have the items above completed ahead of time. You need to have this setup complete before you start the skills interview so you can spend most of your available time coding instead of dealing with configuring the setup.

---

## 7. Get ready

Find a good spot to work with reliable internet and a four-hour block of time free of distractions so you can focus and do your best work. We understand this is a significant block of time for you while it's also difficult to complete a full project in just four hours. Normally, we'd want you to take your time to write your highest quality code with proper unit tests, etc. In this case, we want to be respectful of your time even if it seems like a bit of a rush. We're cheering for you!

If you use alternative input devices or other assistive technology, please let us know if you need additional time.

---

## 8. Begin!

Head over to [this page and fill out the form](https://zapier.wufoo.co.uk/forms/zapier-engineering-skills-test/) to get started with your project. Once you submit the form, a PROJECT_SPEC.md file will be added to the `project` branch of your repository with details of the project.
