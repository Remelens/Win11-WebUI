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
a.cls=Win11Window.ALL_BTNS;
```
Class:
1. Min icon,Max icon and Close icon;  `Win11Window.ALL_BTNS`
2. Only Close icon. `Win11Window.ONLY_CLOSE`

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
a.enableButton(Win11Window.BTN_MIN);
a.disableButton(Win11Window.BTN_CLOSE);
```
`enableButton(class)`|`disableButton(class)`

class:

0. close `Win11Window.BTN_CLOSE`
1. min `Win11Window.BTN_MIN`
2. max `Win11Window.BTN_MAX`

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