FROM mcr.microsoft.com/playwright:v1.34.0-jammy as base 
ARG DEBIAN_FRONTEND=noninteractive
RUN yes | unminimize
RUN apt-get update
RUN apt-get -y install git fzf ripgrep curl python3 ssh sudo locales gnupg lsb-release libnss3-tools upower uuid-runtime
# Install docker cli
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt-get update
RUN apt-get -y install docker-ce-cli
# Make buildx the default builder
RUN docker buildx install
# Give container user access to docker socket (which will be bound at container run time)
RUN touch /var/run/docker.sock
RUN chgrp sudo /var/run/docker.sock
# Install docker compose v2
RUN curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/libexec/docker/cli-plugins/docker-compose
RUN chmod +x /usr/libexec/docker/cli-plugins/docker-compose
RUN curl -fL https://github.com/docker/compose-switch/releases/download/v1.0.5/docker-compose-linux-amd64 -o /usr/local/bin/compose-switch
RUN chmod +x /usr/local/bin/compose-switch
RUN update-alternatives --install /usr/local/bin/docker-compose docker-compose /usr/local/bin/compose-switch 99
# Set the locale
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
#setup dev user
RUN useradd -ms /bin/bash -u 1002 -G sudo devuser
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
WORKDIR /home/devuser
ENV TERM="xterm-256color"
ADD https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash .git-completion.bash
ADD https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh .git-prompt.sh
COPY bashrc .bashrc
COPY .gitconfig .gitconfig
RUN chown -R devuser /home/devuser
# used by dbus/chrome
RUN mkdir /run/user/1002
RUN sudo chmod 700 /run/user/1002
RUN sudo chown devuser /run/user/1002
USER devuser
RUN mkdir -p -m 0700 ~/.ssh
# Add public keys for well known repos
RUN ssh-keyscan github.com >> ~/.ssh/known_hosts
RUN ssh-keyscan ssh.dev.azure.com >> ~/.ssh/known_hosts
COPY sshconfig .ssh/config
ENTRYPOINT bash

FROM base AS ts-dev
ARG GIT_REPO
ARG CLONE_DIR
SHELL ["/bin/bash", "--login", "-c"]
# install nvm with a specified version of node; could use a node base image, but this is
# more flexible
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
&& . ~/.nvm/nvm.sh \
&& nvm install lts/gallium
# mount the ssh-agent port as the current user for purposes of cloning private repos
RUN --mount=type=ssh,uid=1002 git clone ${GIT_REPO} ${CLONE_DIR}
WORKDIR /home/devuser/${CLONE_DIR}
# deps for webkit browser
RUN sudo apt-get update && sudo apt-get install -y gstreamer1.0-gl gstreamer1.0-plugins-ugly
VOLUME /home/devuser/$CLONE_DIR