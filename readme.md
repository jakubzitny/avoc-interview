"Please hire me" TODO app
========

### Get it running

```bash
git clone git@github.com:jakubzitny/avoc-interview.git
cd avoc-interview

npm install
npm start
node server.js

# open chrome with --disable-web-security flag
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security & # on OS X 
# and go to http://localhost:8080/index.html
```

### Test it

Testing is done with jest, but could be much much better..

```bash
npm test
```

### Features
- logging in
- listing tasks, toggling, marking as completed, adding, deleting
- during marking task as completed, toggling is disabled until it is saved on the server
- pagination
- toggling visibility of completed tasks (first level tasks, sounds reasonable, looks bit weird, but should be correct)
- tests kinda

### What didn't work
- originaly all POST and DELETE api requests didn't work, now seems to be okay (morning)
- the subtask completion toggling still doesn't seem work on api side

### Implementation struggles
Lack of react experience => small problems with react/react-tools/reactify versions and jest and heroku => took a bit longer than expected :(
