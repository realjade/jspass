(function () {
   //工具代码
    tools = {
        cookie:{
            set:function(name,value){
                var exp  = new Date();
                exp.setTime(exp.getTime() + 30*24*60*60*1000);   
                document.cookie = name + '='+ escape (value) + ';expires=' + exp.toGMTString()+';path=/';
            },
            get:function(name){
                var arr = document.cookie.match(new RegExp('(^| )'+name+'=([^;]*)(;|$)'));
                if(arr != null) return unescape(arr[2]); return null;
            },
            del:function(name){
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval=api.cookie.getCookie(name);
                if(cval!=null){
                    document.cookie= name + '='+cval+';expires='+exp.toGMTString()+';path=/';
                    document.cookie= name + '='+cval+';expires='+exp.toGMTString();
                }
            }
        },
        log:function(_message){
            if('console' in window && 'log' in window.console){
                console.log(_message);
            }
        },
        // 纵向滚动到指定位置
        scrollTween: function(y, callback) {
            jQuery('html, body').animate({
                    scrollTop: (y || 0)
            }, 500, 'easeOutExpo', function () {
                return callback && callback();
            });
        },
        
        // 取消选中的文本
        clearSelect: function() {
            if(document.selection && document.selection.empty) {
                document.selection.empty();
            }
            else if(window.getSelection) {
                window.getSelection().removeAllRanges();
            }
        },
        
        // 计算字符串的字节长度
        countByte: function(str) {
            var size = 0;
            for (var i = 0, l = str.length; i < l; i++) {
                size += str.charCodeAt(i) > 255 ? 2 : 1;
            }

            return size;
        },
        
        // 根据字节截取长度
        substrByByte: function (str, limit) {
            for (var i = 1, l = str.length + 1; i < l; i++) {
                if (this.countByte(str.substring(0, i)) > limit) {
                    return str.substring(0, i - 1);
                }
            }
            return str;
        },
        
        //获得URL中键值对
        paramOfUrl: function (url) {
            url = url || location.href;
            var paramSuit = url.substring(url.indexOf('?') + 1).split("&");
            var paramObj = {};
            for (var i = 0; i < paramSuit.length; i++) {
                var param = paramSuit[i].split('=');
                if (param.length == 2) {
                    var key = decodeURIComponent(param[0]);
                    var val = decodeURIComponent(param[1]);
                    if (paramObj.hasOwnProperty(key)) {
                        paramObj[key] = jQuery.makeArray(paramObj[key]);
                        paramObj[key].push(val);
                    }
                    else {
                        paramObj[key] = val;
                    }
                }
            }
            return paramObj;
        },
        
        cancelBubble: function(_event) {
            if (_event && _event.stopPropagation)
                _event.stopPropagation();
            else
                window.event.cancelBubble=true;
        },
        
        cancelDefault: function(_event) {
            if(_event && _event.preventDefault){
                _event.preventDefault();
            } else{
                window.event.returnValue = false;
            }
            return false;
        },
        
        reflow: function(obj) {
            jQuery(obj).each(function() {
                jQuery(this).hide().show();
            });
        },
        
        dateformat:function(datetime,type){
            if(type=='full'){
                return new Date(datetime).strftime('%Y年%m月%d日, %H:%M:%S');
            }
            if(!type||type=='medium'){
                return new Date(datetime).strftime('%m月%d日%H:%M');
            }
        },
        emailGoto:function(email){
            if(!this.isEmail(email)){
                return email;
            }
            var emailList = {
                "gmail.com":"http://gmail.com",
                "hotmail.com":"http://www.hotmail.com",
                "live.com":"http://www.hotmail.com",
                "126.com":"http://mail.126.com",
                "163.com":"http://mail.163.com",
                "sina.com":"http://mail.sina.com.cn",
                "sina.cn":"http://mail.sina.com.cn",
                "qq.com":"http://mail.qq.com",
                "vip.qq.com":"http://mail.qq.com",
                "foxmail.com":"http://mail.qq.com",
                "yahoo.com":"http://mail.yahoo.com",
                "yahoo.com.tw":"http://mail.yahoo.com.tw",
                "yahoo.com.hk":"http://mail.yahoo.com.hk",
                "sohu.com":"http://mail.sohu.com",
                "yeah.net":"http://wwww.yeah.net",
                "189.cn":"http://mail.189.cn"
            };
            var domain = email.split('@')[1];
            return emailList[domain] || 'http://mail.'+ domain;
        },
        isEmail:function(email){
            return /^([a-z0-9A-Z]+[-|._]*)*[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?.)+[a-zA-Z]+$/.test(email);
        },
        isMobile:function(mobile){
            return /^\d{11}$/.test(mobile);
        },
        isZipcode:function(zipcode){
            return /^\d{6}$/.test(zipcode);
        },
        isDigit:function(digit,len){
            if(len){
                return new RegExp('^\d{'+len+'}$','g').test(digit);
            }else{
                return /^\d+$/.test(digit);
            }
        },
        uniqueID:function(){
            return Date.now().toString(36);
        },
        setStore:function(key,value){
            var storage = window.localStorage;
            if(!storage) return '';
            storage.setItem(key,value);

        },
        getStore:function(key){
            var storage = window.localStorage;
            if(!storage) return '';
            return storage.getItem(key) || '';
        }
    };
    //扩展系统方法
    //为funciton添加bind方法
    if(!Function.prototype.bind) {
        Function.prototype.bind = function(thisArg) {
            var bargs = Array.prototype.slice.call(arguments, 1);
            var method = this;
            return function() {
                var args = bargs.slice(0);
                args.push.apply(args, arguments);
                var ret = method.apply(thisArg, args);
                return ret;
            };
        };
    }
    if(!Date.now){
        Date.now = function(){
            return new Date().valueOf();
        };
    }
    Date.prototype.strftime = function(format) {
        var self = this;
        function padding(n, p) {
            if(n < 10) {
                return (p || '0') + n;
            }
            return n;
        }
        function repl(s, c) {
            switch(c) {
                case 'd':
                    return padding(self.getDate());
                case 'e':
                    return self.getDate();
                case 'u':
                    return self.getDay() + 1;
                case 'w':
                    return self.getDay();
                case 'm':
                    return padding(self.getMonth() + 1);
                case 'C':
                    return parseInt(self.getFullYear() / 20 - 1, 10);
                case 'y':
                    return padding(self.getFullYear() % 100);
                case 'Y':
                    return self.getFullYear();
                case 'H':
                    return padding(self.getHours());
                case 'I':
                    return padding(self.getHours() % 12);
                case 'l':
                    return padding(self.getHours() % 12, ' ');
                case 'M':
                    return padding(self.getMinutes());
                case 'p':
                    return self.getHours() <12 ? 'AM' : 'PM';
                case 'P':
                    return self.getHours() <12 ? 'am' : 'pm';
                case 'r':
                    return self.strftime('%I:%M:%S %p');
                case 'R':
                    return self.strftime('%H:%M');
                case 'S':
                    return padding(self.getSeconds());
                case 'T':
                    return self.strftime('%H:%M:%S');
                case 'D':
                    return self.strftime('%m/%d/%Y');
                case 'F':
                    return self.strftime('%Y-%m-%d');
                case 's':
                    return parseInt(self.getTime()/1000, 10);
                case 'x':
                    return self.toLocaleDateString();
                case 'X':
                    return self.toLocaleTimeString();
                case 'n':
                    return '\n';
                case 't':
                    return '\t';
                case '%':
                    return '%';
                default:
                    return self.strftime(c);
            }
            return c;
        }
        var ret = format.replace(/%(\w)/g, repl);
        return ret;
    };
})();
/**HTML各种功能判断**/
jQuery(function() {
   jQuery.support.placeholder = false;
   test = document.createElement('input');
   if('placeholder' in test) jQuery.support.placeholder = true;
});
/** 所有由脚本创建的DOM结构都应该放置在这个容器里**/
(function () {

    var panel = null;

    this.DOMPanel = {

        append: function (dom) {
            this.getPanel().append(dom);
        },

        prepend: function (dom) {
            this.getPanel().prepend(dom);
        },

        getPanel: function () {
            if (panel === null) {
                panel = jQuery('#domPanel');
                if (panel.size() === 0) {
                    panel = jQuery('<div id="domPanel" />').prependTo('body');
                }
            }

            return panel;
        }
    };

})();
/**指定位置**/
var Offset = function(element, o){  
    this.options = {
        top: null,
        left: null
    };
    jQuery.extend(this.options,o);
    this.initialize(element);   
};

