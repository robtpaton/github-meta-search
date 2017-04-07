# github-meta-search

> Node CLI tool for searching for code across matching github repositories

Currently Github search does not allow for queries like "search repos with label X for code Y". This tool uses the Github API to bridge this gap.

## Installation

```
npm install -g github-meta-search
```

## Configuration

Before using the tool you will need to create a Github access token (using the [Github web interface](https://github.com/settings/tokens/new?scopes=repo&description=githubmetasearch)), and store it in a `.githubmetasearchrc` configuration file in your home directory.

An example configuration file has been provided in [.githubmetasearchrc.example](.githubmetasearchrc.example).

The `rc` package is used for config loading, and it supports many different methods of reading configuration. Advanced users can ready the [rc docs](  https://www.npmjs.com/package/rc#standards) for more info.

## Usage

To see usage information:

```shell
$ githubmetasearch --help
```

To search all repos with the topic `node` for the code `button`:

```shell
$ githubmetasearch --repo-query=topic:node button
```

If there is a `repo-query` property in your configuration file, you don't need to provide one on the command line:

`.githubmetasearchrc`
```
{
  ...
  "repo-query": "topic:node"
  ...
}
```

```shell
$ githubmetasearch button
```
