$.fn.jsoninput = function() {
    var self = this,
        jsoninput = self.find('.jsoninput'),
        jsonbeauty = self.find('.jsonbeauty'),
        code = jsoninput.val();
    seajs.use(['highlight','highlight-css'],function(){
        code && render(code);
        jsoninput.select();
        bindEvent();
    });
    function bindEvent(){
        var before = -1,
            time = null;
        jsoninput.keyup(function(){
            var now = Date.now();
            if(time){
                clearTimeout(time);
            }
            if(before){
                if(now - before > 1000){
                    render(jsoninput.val());
                }else{
                    time = setTimeout(render,1000);
                }
            }else{
                before = Date.now();
            }
        });
    }
    function render(code){
    　　var code = code || jsoninput.val();
        var bstr = jsonBeauty(code);
        if(!bstr)
            return;
        jsoninput.val(bstr.plain);
        jsonbeauty.html(bstr.beauty);
    }
    function jsonBeauty(str){
        var jsondata = null;
        try{
            jsondata = JSON.parse(str);
        }catch(e){
            return null;
        }
        if(!jsondata){
            return null;
        }
        return {plain:JSON.stringify(jsondata,'undefined',4),beauty:hljs.highlight('json',JSON.stringify(jsondata,'undefined',4)).value};
    }
    return self;
};
JsonInput = function(json){
    
};
JsonInput.prototype={
    pass:function(){
        var result = {};
        result = hljs.highlightAuto(this.code);
        if(this.support[result.language]){
            return this[result.language]();
        }
    }
};