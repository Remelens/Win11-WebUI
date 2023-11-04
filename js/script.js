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
    console.log('%c Win11UI Window Manager %c v1.0 ', "color:black;background:#E9E9E9;", "background:#2B3141;color:#ccc;");
}
class Win11Window {
    static ONLY_CLOSE=2;
    static ALL_BTNS=1;
    static BTN_CLOSE=0;
    static BTN_MIN=1;
    static BTN_MAX=2;
    constructor(args) {
        this.id = 0;
        this.position = { x: 0, y: 0 };
        this.size = { x: 'auto', y: 'auto' };
        this.title = "Window";
        this.icon = '';
        this.content = '<p></p>';
        this.cls = Win11Window.ALL_BTNS;
        this.mainStyle = '';
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
        if(this.isMaxWindow()){
            this.updateWindow();
        }
        if(this.isMinWindow()){
            this.unMinWindow();
        }else{
            this.minWindow();
        }
    }
    onMaxmise() {
        if(this.isMinWindow()){
            this.updateWindow();
        }
        if(this.isMaxWindow()){
            this.unMaxWindow();
        }else{
            this.maxWindow();
        }
    }
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
        parentWindow.style.width = (typeof this.size.x==='number'?this.size.x.toString()+'px':this.size.x);
        parentWindow.style.height = (typeof this.size.y==='number'?this.size.y.toString()+'px':this.size.y);;
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
            <div class="win-main" style="${this.mainStyle}">${this.content}</div>`;
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
    maxWindow(){
        $id(this.id).classList.add('win-maximum');
        $id(this.id).querySelector('.win-max').querySelector('img').src='./images/maxmin.png' 
    }
    unMaxWindow(){
        if(this.isMaxWindow()){
            $id(this.id).classList.remove('win-maximum');
            $id(this.id).querySelector('.win-max').querySelector('img').src='./images/max.png' 
        }
    }
    minWindow(){
        $id(this.id).querySelector('.win-main').style.display='none';
        $id(this.id).querySelector('.win-header').style.height='35px';
        $id(this.id).querySelector('.win-header').style.borderRadius='6px';
        $id(this.id).querySelector('.win-title').style.marginRight='5px';
        $id(this.id).querySelector('.win-close').style.borderRadius='0 5px 5px 0';
        $id(this.id).querySelector('.win-min').querySelector('img').src='./images/maxmin.png'
    }
    unMinWindow(){
        this.updateWindow();
    }
    isMinWindow(){
        return $id(this.id).querySelector('.win-main').style.display==='none';
    }
    isMaxWindow(){
        return $id(this.id).classList.contains('win-maximum');
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