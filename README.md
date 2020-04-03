# Repo languages API

### About

This is a simple REST service providing the `github repos` that were created in the last 30 days & their languages.

#### N.B :

Due to hte purpose of this project, nothing has been deployed, which means that the repo needs to be run locally in order to check its functionality

### Documentation

- The `API documentation` can be accessed throuth its root link(http://localhost:5000/).

- The `Code documentation` can be accessed from http://localhost/5000/docs, or by checking the files, each function will have a header containing a description and the params list for each one if it does have any

- The actual endpoints can be accessed by adding `/api/v1/` to the root url.

  `Example:` http://localhost/5000/api/v1/repos

### Scripts

After changing the directory into the repo's, you can run the following commands

```bash
  npm install

  npm start # to run the production server

  npm run server # to run the development server
```
