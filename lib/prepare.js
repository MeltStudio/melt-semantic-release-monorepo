const { getPackagesSync } = require('@manypkg/get-packages');
const replace = require('replace-in-file');

function prepare(config, context) {
  const {
    nextRelease: { version },
    cwd,
    logger,
  } = context;

  logger.info('Getting list of monorepo packages');
  const { packages } = getPackagesSync(cwd);

  const workspacesNames = packages.map((pkg) => pkg.packageJson.name);
  logger.info(`Got the following packages: ${workspacesNames.join(', ')}`);

  const packageJsonFiles = packages.map(({ dir }) => `${dir}/package.json`);
  logger.info(
    `Got the following package json paths: ${packageJsonFiles.join(', ')}`
  );

  const options = {
    files: ['package.json', ...packageJsonFiles],
    processor: (input) => {
      let modified = input.replace(
        /"version": ".*"/,
        `"version": "${version}"`
      );
      if (config.replaceInternalPackages) {
        modified = workspacesNames.reduce(
          (acc, workspaceName) =>
            acc.replace(
              new RegExp(`"${workspaceName}": ".*"`),
              `"${workspaceName}": "${version}"`
            ),
          modified
        );
      }

      return modified;
    },
  };

  replace.sync(options);
}

module.exports = prepare;
