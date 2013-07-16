$(function(){
    var map = new BMap.Map("container");          // 创建地图实例  
    var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
    /*window.setTimeout(function(){    
      map.panTo(new BMap.Point(116.409, 39.918));    
    }, 2000);*/ 
    /*map.addControl(new BMap.NavigationControl()); 
    map.addControl(new BMap.ScaleControl());*/
    //map.addControl(new BMap.OverviewMapControl());
    /*map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity("北京"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用*/
   /* var opts = {offset: new BMap.Size(150, 5)}    
	map.addControl(new BMap.ScaleControl(opts));
	var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL}    
	map.addControl(new BMap.NavigationControl(opts)); */
	// 定义一个控件类，即function    
	/*function ZoomControl(){    
	    // 设置默认停靠位置和偏移量  
	    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;    
	    this.defaultOffset = new BMap.Size(10, 10);    
	}    
	// 通过JavaScript的prototype属性继承于BMap.Control   
	ZoomControl.prototype = new BMap.Control();
    	// 自定义控件必须实现initialize方法，并且将控件的DOM元素返回   
    	// 在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中   
    	ZoomControl.prototype.initialize = function(map){    
    	// 创建一个DOM元素   
    	var div = document.createElement("div");    
    	// 添加文字说明    
    	div.appendChild(document.createTextNode("放大2级"));    
    	// 设置样式    
    	div.style.cursor = "pointer";    
    	div.style.border = "1px solid gray";    
    	div.style.backgroundColor = "white";    
    	// 绑定事件，点击一次放大两级    
    	div.onclick = function(e){  
    	map.zoomTo(map.getZoom() + 2);    
    	}    
    	// 添加DOM元素到地图中   
    	map.getContainer().appendChild(div);    
    	// 将DOM元素返回  
    	return div;
	}*/
	/*// 创建控件实例    
	var myZoomCtrl = new ZoomControl();    
	// 添加到地图当中    
	map.addControl(myZoomCtrl);  */
    /*var marker = new BMap.Marker(point);        // 创建标注    
    map.addOverlay(marker);                     // 将标注添加到地图中   */
    function addMarker(point, index){  // 创建图标对象 
        var myIcon = new BMap.Icon("/static/images/logo/logo.png", new BMap.Size(50, 50), {  
            // 指定定位位置。 
            // 当标注显示在地图上时，其所指向的地理位置距离图标左上  
            // 角各偏移10像素和25像素。您可以看到在本例中该位置即是 
           // 图标中央下端的尖角位置。  
           offset: new BMap.Size(10, 25)
           // 设置图片偏移。 
           // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您 
           // 需要指定大图的偏移位置，此做法与css sprites技术类似。  
           //imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置图片偏移  
        });    
    // 创建标注对象并添加到地图 
     var marker = new BMap.Marker(point, {icon: myIcon});  
     map.addOverlay(marker);
     return marker;
    }  
    // 随机向地图添加10个标注  
    var bounds = map.getBounds();  
    var lngSpan = bounds.maxX - bounds.minX;  
    var latSpan = bounds.maxY - bounds.minY;  
    for (var i = 0; i < 10; i ++) {  
     var point = new BMap.Point(bounds.minX + lngSpan * (Math.random() * 0.7 + 0.15),  
                                bounds.minY + latSpan * (Math.random() * 0.7 + 0.15));  
     addMarker(point, i);  
    }
    var marker = addMarker(new BMap.Point(116.404, 39.915), 0);
    marker.enableDragging();
    marker.addEventListener("dragend", function(e){
        alert("当前位置：" + e.point.lng + ", " + e.point.lat);    
    });
});