# Project Name

> Pithy project description

## Team

  - __Product Owner__: Fawn
  - __Scrum Master__: Yifeng
  - __Development Team Members__: Soroush, Colin

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

## Waffle.io

https://waffle.io/hard-cover/bookup

## git-hub group

https://github.com/hard-cover

### Legacy

* many users don't have usernames, so we need to allow them to add a name that they can display to our DB
* logout functionality: implement sessions (right now, we just use incognito windows to login multiple people and test /users with postman)
* refactor server side controllers to have a utils file
* grab top rated read books to create favorites section
* setup local heroku web environment so that it uses the correct env. variables and callback.
* If you want a diagram of the file system, ask Fawn and she'll email it to you.

## jQuery plugin
We began to look into implementing the BookBlock jQuery plugin to get a page flipping effect when someone "flips" a potential match. (We also imagined a bookmarking effect for bookmarking.) You can read up on the plugin here: http://tympanus.net/Development/BookBlock/index.html
Note that the js and css bookblock files are already in client/lib and in the index.html, but additional components may need to be inserted. There is also commented out code in the index.html for testing the jQuery plugin.


### Issues
* Bower vs Heroku:
Note that bower was originally used to dl angular and jquery but it wouldn't deploy correctly, so we hard coded them into the html. However, the HIR Sarah advised us that what we need to do is use a .bowerrc file and add a bower script to the npm start script. We've done these things, but the cdn in the index needs to be switched to a relative path in the root folder, and then tested.
