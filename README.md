# latias-proj

The backend and all its functionality are located [here](https://github.com/sgronlund/latias-backend)

## First time

When you've successfully cloned this repo, enter the src folder and run the following command :
```
npm i
``` 
This installs all the dependencies this project requires.
This process should not differ from MacOS, Linux or Windows assuming you've succesfully installed NodeJS on your host machine.

## Client-Server session

### Server
When initiating the Client-Server session you must first start the server. To do this enter the `server`-directory which exists in the `src`-directory and run the command:
```bash
npm start
```

If everything is working your terminal should look something like this:
![image](https://user-images.githubusercontent.com/55285451/113585007-eaae8c80-962b-11eb-9f0c-616a5c71464e.png)

### Client

To connect a client, enter the src folder from another terminal and simply run:
```bash
npm start
```

Then Expo will launch in your browser and you can choose between previewing in a browser or using a iOS/Android emulator.
If you choose the browser your console should look something like this:

![image](https://user-images.githubusercontent.com/55285451/113585858-1120f780-962d-11eb-81f5-9c4978737d20.png)

### Tests

To run tests, you can simply run (after running npm install):
```bash
npm test
```

### Docs

To generate documentation, you can simply run (after running npm install):
```bash
npm run document
```

This will generate the src/out/ folder where index.html will contain all generated documentation.

### Clean

To clean up temporary files or files that should not be commited, simply run:
```bash
npm run clean
```