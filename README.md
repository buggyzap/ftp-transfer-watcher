# ftp-transfer-watcher

A module that let you create a daemon watcher that listen changes in given directory ( after wizard configuration ), create a files backup, transfer to given FTP and delete.

## Use cases

Any thirdy part integrations that require a file synchronization between local computer and server, or server to server.

## Workflow

- Start configuration Wizard with `npm run config`
- Start manually or run `npm run install-svc` to install a Windows Service (automatically start with OS)
- After any changes in `source` directory, files has been transferred to FTP and copied to local backup

## Commands

- `npm run config`: Start configuration Wizard and create config.js
- `npm run install-svc`: Install Windows Service
- `npx .` : Start watcher

## Requirements

This package require node.js 14.x or higher

## How to install

```
npm i ftp-transfer-watcher
npm run config
```
