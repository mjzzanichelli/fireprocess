#Fireprocess

Managing Child Processes has never been easier.
**fireprocess** is also


##Installation

**fireprocess** is now public on [npm](https://www.npmjs.com/)

```bash
npm install [-g] fireprocess
```

##Commands

Just like in [Node.js child processes](https://nodejs.org/api/child_process.html), with **fireprocess** you can execute available ways:

```js
var fireprocess = require("fireprocess");
fireprocess.exec(<command>[,<options>,<callback>]);
fireprocess.execFile(<command>[<args>,<options>,<callback>]);
fireprocess.fork(<file_path>[<args>,<options>,<callback>]);
fireprocess.spawn(<file_path>[<args>,<options>,<callback>]);
```

Child processes can also be executed from command line:

```bash
//exec
fireprocess -[-]x[=]<command>
//execFile
fireprocess --xf[=]<command>
//fork
fireprocess -f[=]<file_path>
//spawn
fireprocess -s[=]<file_path>
```

##I/O and color code

* **yellow** for the command string
* **red** for `stderr`
* **blue** for `stdin`
* **green** for `stdout`

##Notes

In version 0.x, command line excutions are currently limited to the command/file only.
