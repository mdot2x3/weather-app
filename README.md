# webpack-template

Webpack template files with configuration and node modules prepared.
ESLint and Prettier also installed and configured.

This template is set up to run webpack via scripts located in package.json.

To run webpack:
Enter 'npm run + script name' ('build', 'dev', 'deploy') -- example 'npm run dev'

'npm run build' is equivalent to running 'npx webpack',
'npm run dev' is equivalent to running 'npx webpack serve', and
'npm run deploy' runs 'git subtree push --prefix dist origin gh-pages' which is the final step in the webpack deployment process.

To run ESLint:
Enter 'npx eslint yourfile.js' on any file or directory via the command line.

To run Prettier:
Enter 'npx prettier --write .' to format the entire project, or
'npx prettier --write app/' to format a certain directory, or
'npx prettier --write app/components/Button.js' to format a certain file.
