# ftp-transfer-watcher

A module that let you create a daemon watcher that listen changes in given directory ( after wizard configuration ), create a files backup, transfer to given FTP and delete.

## Use cases

Any thirdy part integrations that require a file synchronization between local computer and server, or server to server.

## Workflow

- Start configuration Wizard with `npx . --config`
- Start manually with `npx . --watch` or run `npx . --install_service` to install a Windows Service (automatically start with OS)
- After any changes in `source` directory, files has been transferred to FTP and copied to local backup

## Commands

- `npx . --config`: Start configuration Wizard and create config.js
- `npx . --install_service`: Install Windows Service
- `npx . --uninstall_service`: Uninstall Windows Service
- `npx . --watch` : Start watcher

## Requirements

This package require node.js 14.x or higher and Git

## How to install

```
git clone https://github.com/buggyzap/ftp-transfer-watcher.git; cd ftp-transfer-watcher; npm install;
# config
npx . --config
# start watcher
npx . --watch
```
