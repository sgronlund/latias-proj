**NOTE:**
This project was done for the course [1DT003 Computer Systems with Project Work at Uppsala University](https://www.uu.se/en/admissions/freestanding-courses/course-syllabus/?kKod=1DT003&lasar=) by the following members:

* [AGUPTA375](https://github.com/AGUPTA375)
* [Skrotsamlarn](https://github.com/Skrotsamlarn)
* [RichardG99](https://github.com/RichardG99)
* [Kimiya98901](https://github.com/Kimiya98901)
* [JakobPaulsson](https://github.com/JakobPaulsson)
* [niclasgardsuu](https://github.com/niclasgardsuu)
* [sgronlund](https://github.com/sgronlund)
---
# The Real Deal - Frontend
![logo](./src/assets/Logo_white_with_blue_border_on_color.png)

This repository hosts the frontend of our project, *The Real Deal*, written in [React Native](https://reactnative.dev/) and built and run using [Expo](https://expo.dev/) which communicates with our frontend application which can be found [here](https://github.com/sgronlund/latias-backend).

## First Time

When you've successfully cloned this repo, enter the `src` folder and run:
```
npm i
```
This installs all the dependencies this project requires.
This process should not differ from MacOS, Linux or Windows assuming you've successfully installed NodeJS on your host machine.

### Usage

To connect a client, enter the `src` folder from another terminal and simply run:
```bash
npm start
```

Then Expo will launch in your browser and you can choose between previewing in a browser or using a iOS/Android emulator.
If you choose the browser your console should look something like this:

![image](https://user-images.githubusercontent.com/55285451/113585858-1120f780-962d-11eb-81f5-9c4978737d20.png)

### Documentation

To generate documentation, you can simply run:
```bash
npm run document
```

This will generate the `src/out/` folder where index.html will contain all generated documentation.

### Clean

To clean up temporary files or files that should not be commited, simply run:
```bash
npm run clean
```