Offset.prototype={
    initialize: function(element) {
        this.element = jQuery(element);
        this.setOffset();
        this.listenResize();
    },
    
    setOffset: function() {
        var left = this.options.left;
        // 如果LEFT没有指定 那么水平居中
        if(left == null) {
            left = (jQuery(window).width() - this.element.outerWidth()) / 2;
            left = Math.max(0, left);
        }
    
        var top = this.options.top;
        // 如果TOP没有指定 那么垂直居中
        if(top == null) {
            top = (jQuery(window).height() - this.element.outerHeight()) / 2;
            top = Math.max(0, top);
        }
        
        // 如果元素不是fixed定位 那么加上滚动条距离
        if(this.element.css('position') != 'fixed') {
            left += jQuery(document).scrollLeft();
            top += jQuery(document).scrollTop();
        }
        
        this.element.css({left:left, top:top});
    },
    
    listenResize: function() {
        var self = this;
        var contextProxy = function() {
            // 防止销魂元素后导致内存泄露（因为RESIZE事件是注册在WINDOW对象上 而不是ELEMENT元素上）
            if(self.element.parent().size() === 0) {
                jQuery(window).unbind('resize', contextProxy);
            }
            else if(self.element.is(':visible') && self.element.css('top').toInt() >= 0) {
                self.setOffset();
            }
        };
        jQuery(window).resize(contextProxy);
    }
};

