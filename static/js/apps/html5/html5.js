$(function(){
    var drawing = $('#drawing')[0];
        //context = drawing.getContext("2d");
    //context.strokeStyle = 'red';
    /*context.fillStyle = '#0000ff';
    context.fillRect(10,10,50,50);
    context.fillStyle = 'rgba(0,0,255,0.5)';
    context.fillRect(30,30,50,50);
    context.strokeStyle = '#ff0000';
    context.strokeRect(60,0,50,50);
    context.strokeStyle = 'rgba(0,0,255,0.5)';
    context.strokeRect(0,60,50,50);
    context.clearRect(40,40,10,10);*/
    //context.beginPath();
   /* context.arc(100,100,99,0,2*Math.PI,false);
    context.moveTo(194,100);
    context.arc(100,100,94,0,2*Math.PI,false);
    context.moveTo(100,100);
    context.lineTo(100,15);
    context.moveTo(100,100);
    context.lineTo(35,100);
    context.stroke();
    context.font = 'bold 14px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('12',100,20);
    context.textAlign = 'start';
    context.fillText('12',100,40);
    context.textAlign = 'end';
    context.fillText('12',100,60);
    tools.log(context.isPointInPath(100,100));
    //变化远点
    context.translate(100,100);
    //旋转表针
    context.rotate(1);
    context.moveTo(0,0);
    context.lineTo(0,-85);
    context.moveTo(0,0);
    context.lineTo(-65,0);
    context.stroke();*/
    /*var logo = $('.logo img');
    logo.load(function(){
        context.drawImage(logo[0],0,0,50,50,0,0,50,50);
    });*/
    //context.drawImage(logo,10,10);
    /*context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 4;
    context.shadowColor = "rgba(0,0,0,0.5)";
    /*var gradient = context.createLinearGradient(30,30,70,70);
    gradient.addColorStop(0,"white");
    gradient.addColorStop(1,"black");*/
    /*var gradient = context.createRadialGradient(55,55,10,55,55,30);
    gradient.addColorStop(0,"white");
    gradient.addColorStop(1,"black");
    context.fillStyle = "#ff0000";
    context.fillRect(10,10,50,50);
    context.fillStyle = gradient;
    context.fillRect(30,30,50,50);*/
    var gl = drawing.getContext("experimental-webgl");
    if(gl){
        gl.clearColor(0,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0,0,drawing.width,drawing.heigth);
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([0,0.5,1]),gl.STATIC_DRAW);
    }
    
    //导出图像
    var imgUrl = drawing.toDataURL("image/png");
    var image = new Image();
    image.src = imgUrl;
    $('#img').attr('src',imgUrl);

});