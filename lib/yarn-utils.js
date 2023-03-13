const { spawnSync } = require('child_process');

// {
//   [workspace_name]: {
//     "location": string, // relative path from the root
//     "workspaceDependencies": string[], // name of the dependencies
//     "mismatchedDependencies": string[]
//   }
// }
function getWorkspacesInfo() {
  const { stdout } = spawnSync('yarn', ['workspaces', 'info']);

  try {
    return JSON.parse(stdout.toString());
  } catch (error) {
    const clean = stdout
      .toString()
      .replace(/^.*\n/, '')
      .replace(/\n.*\n$/, '');
    return JSON.parse(clean);
  }
}

module.exports = {
  getWorkspacesInfo,
};
