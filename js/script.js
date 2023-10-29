/*
 * @file:           w11winmgr.js
 * @name:           Win11UI Window Manager
 * @describtion:    Windows11UI-like Window Manager
*/
var $id = (e) => document.getElementById(e);
var $ = (e) => document.querySelector(e);
var $_ = (e) => document.querySelectorAll(e);
/*
class=1
    3 icons
class=2
    close icon only
*/
function onLoadFle() {
    console.log(`%c Win11UI Window Manager %c v1.0 `, "color:black;background:#E9E9E9;", "background:#2B3141;color:#ccc;");
}
class Win11Window {
    constructor(args) {
        this.id = 0;
        this.position = { x: 0, y: 0 };
        this.size = { x: 300, y: 300 };
        this.title = "Window";
        this.icon = '';
        this.content = '<p></p>';
        this.cls = 1;
    }

    /*
    //决定窗口的控制按钮（如果此项为1，将隐藏最小化、最大化按钮）
    onClose,//关闭窗口
    onActive,//激活窗口
    onHide,//隐藏
    onShow,//显示
    onMinimize,//最小化
    onMaxmise,//最大化
    onDrag,//拖动
    */
    onActive(event) { }
    onDrag(event) { }
    onHide(element) { 
        element.style.display='none';
    }
    onShow(element) { 
        element.style.display='flex';
    }
    onMinimize() {
        this.hideWindow();
    }
    onMaxmise() { }
    onClose() {
        this.removeWindow();
    }
    createWindow() {
        if (!this.id) {
            throw new Error(`Failed to create window: Undefined id: ${this.id}`);
        } else if ($id(this.id)) {
            throw new Error(`Failed to create window: Already exists id: {this.id}`);
        }
        /*
        {
            handle:string, //窗口id
            position:{ //位置
                x:int,
                y:int
            },
            title:string,//标题
            icon:string, //图标
            content:string, //内容 -> html
            cls:string, //class
            onClose:function,// 窗口关闭的事件
            onActive:function, // 窗口激活的事件
            onHide:function,// 窗口隐藏的事件
            ONminimise:function,// 窗口最小化的事件
        }
        */
        var parentWindow = document.createElement('div');
        parentWindow.className = "win11-window";
        parentWindow.id = this.id;
        parentWindow.style.width = this.size.x;
        parentWindow.style.height = this.size.y;
        parentWindow.style.position = 'absolute';
        parentWindow.style.left = (typeof this.position.x==='number'?this.position.x.toString()+'px':this.position.x);
        parentWindow.style.top = (typeof this.position.y==='number'?this.position.y.toString()+'px':this.position.y);
        var inpicon = (typeof this.icon !== 'undefined' && this.icon !== '' ? `<div class="win-uicon"><img width="14" src="${this.icon}" alt=""></div>` : '');
        var btnbar =
            (this.cls === 1
                ? `<div class="win-uicon win-min"> <img width="12" src="./images/min.png" alt=""></div> <div class="win-uicon win-max"> <img width="12" src="./images/max.png" alt=""> </div>`
                : "") +
            `<div class="win-uicon win-close"> <img width="14" src="images/close.png" alt=""> </div>`;
        parentWindow.innerHTML = `<div class="win-header">
                <div class="win-title" data-op="0">
                    ${inpicon}<span>${this.title}</span>
                </div>
                <div class="win-buttonbar">${btnbar}</div>
            </div>
            <div class="win-main">${this.content}</div>`;
        document.body.appendChild(parentWindow);//TODO:Parent
        this.bindEventListeners(parentWindow);
        return parentWindow;
    }

