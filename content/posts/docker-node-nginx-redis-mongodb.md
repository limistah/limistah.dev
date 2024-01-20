---
title: Dockerized Node/Nginx, MongoDB, Redis app setup
date: 2020-03-19
tags: [JS]
---
## Introduction

Docker is an app development tool that eases the process of creating, running,  and deploying applications. It uses the concept of containers which work just like a Virtual Machine does.

While Docker runs more like a Virtual Machine does, it is more advantageous than a VM.

It let us define OS-like images like we are writing an actual OS that includes the only tools that we need, aside this, Docker utilizes the concept of layers which makes its images very much extensible. With this little feature, developers, sysadmins and devops engineers prefer it more. And since it has been in existence, Docker has witnessed widespread usages making it one of the defacto tool for software development, testing and delivery.

While there are many low level details about Docker which we won't be doing in this post. In this post, we will focus on creating a docker compose file that could ease the development and deployment of NodeJS based web applications which require an nginx server which acts as a proxy server to a NodeJS application, MongoDB as the database and Redis as its dependencies.

## Base Dockerfile

First, we will define a `Dockerfile` this is a file that Docker reads to create an image which could be used to start a container.

This file has some interesting [commands](https://docs.docker.com/engine/reference/builder/) but we are only interested in a few. This file should look like below:


```dockerfile
# Base Image.
# This image already exists in dockerhub.
# We are just extending its functionalities
FROM node:10

# Already created by the node image 
USER node

# Changes directory in the container to this directory
WORKDIR /home/node/app

# Port that the node app will listen to
EXPOSE 8000 

```

The above Dockerfile commands is what we can use when we are defining an image. Images are typical to installing a fresh operating system, instead of having a full OS on a different machine, Docker builds this image to work with any computer without installing it.

An operating system image inside of another OS is not new, it could be found in Virtual Machine implementations. What they do is utilize a feature of computers called HyperV, it is


So, in our Dockerfile, we are calling a few commands that Docker could understand to create a new image for us. A brief explanation about the used commands:

- `FROM`: It inherits from another image, builds untop of it, making it easier to make modifications.
- `USER`: Sets the user that is associated with the current session inside of an interactive terminal in case we need one.
- `WORKDIR`: Sets the default directory that a terminal would be when it is initialized.
- `EXPOSE`: The image can receive connections, but could only be connected to by containers in the same network, except it is told to expose the port to the host machine. This command exposes a port of an image to its host machine.

So, this is complete in our case. An OS with NodeJS, and we know a directory to put our source codes inside of the image, interesting.

Next, we have to build this image to confirm if we the Dockerfile contains a valid syntax.

To build a Docker Image from a directory that has a Dockerfile - like ours, we can run:

```bash
docker image build -t nodejs
```

This would pull the NodeJS image from hub.docker.com then run the remaining commands to modify for our new image. When this is done, we could verify by running:

```bash
docker image ls
```

The above command would list the images currently installed locally.

If that works, we have successfully build our nodejs image, and we can now create containers that uses the images.

>>> Containers are like the computer itself, they run using an image just like our physical computers run using an operating system. In Docker, think of Images like an installable operating system, while containers to be the machine that can install an operating system, in this case an image.

To have a container running using the nodejs image, we can use the below command:
```bash
docker container start -it --name nodejs-container nodejs
```
The command above is starting a container, gives the container a name of nodejs, run it interactively, then use the nodejs image that we built earlier.

The result of the command above is a nodejs repl being launched in our terminal.

We are seeing that because that is what the parent image(nodejs) specified. In its Dockerfile it specifies `CMD: node`. We can override this easily in our docker file, but that is not a good idea, we want this setup to be reusable so we should leave that as it is. There is a better way to override it which would not require modifying the Dockerfile.

## Nginx Dockerfile

As a rule of thumb, we can only have one Dockerfile in a directory, and we have used that opportunity to make that file build a NodeJS image for us. But, we also need to build an nginx image from a parent image on [DockerHub](http://hub.docker.com/) which would receive http requests like our webserver would.

Why we need an Nginx image is to bootstrap an Nginx server that would mimic our production live server. What Nginx server does in NodeJS deployments is to create a proxy against the actual node server from the rest of the world.

>>> Local User --> Our Web Server --> Node App inside the server.

>>> Local User <-- Our Web Server <-- Node App inside the server

For us to achieve this architecture Dockerized, it is essential we build an image off the official nginx image from DockerHub. Let's do this!

Let's create a file named `nginx.Dockerfile` in the same directory, and have the content as below:

```docker
FROM nginx:1.13

COPY nginx.conf /etc/nginx/conf.d/default.conf
```

This is quite smaller to that of the NodeJS, but would do a full build process of the nginx image. This is the power of Docker, when we extend an image, we can add special functionalities to the image, which leaves us from the low-level details that is associated with creating that image.

In this nginx Dockefile, we are extending the official nginx image at version 1.13, then copying a file `nginx.conf` to the default nginx config path. The copy command is to ensure that we make our nginx do what we want when we are ready to create our proxy server.

Awesome!

Next, we can build this image as we have built the NodeJS' to very our syntaxt. But before we build, let's add a file at the same location named `nginx.conf`. This file should have the following content:

```nginx
server {

	listen 80;

	location / {

		proxy_pass         http://localhost:5000;
		proxy_redirect     off;
		proxy_set_header   Host $host;
		proxy_set_header   X-Real-IP $remote_addr;
		proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header   X-Forwarded-Host $server_name;
	}
}

```

As should be noticed in the `nginx.conf` file, we are redirecting all traffic coming to this server to another address(_http://localhost:5000_), we are assuming an app is running at this port. Now we can build the nginx Dockerfile to a Docker image with:

```
docker image build -t nginx -f nginx.Dockefile
```
>> __We have to specify the `-f nginx.Dockerfile` to tell Docker to not use the default Dockerfile which is for our nodejs image.__

And running a container off of the image:

```bash
docker container start -it --name nginx-container -p 80:80 nginx
```

Perfect! We now have a proxy nginx server that routes request to its 127.0.0.1:5000. As we know, images are OS of their own, and the nginx would resolves localhost to itself, we don't want it to route to itself since our nodejs app would live in the nodejs container. We will later provide a solution to this.


## MongoDB and Redis Dockerfiles

We won't be building an image for MongoDB and Redis, the major reason is that we don't have any customization to add to the image that we would be inheriting from. So, it is more of over-engineering to have a dockerfile that contains:

```
FROM mongodb:alpine
```

When we can have a docker-compose file to take away that for us or create a container on the image which would be pulled from dockerhub.

## Docker-Compose

Composability is one of the many features that Distinguishes Docker from a VM. From `Compose` we should understand that _we can create many images, containers, networks, drives on the fly in just one file._ This helps with maintainance and helps to conceptualize software as a mixture of dependencies in their uniqueness.

>> So, let's compose an architecture for NodeJS, Nginx, Mongo and Redis!

In the same directory, create a file named `docker-compose.yml`, compose files are [YAML files](https://en.wikipedia.org/wiki/YAML) with commands that the docker-compose command understands.

Once that file is created, let's define some images that we would be needing for our architecture. First, I will define the nodejs image, making the first version of `docker-compose.yml` file to look like this:

```
version: "2"
services:
  node:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ./:/home/node/app
    command: "npm start"
    ports:
      - 5000:5000
```

In the snippet above, we are trying to create a node image through this compose file from [the Dockerfile we defined above](#base-dockerfile), (_the context is the path to look for, while the dockerfile is a customized name for our Dockerfile, we can omit it since our nodejs Dockerfile has the default naming convention, but, we have added it for clarity sake_).

Also, we could notice we were setting some information, if you can remember when how we create containers: `docker container run --name nginx -p 80:80 nginx`, we can pass parameters and further extend the image through these commands.

Here we can see that we have forwared port 5000 from the container to the container's 5000, map the current directory to the `/home/node/app` folder in the container and how we could specify the command we want to run after the container might have been started? That is the power of compose files. To know more about the commands that can be passed, see the [docker-compose documentation](https://docs.docker.com/compose/compose-file/compose-file-v2/) 

Now testing our compose file, we can start the compose file in docker and not forget, as docker to build us the nodejs image since we have specified the build command:

```
docker-compose up --build
```

That is it, we have our first docker-compose running!

Next, we should include our nginx config into the docer-compose file. Which would make our docker-compose.yml to look like this:

```yml
version: "2"
services:
  node:
    build:
      context: .
      dockerfile: node.Dockerfile
    volumes:
      - ./:/home/node/app
    command: "npm start"
    ports:
      - 5000:5000
    networks: # notice this addition to the node servic
      - nginx-proxy # notice this
      - default # notice this
  nginx:
    build:
      context: .
      dockerfile: nginx.Dockerfile
    volumes:
      - ./:/home/node/app
    # command: "npm start"
    restart: always
    ports:
      - 80:80
    depends_on:
      - node
    networks:
      - nginx-proxy
      - default

networks:
  nginx-proxy:

```

With this update, we have included the nginx.Dockerfile to build an nginx image for us which should include the nginx.conf we have. To be noticed in the bginx service is `depends_on` , this commands ensures that the node is started and running before nginx is started. We also added the both services to the same networks so they can communicate using their service name instead of their respective virtual ips.

For ngix.conf to work, we have to update the part that redirects to `localhost:5000` to redirect to `http://node:5000`. The node hostname would be resolved to virtual ip address by Docker during runtime. This change should make our `nginx.conf` to look like this:


```nginx
server {

	listen 80;

	location / {

		proxy_pass         http://node:5000; # updated from localhost to the service name
		proxy_redirect     off;
		proxy_set_header   Host $host;
		proxy_set_header   X-Real-IP $remote_addr;
		proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header   X-Forwarded-Host $server_name;
	}
}
```

Awesome, we can build these two services and run them at the same time as we did before using: `docker-compose up --build`. Both services running? Great!

>>> If the node service is failing, do init a node project in the root directory with: `npm ini -y` and add a start script OR remove the command: npm start from the docker-compose.yml file. 

We are doing well!

Next let's include Redis service into the compose file.


```yml
version: "2"
services:
  node:
    build:
      context: .
      dockerfile: node.Dockerfile
    volumes:
      - ./:/home/node/app
    command: "npm start"
    ports:
      - 5000:5000
    depends_on:
      - mongodb-server
    networks:
      - nginx-proxy
      - default
  nginx:
    build:
      context: .
      dockerfile: nginx.Dockerfile
    volumes:
      - ./:/home/node/app
    restart: always
    ports:
      - 80:80
    depends_on:
      - node
    # network_mode: bridge
    networks:
      - nginx-proxy
      - default
  redis-server:
    image: "redis:5.0.8-alpine"
    ports:
      - "6379:6379"

networks:
  nginx-proxy:
```

It gets more interesting, but simply done. We don't need any special configuration or extension for the Redis Image. So, we just use the `image: ...` command instead of the build command to tell the image we want to use. This also means that docker will not build this image, rather download it from Dockerhub.


Finally, a database. Let's add mongodb service to complete our setup.

```
version: "2"
services:
  node:
    build:
      context: .
      # You can rename the file to make it tell what it does.
      # since we are composing different images and not just a sigle image
      dockerfile: node.Dockerfile 
    volumes:
      - ./:/home/node/app
    command: "npm start"
    ports:
      - 5000:5000
    depends_on:
    # We now depends on node and mongodb server
      - redis-server
      - mongodb-server
    networks:
      - nginx-proxy
      - default
  nginx:
    build:
      context: .
      dockerfile: nginx.Dockerfile
    volumes:
      - ./:/home/node/app
    restart: always
    ports:
      - 80:80
    depends_on:
      - node
    networks:
      - nginx-proxy
      - default
  redis-server:
    image: "redis:5.0.8-alpine"
    ports:
      - "6379:6379"

  mongodb-server:
    image: "mongo:4.2.3-bionic"
    ports:
      - "27017:27017"

networks:
  nginx-proxy:
```


As simple as the redis service is, same with the mongodb service. We are downloading the image from github and running a mongodb-server container off it.

Great work!

Now, we can test our setup as we always do: `docker-compose up --build`.

## Speaking between containers.

If we try to connect to the redis service from our node app we might get an error as the address 127.0.0.1 would mean the instance itself  and not the host computer, same will happen with the mongodb service.

To solve this, we will add a service_name to every service we want to reference inside of another container, and ensure that the depends_on is updated to that new service name.

So our final config would look like this:

```

version: "2"
services:
  node:
    server_name: node
    build:
      context: .
      # You can rename the file to make it tell what it does.
      # since we are composing different images and not just a sigle image
      dockerfile: node.Dockerfile 
    volumes:
      - ./:/home/node/app
    command: "npm start"
    ports:
      - 5000:5000
    depends_on:
    # We now depends on node and mongodb server
      - redis-server
      - mongodb-server
    networks:
      - nginx-proxy
      - default
  nginx:
    service_name: nginx
    build:
      context: .
      dockerfile: nginx.Dockerfile
    volumes:
      - ./:/home/node/app
    restart: always
    ports:
      - 80:80
    depends_on:
      - node
    networks:
      - nginx-proxy
      - default
  redis-server:
    service_name: redis
    image: "redis:5.0.8-alpine"
    ports:
      - "6379:6379"

  mongodb-server:
    service_name: mongodb
    image: "mongo:4.2.3-bionic"
    ports:
      - "27017:27017"

networks:
  nginx-proxy:
```

Easy enough? Now in our source codes we can use http://redis:6379 to connect to redis service container and http://mongodb:27017 to connect to the mongodb service container.

Voila!

## Conclusion
Finally, we cracked it. Walking through the journey from an empty file to a docker-compose.yml file that we can share with anyone that would love to replicate same setup for their development. This was so much fun to walk through.

There is more to Docker than we have covered, don't hesitate to read the [docs](https://docs.docker.com/) for more information and commads that could be used in Dockerfile and docker-compose.yml files.

**PLEASE!!!**

>>**Dockerize yourself at this time, stay safe, stay home, stay in a containerized environment!!!**

_Ou re voir!_
