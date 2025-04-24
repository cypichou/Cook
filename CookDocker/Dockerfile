FROM mysql:8.0

RUN apt-get update && apt-get install -y locales \
    && locale-gen fr_FR.UTF-8 \
    && update-locale LANG=fr_FR.UTF-8

ENV LANG fr_FR.UTF-8
ENV LANGUAGE fr_FR:fr
ENV LC_ALL fr_FR.UTF-8
