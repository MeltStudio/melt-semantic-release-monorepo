# @meltstudio/semantic-release-monorepo

[**semantic-release**](https://github.com/semantic-release/semantic-release)
plugin to bump the version in all the `package.json`s inside a monorepo. This
plugin also updates the version for the internal dependencies.

_Note:_ This plugin only supports yarn monorepos.

| Step      | Description                                                                     |
| --------- | ------------------------------------------------------------------------------- |
| `prepare` | Update the `package.json` and internal dependencies versions in all workspaces. |

## Install

```bash
$ yarn add --dev @meltstudio/semantic-release-monorepo
```

## Usage

The plugin can be configured in the
[**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@meltstudio/semantic-release-monorepo"
  ]
}
```

## Configuration

### Options

| Options                   | Description                                                 | Default |
| ------------------------- | ----------------------------------------------------------- | ------- |
| `replaceInternalPackages` | Whether or not to replace the version for internal packages | `false` |
