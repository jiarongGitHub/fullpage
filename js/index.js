window.onload = function() {
	var navUpLis = document.querySelectorAll("#head .mainHead .nav .list>li .up");
	var liNode = document.querySelectorAll("#head .mainHead .nav .list>li");
	var arrow = document.querySelector("#head .mainHead .arrow");
	var content = document.querySelector("#content");
	var head = document.querySelector("#head");
	var cList = document.querySelector("#content .list");
	var cLis = document.querySelectorAll("#content .list > li");
	//获取所有小圆点的li节点
	var home2Lis = document.querySelectorAll("#content .list .home .home2>li");
	//获取所有banner的li
	var home1Lis = document.querySelectorAll("#content .list .home .home1>li");
	var home = document.querySelector("#content .list .home");

	var aboutUls = document.querySelectorAll("#content .list .about .about3 > .item ul");
	var now = 0; //记录现在点击的是哪个nav 然后将要去到哪一屏
	var timer = 0;

	var prevIndex = 0; //记录上一次点击的是哪一个小圆点
	var autoIndex = 0; //记录定时器循环的小圆点索引
	var timer3d = 0;

	var team3 = document.querySelector("#content .list .team .team3");
	var teamLis = document.querySelectorAll("#content .list .team .team3 > ul > li");

	var menuLis = document.querySelectorAll("#content .menuBar li");

	//出入场动画变量获取
	//第一屏
	var home1 = document.querySelector("#content .list .home .home1");
	var home2 = document.querySelector("#content .list .home .home2");
	//第二屏
	var plan1 = document.querySelector("#content .list .course .plane1");
	var plan2 = document.querySelector("#content .list .course .plane2");
	var plan3 = document.querySelector("#content .list .course .plane3");
	//第三屏
	var pencel1 = document.querySelector("#content .works  .pencel1");
	var pencel2 = document.querySelector("#content .works  .pencel2");
	var pencel3 = document.querySelector("#content .works  .pencel3");
	//第四屏
	var about3Div1 = document.querySelector("#content .list .about .about3>.item:nth-child(1)");
	var about3Div2 = document.querySelector("#content .list .about .about3>.item:nth-child(2)");
	//第五屏
	var team1 = document.querySelector("#content .list .team .team1");
	var team2 = document.querySelector("#content .list .team .team2");
	var preArrIndex = 0; //初始化出入场动画的index
	//获取音频相关变量
	var audio = document.querySelector("#head .mainHead .music audio");
	var musicDiv = document.querySelector("#head .mainHead .music");
	
	//获取遮罩相关变量
	var spanNode = document.querySelector("#hide span");
	var hideDiv = document.querySelectorAll("#hide div");
	var hide = document.querySelector("#hide");

	//每次重新调整屏幕的时候重新计算
	window.onresize = function() {
			contentBind();
			arrow.style.left = liNode[now].getBoundingClientRect().left + liNode[now].offsetWidth / 2 - arrow.offsetWidth / 2 + "px";
			cList.style.top = -now * (document.documentElement.clientHeight - head.offsetHeight) + "px";

		}
	//开机动画实现
	loading();
	function loading(){
		//记录加载图片的数量
		var flag=0;
		//模拟服务器 加载图片
		var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
		for(var i=0;i<arr.length;i++){
			var img=new Image();
			img.src="img/"+arr[i];
			img.onload=function(){
				flag++;
				spanNode.style.width=flag/arr.length*100+"%";
			}
		}
		
		//过度完成
		spanNode.addEventListener("transitionend",function(){
			hideDiv[0].style.height=0;
			hideDiv[1].style.height=0;
			this.style.display="none";
		});
		
		//当遮罩下的div过度完成时把遮罩从dom树中remove掉
		hideDiv[0].addEventListener("transitionend",function(){
			hide.remove();
			animationAttr[0]["inAn"]();
			musicDiv.onclick();
			banner3d();
		});
	}
	
		//音频实现
		musicDiv.onclick = function() {
			if(audio.paused) {
				//如果是暂停的就让播放
				audio.play();
				musicDiv.style.background="url(img/musicon.gif) no-repeat";
			} else {
				audio.pause();
				musicDiv.style.background="url(img/musicoff.gif) no-repeat";
			}
		}

	//出入场动画实现
	var animationAttr = [{
		//第一屏
		inAn: function() {
			home1.style.transform = "translateY(0px)";
			home2.style.transform = "translateY(0px)";
			home1.style.opacity = "1";
			home2.style.opacity = "1";
		},
		ouAn: function() {
			home1.style.transform = "translateY(-200px)";
			home2.style.transform = "translateY(200px)";
			home1.style.opacity = "0";
			home2.style.opacity = "0";
		}
	}, {
		//第二屏
		inAn: function() {
			plan1.style.transform = "translate(0px,0px)";
			plan2.style.transform = "translate(0px,0px)";
			plan3.style.transform = "translate(0px,0px)";
		},
		ouAn: function() {
			plan1.style.transform = "translate(-200px,-200px)";
			plan2.style.transform = "translate(-200px,200px)";
			plan3.style.transform = "translate(200px,-200px)";

		}
	}, {
		//第三屏
		inAn: function() {
			pencel1.style.transform = "translateY(0px)";
			pencel2.style.transform = "translateY(0px)";
			pencel3.style.transform = "translateY(0px)";
		},
		ouAn: function() {
			pencel1.style.transform = "translateY(-200px)";
			pencel2.style.transform = "translateY(200px)";
			pencel3.style.transform = "translateY(200px)";
		}
	}, {
		//第四屏
		inAn: function() {
			about3Div1.style.transform = "rotate(0deg)";
			about3Div2.style.transform = "rotate(0deg)";
		},
		ouAn: function() {
			about3Div1.style.transform = "rotate(45deg)";
			about3Div2.style.transform = "rotate(-45deg)";
		}
	}, {
		//第五屏
		inAn: function() {
			team1.style.transform = "translateX(0px)";
			team2.style.transform = "translateX(0px)";
		},
		ouAn: function() {
			team1.style.transform = "translateX(-200px)";
			team2.style.transform = "translateX(200px)";
		}
	}];

	for(var i = 0; i < animationAttr.length; i++) {
		animationAttr[i]["ouAn"]();
	}

	//第五屏实现
	canvasAn();

	function canvasAn() {
		var oc = null;
		var timer1 = 0;
		var timer2 = 0;
		team3.onmouseleave = function() {
			for(var i = 0; i < teamLis.length; i++) {
				teamLis[i].style.opacity = "1";
			}
			removeCanvas();
		}

		for(var i = 0; i < teamLis.length; i++) {
			teamLis[i].onmouseenter = function() {
				for(var i = 0; i < teamLis.length; i++) {
					teamLis[i].style.opacity = ".5";
				}
				this.style.opacity = "1";

				//给team3添加canvas
				addCanvas();
				//画布定位起来 随着移入的哪个li而改变画布的偏移量
				oc.style.position = "absolute";
				oc.style.left = this.offsetLeft + "px";
				oc.style.top = 0 + "px";

			}
		}

		function addCanvas() {
			if(oc === null) {
				oc = document.createElement("canvas");
				//画布的宽度等于任意一个li的宽度
				oc.width = teamLis[0].offsetWidth;
				oc.height = 338;
				team3.appendChild(oc);
				bubble();
			}
		}

		function removeCanvas() {
			clearInterval(timer1);
			clearInterval(timer2);
			oc.remove();
			oc = null;
		}

		function bubble() {
			if(oc.getContext) {
				var ctx = oc.getContext('2d');
				var arr = [];
				//画圆
				timer1 = setInterval(function() {
						ctx.clearRect(0, 0, oc.width, oc.height);
						//进行曲线运动  修改角度 移动圆点
						for(var i = 0; i < arr.length; i++) {
							arr[i].deg += 5;
							arr[i].xa = arr[i].startLeft + Math.sin(arr[i].deg * Math.PI / 180) * arr[i].num;
							arr[i].yb = arr[i].startTop - (arr[i].deg * Math.PI / 180) * arr[i].num;
							if(arr[i].yb < 100) {
								//控制画出的气泡不要无限制的画下去
								arr.splice(i, 1);
							}

						}

						for(var i = 0; i < arr.length; i++) {
							ctx.fillStyle = "rgba(" + arr[i].red + "," + arr[i].green + "," + arr[i].blue + "," + arr[i].a + ")";
							ctx.beginPath();
							ctx.arc(arr[i].xa, arr[i].yb, arr[i].r, 0, 2 * Math.PI);
							ctx.fill();
						}

					}, 1000 / 60)
					//创建气泡数据  
				timer2 = setInterval(function() {
					//随机生成半径0到6之间 最小为2
					var r = Math.random() * 6 + 2;
					//圆点的范围 圆点的圆心y定义在画布的下面
					var xa = Math.random() * oc.width;
					var yb = oc.height - r - 2;

					//随机生成rgba颜色
					var red = Math.round(Math.random() * 255);
					var green = Math.round(Math.random() * 255);
					var blue = Math.round(Math.random() * 255);
					var a = 1;
					//确定圆的初始位置left和top等于圆点的位置
					var startLeft = xa;
					var startTop = yb;
					//因为气泡药要做sin函数的曲线运动  所以需要一个角度deg  一个控制波长与波峰的比例num
					var deg = 0;
					var num = Math.round(Math.random() * 30) + 30;

					//准备完要画的圆的数据  push到数组中
					arr.push({
						xa: xa,
						yb: yb,
						r: r,
						red: red,
						green: green,
						blue: blue,
						a: a,
						startLeft: startLeft,
						startTop: startTop,
						deg: deg,
						num: num
					});

				}, 50)
			}

		}
	}

	//第四屏类似图片炸裂效果
	picBoom();

	function picBoom() {
		for(var i = 0; i < aboutUls.length; i++) {
			change(aboutUls[i]);

		}

		function change(ul) {
			var src = ul.dataset.src;
			var w = ul.offsetWidth / 2;
			var h = ul.offsetHeight / 2;
			for(var i = 0; i < 4; i++) {
				var aboutLis = document.createElement("li");
				var imgs = document.createElement("img");
				imgs.src = src;
				aboutLis.style.width = w + "px";
				aboutLis.style.height = h + "px";
				//left:0    top:0
				//left:-w   top:0
				//left:0    top:-h
				//left:-w	top:-h
				imgs.style.left = -(i % 2) * w + "px";
				imgs.style.top = -Math.floor((i / 2)) * h + "px";
				aboutLis.appendChild(imgs);
				ul.appendChild(aboutLis);
			}

			var aboutImgs = ul.querySelectorAll("img");
			ul.onmouseenter = function() {
				//	left:0  top:h
				//	left:-2w  top:0
				//	left:w  top:-h
				//	left:-w  top:-2h
				aboutImgs[0].style.top = h + "px";
				aboutImgs[1].style.left = -2 * w + "px";
				aboutImgs[2].style.left = w + "px";
				aboutImgs[3].style.top = -2 * h + "px";
			}
			ul.onmouseleave = function() {
				aboutImgs[0].style.top = 0 + "px";
				aboutImgs[1].style.left = -w + "px";
				aboutImgs[2].style.left = 0 + "px";
				aboutImgs[3].style.top = -h + "px";
			}
		}
	}

	//banner区3d轮播
	function banner3d() {
		for(var i = 0; i < home2Lis.length; i++) {
			home2Lis[i].index = i;
			home2Lis[i].onclick = function() {
				clearInterval(timer3d);
				for(var i = 0; i < home2Lis.length; i++) {
					home2Lis[i].className = "";
				}
				this.className = "active";
				if(this.index > prevIndex) {
					//点击的是右边小圆点 rightShow  leftHide
					home1Lis[this.index].className = "rightShow";
					home1Lis[prevIndex].className = "leftHide";
				} else if(this.index < prevIndex) {
					//点击的是左边小圆点 leftShow rightHide
					home1Lis[this.index].className = "leftShow";
					home1Lis[prevIndex].className = "rightHide";
				}

				prevIndex = this.index; //每次点击完小圆点以后把上一次点击的小圆点同步为刚刚点击的那一个
				autoIndex = this.index;
			}
		}
		home.onmouseenter = function() {
			clearInterval(timer3d);
		}

		move();

		function move() {
			clearInterval(timer3d);
			timer3d = setInterval(function() {
				autoIndex++;
				if(autoIndex == home2Lis.length) {
					autoIndex = 0;
				}
				for(var i = 0; i < home2Lis.length; i++) {
					home2Lis[i].className = "";
				}
				home2Lis[autoIndex].className = "active";
				//定时器一直是向右一个方向
				home1Lis[autoIndex].className = "rightShow";
				home1Lis[prevIndex].className = "leftHide";

				prevIndex = autoIndex;
			}, 2000)
		}
	}

	//滚轮事件
	if(content.addEventListener) {
		content.addEventListener("DOMMouseScroll", function(event) {
			clearTimeout(timer);
			timer = setTimeout(function() {
				fn(event);
			}, 200)

		})
	}
	content.onmousewheel = function(event) {
		clearTimeout(timer);
		timer = setTimeout(function() {
			fn(event);
		}, 200)
	}

	function fn(event) {
		event = event || window.event;
		//记录滚轮方向
		var flag = "";
		if(event.detail) {
			flag = event.detail > 0 ? "down" : "up";
		} else if(event.wheelDelta) {
			flag = event.wheelDelta < 0 ? "down" : "up";
		}
		preArrIndex = now;
		//第一屏和最后一屏加载完再滚动鼠标的时候不需要出场入场
		if((now == 0 && flag == "up") || (now == cLis.length - 1 && flag == "down")) {
			return;
		}
		switch(flag) {
			case "up":
				move(now);
				if(now > 0) {
					now--;
				}
				break;
			case "down":
				move(now);
				if(now < cLis.length - 1) {
					now++;
				}
				break;

		}
		if(event.preventDefault) {
			event.preventDefault();
		}
		return false;

	}

	//内容区
	contentBind();

	function contentBind() {
		content.style.height = document.documentElement.clientHeight - head.offsetHeight + "px";
		for(var i = 0; i < cLis.length; i++) {
			cLis[i].style.height = document.documentElement.clientHeight - head.offsetHeight + "px";
		}
	}

	headBind();
	//头部绑定函数
	function headBind() {
		//默认让home导航选中
		navUpLis[0].style.width = "100%";
		//默认让小三角在home建的中心部分
		arrow.style.left = liNode[0].getBoundingClientRect().left + liNode[0].offsetWidth / 2 - arrow.offsetWidth / 2 + "px";

		//点击导航
		for(var i = 0; i < liNode.length; i++) {
			liNode[i].index = i;
			liNode[i].onclick = function() {
				preArrIndex = now;
				move(this.index);
				now = this.index;
			}
		}
		//点击侧边栏导航
		for(var i = 0; i < liNode.length; i++) {
			menuLis[i].index = i;
			menuLis[i].onclick = function() {
				preArrIndex = now;
				move(this.index);
				now = this.index;
			}
		}
	}
	//移动逻辑
	function move(index) {
		//同步主导航的位置
		for(var i = 0; i < navUpLis.length; i++) {
			navUpLis[i].style.width = "";
		}
		navUpLis[index].style.width = "100%";
		//同步侧边导航的选中状态
		for(var i = 0; i < menuLis.length; i++) {
			menuLis[i].className = "";
		}
		menuLis[index].className = "active";
		//同步小三角的位置
		arrow.style.left = liNode[index].getBoundingClientRect().left + liNode[index].offsetWidth / 2 - arrow.offsetWidth / 2 + "px";
		//同步内容列表
		cList.style.top = -index * (document.documentElement.clientHeight - head.offsetHeight) + "px";

		//出入场逻辑
		//判断当前传入的index有没有对应的出入场动画
		if(animationAttr[index] && animationAttr[index]["inAn"]) {
			animationAttr[index]["inAn"]();
		}
		//点击当前屏显示入场动画  点完当前屏以后上上一次点击的屏为出场动画
		if(animationAttr[preArrIndex] && animationAttr[preArrIndex]["ouAn"]) {
			animationAttr[preArrIndex]["ouAn"]();
		}
	}
}