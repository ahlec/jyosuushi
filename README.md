# 助数詞を練習: Let's Review Japanese Counters!

[![CircleCI](https://circleci.com/gh/ahlec/jyosuushi.svg?style=svg)](https://circleci.com/gh/ahlec/jyosuushi)

A browser-based webapp to facilitate studying [Japanese counters](https://en.wikipedia.org/wiki/Japanese_counter_word). A lightweight app inspired by the simplicity of [WaniKani](https://www.wanikani.com/), this application allows the user to select packs of counters they would like to study, and then presents a quiz with random amounts of random items, requiring the user to correctly count the specified item in Japanese.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and deployment.

### Prerequisites

The project uses [Yarn](https://yarnpkg.com/) for package management.

Additionally, if you're going to be changing the favicon, make sure to globally install `cli-real-favicon`.

```
yarn global add cli-real-favicon
```

I haven't found a way to get this to work without being a global installation.

### Installing

1. Clone the repo

```
git clone https://github.com/ahlec/jyosuushi.git
```

2. Install packages

```
yarn install
```

3. Start the development server

```
yarn start
```

At this point, you can navigate to `http://localhost:8080/`. As of right now, there is no persistence of data on a server or backend, so no setup of this kind is necessary for running or deployment.

## Deploying

When you're ready to publish the webapp, all you need to do is build the application.

```
yarn build
```

This will create the `build/` directory. On a successful build execution, copy the `build/` directory to a web directory on your server.

## Changing the favicon

If you find yourself needing to change the favicon, export the full-resolution file to the root `favicon.png` file. After that, use the package script to generate the various favicon files.

```
yarn favicon
```

## Updating data

All of the data for the application is managed through a SQLite database for ease of use; the database allows us to have oversight in the way of foreign and unique keys while also cutting down to the bare minimum of necessary boilerplate.

The database itself is not committed to the repository because, as a binary file, resolving merge conflicts is nigh impossible. Instead, we store the SQL files for the contents and can rebuild the database at any moment.

When you're working on data, the first step will be updating your local database.

```
yarn db:update
```

This will create a local database if you didn't already have one, and will also pull in all of the changes to your database to bring it up to date.

You then modify the SQLite database `jyosuushi.sqlite` in the root directory directly. When you have made your changes, you'll then need to run the script to export the data from there into TypeScript.

```
yarn db:export
```

When this is done, it will update the files in the `./data` directory. Subsequent builds or development servers will build against these updated files. Additionally, these files are tracked in the repository to allow for painlessly building after cloning the repository.

When you are ready to submit a commit, you will need to dump all of your database back to the SQL files. To do this, you'll want to use another package script:

```
yarn db:dump
```

## Built With

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/) - The web framework for the application
- [Redux](https://redux.js.org/) - State management for the application
- [webpack](https://webpack.js.org/) - Module bundler and build system
- [Yarn](https://yarnpkg.com/) - Package management
- [SQLite](https://www.sqlite.org/index.html) - Pre-build database for quiz data

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ahlec/jyosuushi/tags).

## Authors

- **Alec Deitloff** - _Initial work_ - [ahlec](https://github.com/ahlec)

See also the list of [contributors](https://github.com/ahlec/jyosuushi/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- [WaniKani](https://www.wanikani.com/) - Inspiration and a constant guiding light
- [jquery-kana-input](https://github.com/argelius/jquery-kana-input) - Implementation basis for making a kana-based input box
