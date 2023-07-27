# Docker dev env

- assumes your `.ssh` directory is at the root of your home directory on your machine
- on WSL, it is helpful if your user and group guid is set to 1002 to match the devuser in these containers

1. generate an ssh key
1. add that key to gitlab
1. copy `docker/gitconfig` to `docker/.gitconfig` and update the configuration
1. verify your ssh key: `ssh -T git@gitlab.com`
1. clone the repo via ssh
1. build the image: 

```sh
docker build --ssh default --build-arg GIT_REPO=git@github.com:lemke-ethan/webpack-module-federation.git --build-arg CLONE_DIR=webpack-module-federation --target ts-dev -t wp-mf-dev-env .
```

1. create the container:

```sh
docker create -p 3002:3000 --mount type=bind,src=${HOME}/.ssh,target=/home/devuser/.ssh --mount type=bind,src=/var/run/docker.sock,target=/var/run/docker.sock --shm-size=2gb --name wp-mf-dev-env -e DISPLAY=host.docker.internal:0 --security-opt seccomp=chrome.json -h wp-mf-dev-env -it wp-mf-dev-env
```

1. open vscode and install the remote development (ms-vscode-remote.vscode-remote-extensionpack) extension
1. start the dev env container
1. in vscode, open remote explorer
1. select dev containers from the dropdown at the top
1. connect to the dev env container
