const { spawnSync } = require('child_process');

// {
//   [workspace_name]: {
//     "location": string, // relative path from the root
//     "workspaceDependencies": string[], // name of the dependencies
//     "mismatchedDependencies": string[]
//   }
// }
function getWorkspacesInfo(logger) {
  const { stdout: version } = spawnSync('yarn', ['--version']);
  logger.info(`Using yarn version: ${version}`);

  logger.info('Getting yarn workspaces info');
  const { stdout: info } = spawnSync('yarn', ['workspaces', 'info']);

  logger.info(`Got response from yarn: ${info}`);
  const infoStr = info.toString();

  try {
    return JSON.parse(infoStr);
  } catch (error) {
    logger.info('Raw parse failed, trying to clean the workspaces info');
    const firstIdx = infoStr.indexOf('{');
    const lastIdx = infoStr.lastIndexOf('}');
    if (firstIdx === -1 || lastIdx === -1) {
      logger.error(
        `Workspaces info string does not seem to contain a JSON string`
      );
      throw new Error('Could not parse workspaces info');
    }

    const cleanInfoStr = infoStr.substring(firstIdx, lastIdx + 1);
    logger.info(`Trying to parse JSON string: ${cleanInfoStr}`);

    return JSON.parse(cleanInfoStr);
  }
}

module.exports = {
  getWorkspacesInfo,
};
