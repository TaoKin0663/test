//原理:监听页面改变/缩放时,重新获取页面宽度,按比例重新设置根元素(html)的font-size值
/*动态改变根元素字体大小*/
function recalc() {
	//				1. 获取设备/客户端宽度
	var clientWidth = document.documentElement.clientWidth;
	if(!clientWidth) return;
	// 需要根据设计稿的宽度来调整数值(psd width)
	document.documentElement.style.fontSize = (clientWidth * 100 / 750) + 'px';
	//				人为定义 1rem = 100px;
	//				当元素在设计稿上宽度为320px = width:3.2rem;
	//				
	//				640px   clientWidth
	//				----  :	-----------
	//			fs	100px			X
	//			
	//			640px * x = clientWidth * 100
	//			x = clientWidth * 100/640
}

function initRecalc() {
	recalc();
	var resizeEvt = 'osrientationchange' in window ? 'orientationchange' : 'resize';
	if(!document.addEventListener) return;
	//				通过添加监听事件,当页面改变的时候重新修改html的font-size
	window.addEventListener(resizeEvt, recalc, false);
	document.addEventListener('DOMContentLoaded', recalc, false);
}
//			初始化的时候调用一次
initRecalc();