"Please hire me" TODO app
========

## Get it running

```bash
git clone git@github.com:jakubzitny/avoc-interview.git
cd avoc-interview

npm install
npm start
node server.js

# open chrome with --disable-web-security flag, 
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security & # on OS X 
# and go to http://localhost:8080/index.html
```

## Test it (using jest)

```bash
npm test
```

## What didn't work
- originaly all POST and DELETE api reqests didn't work, now seems to be okay (morning)
- the subtask completion toggling still doesn't seem work on api side

## Implementation struggles
Lack of react experience => small problems with react and react-tools versions, browserify + reactify, jest, heroku => took a bit longer than expected :(
