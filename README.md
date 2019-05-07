# 助数詞を練習: Let's Study Counters!

A browser-based webapp to facilitate studying [Japanese counters](https://en.wikipedia.org/wiki/Japanese_counter_word). A lightweight app inspired by the simplicity of [WaniKani](https://www.wanikani.com/), this application allows the user to select packs of counters they would like to study, and then presents a quiz with random amounts of random items, requiring the user to correctly count the specified item in Japanese.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and deployment.

### Prerequisites

The project uses [Yarn](https://yarnpkg.com/) for package management.

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

## Built With

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/) - The web framework for the application
- [Redux](https://redux.js.org/) - State management for the application
- [webpack](https://webpack.js.org/) - Module bundler and build system
- [Yarn](https://yarnpkg.com/) - Package management

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
