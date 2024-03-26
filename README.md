# Git Config

## Git commands

```
git config --global alias.st "status -s"
git config --global alias.cb "checkout -b"
git config --global alias.db "branch -d"
git config --global alias.gl "log --all --decorate --oneline --graph -10"
git config --global alias.gl2 "log --decorate --oneline --graph -10"
git config --global alias.amend "commit --amend --no-edit"
```

## Git SSH

```
@echo off
call "C:\Program Files\Git\cmd\start-ssh-agent.cmd"
cd /d <starting dir>
```
