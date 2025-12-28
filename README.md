# 助数詞を練習: Let's Review Japanese Counters!

A browser-based webapp to facilitate studying [Japanese counters](https://en.wikipedia.org/wiki/Japanese_counter_word). A lightweight app inspired by the simplicity of [WaniKani](https://www.wanikani.com/), this application allows the user to select packs of counters they would like to study, and then presents a quiz with random amounts of random items, requiring the user to correctly count the specified item in Japanese.

## Installation

1. **Globally install [mise-en-place](https://mise.jdx.dev/).**

   This manages the versions of all other tools and is the only application required to be installed globally. When you `cd` into the repository, the tools in [mise.toml](https://github.com/ahlec/jyosuushi/blob/master/mise.toml) will automatically be installed.

   Confirm that everything is working by running

   ```bash
   which node
   ```

   You should see a path like `/Users/my-user/.local/share/mise/installs/node/24.12.0/bin/node`. If you don't, run `mise activate` in your terminal and [add it to your shell's rc file](https://mise.jdx.dev/cli/activate.html).

2. **Install depdendencies.**

   ```bash
   yarn install
   ```

3. **Generate development files.**

   ```bash
   yarn codegen
   ```

   This will produce type declaration files for the SCSS files, which are required to exist in order to pass type checking.

4. **Create the development config file.**

   ```bash
   cp config.json-template config.json
   ```

   This file defines required environment variables for development. If it doesn't exist, the application will not run.

5. **Start the local server**

   ```bash
   yarn start
   ```

   This will host the local server at http://localhost:8080.

## Editing data

All data (counters, items, sets, etc) are authored and modified within a lightweight SQLite database. CLI scripts will take this data and transform it into runtime data, which is then built into the deployed app.

The database is built from SQL files found in the [sql/ directory](https://github.com/ahlec/jyosuushi/tree/master/sql).

> [!WARNING]
> Creating the SQLite database starts by deleting what was there already. If you have local changes, make sure to first run `yarn db:dump` to save your changes to SQL files.

1. **Create your local database.**

   ```bash
   yarn db:create
   ```

   This will create a new SQLite database from all of the SQL files in the directory.

2. **Open the SQLite file in your editor of choice.**

   The database file is saved as **jyosuushi.sqlite** in the root of the repository.

   The SQLite database is purely for authoring data, and isn't used directly by the runtime. Changes you make to the SQLite database will not automatically show up in the application. Continue to the next steps to export your data for runtime.

3. **Check for data errors.**

   ```bash
   yarn db:audit
   ```

   This will lint the database, looking for data errors that would block exporting (eg, a counter defined without any readings) or warnings (eg, a non-essential field is empty). Resolve all errors and be aware of the warnings flagged.

4. **Update your runtime files.**

   ```bash
   yarn db:export
   ```

   This runs a complex transformation pipeline that creates the files in the [data/ directory](https://github.com/ahlec/jyosuushi/tree/master/data) from the SQLite database.

   At this stage, you can now see your data changes in the local server.

5. **Save your data changes.**

   ```bash
   yarn db:dump
   ```

   This command will take the full contents of your SQLite database and export them to the [sql/ directory](https://github.com/ahlec/jyosuushi/tree/master/sql). These files (and the exported/updated runtime files) are then committed to Git.

### Updating your database

The workflow for updating your database when you sync the repository is to:

1. **Dump your database**.
   Use the `yarn db:dump` command. You can then commit these changes or `git stash` them for later.

   You can skip this step if you don't have changes, or if you want to discard ALL changes you've made to your database.

2. **Recreate the database.**
   Use `yarn db:create` to delete your old database file and recreate it from the SQL files currently checked out.

All resolution of merge conflicts are done to the SQL files.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- [WaniKani](https://www.wanikani.com/) - Inspiration for the product and some design direction.
- [jquery-kana-input](https://github.com/argelius/jquery-kana-input) - Implementation basis for making a kana-based input box.
