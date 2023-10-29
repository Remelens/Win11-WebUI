# Win11UI Window Manage Docs

## init window

```js
var a=new Win11Window();
```

## set up window
### ID
```js
a.id='windowid';
```
The program will throw an error if you doesn't set the value of id.

### Window Position
```js
a.position.x=0;
a.position.y=0;
```
### Size
```js
a.size.x=300;
a.size.y=300;
```
### Title
```js
a.title='Win';
```
### icon
```js
a.icon='/path/to/image/file'
```
### Window Content
```js
a.content='Hello,world!';
```
### Window Class
```js
a.cls=1;
```
Class:
1. Min icon,Max icon and Close icon;  
2. Only Close icon.

### on...
```js
a.onClose=function(event){
    a.removeWindow();
}
```
Functions:
* `onClose(event)`
* `onMaximun(event)`
* `onActive(event)`
* `onHide(element)`
* `onShow(element)`
* `onMinimize(event)`
* `onMaxmise(event)`
* `onDrag(event)` [*developing]

### Enables/Disables
#### Button
```js
a.enableButton(1);
a.disableButton(0);
```
`enableButton(class)`|`disableButton(class)`

class:

0. close
1. min
2. max

#### Window
```js
a.enableWindow();
a.disableWindow();
```

## Window
### show
```js
a.createWindow();
```
### remove
```js
a.removeWindow();
```
### show/hide
```js
a.showWindow();
a.hideWindow();
```
### SetForeground [*developing]
```js
a.foregroundWindow();
```
### getForegroundWindow
```js
Win11Window.getForegroundWindow();
```
Return value:DOM Object