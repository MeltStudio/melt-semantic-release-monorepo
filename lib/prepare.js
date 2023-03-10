const replace = require('replace-in-file');
const { getWorkspacesInfo } = require('./yarn-utils');

function prepare(_, context) {
  const {
    stdout,
    stderr,
    nextRelease: { version },
    logger,
  } = context;

  logger.info('Getting yarn workspaces info');

  const workspacesInfo = getWorkspacesInfo(stdout, stderr);
  const workspaces = Object.keys(workspacesInfo);

  const files = Object.values(workspacesInfo).map(
    ({ location }) => `${location}/package.json`
  );

  const options = {
    files: ['package.json', ...files],
    processor: (input) => {
      let modified = input.replace(
        /"version": ".*"/,
        `"version": "${version}"`
      );
      modified = workspaces.reduce(
        (acc, workspace) =>
          acc.replace(
            new RegExp(`"${workspace}": ".*"`),
            `"${workspace}": "${version}"`
          ),
        modified
      );

      return modified;
    },
  };

  replace.sync(options);
}

export default prepare;
