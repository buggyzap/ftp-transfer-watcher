# ftp-transfer-watcher

A module that let you create a daemon watcher that listen changes in given directory ( after wizard configuration ), create a files backup, transfer to given FTP and delete.

## Use cases

Any thirdy part integrations that require a file synchronization between local computer and server, or server to server.

## Workflow

- Start configuration Wizard with `npx ftp-transfer-watcher --config`
- Start manually with `npx ftp-transfer-watcher --watch` or run `npx ftp-transfer-watcher --install_service` to install a Windows Service (automatically start with OS)
- After any changes in `source` directory, files has been transferred to FTP and copied to local backup

## Commands

- `npx ftp-transfer-watcher --config`: Start configuration Wizard and create config.js
- `npx ftp-transfer-watcher --install_service`: Install Windows Service
- `npx ftp-transfer-watcher --uninstall_service`: Uninstall Windows Service
- `npx ftp-transfer-watcher --watch` : Start watcher

## Requirements

This package require node.js 14.x or higher and Git

## How to install

```
git clone https://github.com/buggyzap/ftp-transfer-watcher.git
npm install
# config
npx ftp-transfer-watcher --config
# start watcher
npx ftp-transfer-watcher --watch
```