    removeWindow() {
        var node = $id(this.id);
        var parentNode = node.parentNode;
        parentNode.removeChild(node);
    }
    updateWindow() {
        this.removeWindow();
        this.createWindow();
    }
    hideWindow() {
        this.onHide($id(this.id));
    }
    showWindow() {
        this.onShow($id(this.id));
    }
    disableWindow(){
        if(!this.isDisabled()){
            $id(this.id).classList.add('win-disable');
        }
    }
    enableWindow(){
        if(this.isDisabled()){
            $id(this.id).classList.remove('win-disable');
        }
    }
    //TODO:Need Fix
    foregroundWindow() {
        var foregroundNode = Win11Window.getForegroundWindow();
        $id(this.id).style.zIndex = (typeof foregroundNode.style.zIndex === 'string' ? (parseInt(foregroundNode.style.zIndex)+1).toString : 1);
    }
    /*cls:
        0:close
        1:min
        2:max
        */
    isButtonDisabled(cls){
        if(this.cls===2&&cls!==0){return;}
        switch(cls){
            case 0:
                return $id(this.id).querySelector('.win-close').classList.contains('winbtn-disable');
            case 1:
                return $id(this.id).querySelector('.win-min').classList.contains('winbtn-disable');
            case 2:
                return $id(this.id).querySelector('.win-max').classList.contains('winbtn-disable');
        }
    }
    enableButton(cls) {
        if(this.cls===2&&cls!==0){return;}
        switch(cls){
            case 0:
                if(this.isButtonDisabled(cls)){
                    $id(this.id).querySelector('.win-close').classList.remove('winbtn-disable');
                }
                break;
            case 1:
                if(this.isButtonDisabled(cls)){
                    $id(this.id).querySelector('.win-min').classList.remove('winbtn-disable');
                }
                break;
            case 2:
                if(this.isButtonDisabled(cls)){
                    $id(this.id).querySelector('.win-max').classList.remove('winbtn-disable');
                }
                break;
        }
    }
    disableButton(cls) {
        if(this.cls===2&&cls!==0){return;}
        switch(cls){
            case 0:
                if(!this.isButtonDisabled(cls)){
                    $id(this.id).querySelector('.win-close').classList.add('winbtn-disable');
                }
                break;
            case 1:
                if(!this.isButtonDisabled(cls)){
                    $id(this.id).querySelector('.win-min').classList.add('winbtn-disable');
                }
                break;
            case 2:
                if(!this.isButtonDisabled(cls)){
                    $id(this.id).querySelector('.win-max').classList.add('winbtn-disable');
                }
                break;
        }
    }
    isDisabled(){
        return $id(this.id).classList.contains("win-disable");
    }
    bindEventListeners(node) {
        //TODO:加上对win-disable类的支持
        //win-disable类用于窗口不接收任何信息

        //use in createWindow:
        //this.bindEventListeners(parentNode);
        if(this.cls===1){
            node.getElementsByClassName('win-min')[0].addEventListener('click', (event) => {
                if (node.classList.contains("win-disable")||this.isButtonDisabled(1)) { return; }
                this.onMinimize(event);
            });
            node.getElementsByClassName('win-max')[0].addEventListener('click', (event) => {
                if (node.classList.contains("win-disable")||this.isButtonDisabled(2)) { return; }
                this.onMaxmise(event);
            });
        }
        node.getElementsByClassName('win-close')[0].addEventListener('click', (event) => {
            if (node.classList.contains("win-disable")||this.isButtonDisabled(0)) { return; }
            this.onClose(event);
        });
        node.addEventListener('click', (event) => {
            if (node.classList.contains("win-disable")) { return; }
            this.onActive(event);
        });
        //TODO:Need Drag
        node.addEventListener('drag', (event) => {
            if (node.classList.contains("win-disable")) { return; }
            this.onDrag(event);
        });
    }
    //---------static functions----------
    static getForegroundWindow() {
        var windows = document.querySelectorAll('.win11-window'), cnt, max;
        for (let i of windows) {
            if (max < i.style.zIndex || typeof max === 'undefined') {
                max = i.style.zIndex;
                cnt = i;
            }
        }
        return cnt;
    }
}
onLoadFle();//OnloadFile