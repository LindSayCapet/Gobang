//定义节点
var cvs=document.getElementById("cvs");
var txt=document.getElementById("txt");
var start=document.getElementById("start");
var ct=cvs.getContext("2d");
//设置每个格子的高宽为40
var step=40;
//绘制棋盘
function checkerboard(){
	for(var i = 0; i < cvs.width / step; i++) {
	ct.moveTo((i + 1) * step, 0);
	ct.lineTo((i + 1) * step, cvs.height);
	ct.moveTo(0, (i + 1) * step);
	ct.lineTo(cvs.width, (i + 1) * step);
	ct.strokeStyle="#FFFFFF"
	ct.stroke();
}
}

//判断该位置是否有旗子，0为没有，1为黑棋，2为白棋
//每个格子有15个交点，边界交点不可以下棋子

var arr=new Array(15);
for(var i=0;i<arr.length;i++){
	arr[i]=new Array(15);
	for(var j=0;j<arr.length;j++){
		//初始化所有交点
		arr[i][j]=0;
	}
}
//判断下棋，true为黑色，false为白色
var pieceColor=true;
//判断是否在游戏，true为游戏还未结束
var isPlay=true;
//创建棋子
var b=new Image();
b.src="img/b.png";
var w=new Image();
w.src="img/w.png";

//获取鼠标的位置
cvs.onclick=function(e){
	if(isPlay==false){
		alert("游戏结束，请刷新或重新开始");
		return
	}
	var x=(e.offsetX-5-20)/step;
	var y=(e.offsetY-5-20)/step;
	
	x=parseInt(x);
	y=parseInt(y);
	if(x<0||y<0||x>=15||y>=15){
		alert("超出界限");
		return;
	}
	if(arr[x][y]!=0){
		alert("此位置已有棋子");
		return
	}
	
	//黑子,传入参数，1为黑子，2为白子
	if(pieceColor){
		pieceColor=false;
		down1(1,x,y)
	}else{
		pieceColor=true;
		down1(2,x,y);
	}
	
}
//画旗子
function down1(num,x,y){
	//图片长度为30，一个格子长度为40,40-30/2，占据中心位置
	var x0=x*step+25;
	var y0=y*step+25;
	if(num==1){
		ct.drawImage(b,x0,y0);
		arr[x][y]=1;
	}
	else if(num==2){
		ct.drawImage(w,x0,y0);
		arr[x][y]=2;
	}
	//判断输赢
	isVictory(num,x,y)
}
function isVictory(num,x,y){
	//n1左右方向 n2上下方向，n3左上到右下方向，n4右上到左下方向
	var n1=0,n2=0,n3=0,n4=0;
	//计算左右
	for(var i=x;i>=0,arr[i][y]!=0;i--){
		if(arr[i][y]!=num){
			break;
		}
		n1++;
	}
	for(var i=x+1;i<15;i++){
		if(arr[i][y]!=num){
			break;
		}
		n1++;
	}
	//计算上下
	for(var i=y;i>=0;i--){
		if(arr[x][i]!=num){
			break;
		}
		n2++;
	}
	for(var i=y+1;i<15;i++){
		if(arr[x][i]!=num){
			break;
		}
		n2++;
	}
	//左上到右下
	for(var i=x,j=y;i>=0,j>=0;i--,j--){
		if(i<0||j<0||arr[i][j]!=num){
			break;
		}
		n3++;
	}
	for(var i=x+1,j=y+1;i<15,j<15;i++,j++){
		if(i>=15||j>=15||arr[i][j]!=num){
			break;
		}
		n3++;
	}
	
	//右上到左下
	for(var i=x,j=y;i<15,j>=0;i++,j--){
		if(i>=15||j<0||arr[i][j]!=num){
			break;
		}
		n4++;
	}
	for(var i=x-1,j=y+1;i>=0,j<15;i--,j++){
		if(i<0||j>=15||arr[i][j]!=num){
			break;
		}
		n4++;
	}
		if(n1==5||n2==5||n3==5||n4==5){	
			if(num=1){
				setTimeout(function(){
					alert("黑棋胜利,游戏结束");
				},500);
			}else if(num=2){
				setTimeout(function(){
					alert("白棋胜利,游戏结束");
				},500);
			}
			isPlay=false;
		}
}
start.onclick = function() {
	isPlay = true;
	pieceColor = true;
	for(var i = 0; i < arr.length; i++) {
		for(var j = 0; j < arr.length; j++) {
			//初始化所有交点
			arr[i][j] = 0;
		}
	}
	//清空画布
	ct.clearRect(5,5,640,640);
	checkerboard();
}
checkerboard();