/**提示smallnot**/
SmallNote=function(o){
    this.options={
        top: 0, time: 4000, pattern: null,text:'加载中...'
    };
    jQuery.extend(this.options, o);
    var element = this.element = jQuery('<div class="smallnote">' + this.options.text + '</div>');
    element.css({top: this.options.top});
    
    // 额外的定制样式 目前支持的只有一种： error
    // 如果传递额外的类型 需要自行定义style, 需要注意的是class会自动添加前缀：supernatant-[pattern]
    if(this.options.pattern !== null) {
        element.addClass('smallnote-' + this.options.pattern);
    }

    // 保持单例
    if(SmallNote.present) {
        SmallNote.present.remove();
    }
    SmallNote.present = this;
    DOMPanel.append(element);
    this.offset = new Offset(element, {top: this.options.top});
    // 启用销毁定时器
    this.destroyTimer();
};
SmallNote.prototype={
    destroyTimer: function() {
        var that = this;
        setTimeout(function() {
            that.element.fadeOut('slow', function() {
                that.remove();
            });
        }, this.options.time);
    },
    remove:function(){
        return this.element && this.element.remove();
    }
};
function smallnote(text,options){
    var o;
    if(options){
        options.text=text;
        o=options;
    }else{
        o={text:text};
    }
    new SmallNote(o);
}

/**
 * 模板
 */
var Template = null;
jQuery(function() {
    Template = jQuery('#vselfTempl').html();
});


/**
 * placeholder实现
 */
/*
jQuery(function () {
    if(!jQuery.support.placeholder){
        jQuery('input[placeholder],textarea[placeholder]').each(function(){
            var target = jQuery(this),
                parent = target.parent(),
                element = jQuery('<div class="placeholder">'
                              +'<label>'+target.attr('placeholder')+'</label>'
                           +'</div>');
            target.removeAttr('placeholder');
            element.append(target);
            parent.append(element);
        });
        jQuery('.placeholder input,.placeholder textarea').each(function () {
            var input = jQuery(this),
                label = jQuery(this).siblings('label');
            if (input.val()) {
                label.hide();
            }
        });
        jQuery('.placeholder input,.placeholder textarea').live('input propertychange focus blur keydown', function (e) {
            var input = jQuery(this),
                label = jQuery(this).siblings('label');
            if (input.val().length > 0 || (e.type == 'keydown' && !e.ctrlKey && !e.altKey && !e.shiftKey && e.keyCode != 8)) {
                if (!input.attr('readonly')) label.hide();
            }
            else {
                label.show();
            }
        });
    
        // 添加一个FOCUS状态
        jQuery('.placeholder input, .placeholder textarea').live('focus', function () {
            var input = jQuery(this);
            input.parent('.placeholder').addClass('focus');
        });
        jQuery('.placeholder input, .placeholder textarea').live('blur', function () {
            var input = jQuery(this);
            input.parent('.placeholder').removeClass('focus');
        });
        jQuery('.placeholder label').live('click', function () {
            var input = jQuery(this).siblings('.placeholder input');
            input.focus();
        });
    }
});*/

// 全局AJAX请求失败处理
jQuery(document).ajaxError(function(e, xmlhttp, opt) {
    if(xmlhttp.readyState == 4)
        smallnote('网络异常，请稍候再试！');
});

// 全局AJAX请求异常处理
jQuery(document).ajaxSuccess(function(e, xmlhttp, opt){
    var res = eval('('+xmlhttp.responseText+')');
    if(jQuery.isNumeric(res.code) && res.code != 0) {
        smallnote(res.message || '服务器异常，请稍后再试！');
    }
});