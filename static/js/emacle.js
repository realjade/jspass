// 全局添加一些正则
RegExp.extend({

    isEmail: function (text) {
        return /^([\w-])+(\.\w+)*@([\w-])+((\.\w+)+)$/.test(String(text).trim());
    },

    isMobile: function (text) {
        return /^\d{11}$/.test(String(text).trim());
    },

    isLandline: function (text) {
        return /^((\d{7,8})|((\d{3,4})-(\d{7,8})(-(\d{1,4}))?)|(\d{7,8})-(\d{1,4}))$/.test(String(text).trim());
    },

    isPhone: function (text) {
        return this.isMobile(text) || this.isLandline(text);
    }
});

// 扩展几个TWEEN
jQuery.extend(jQuery.easing, {

    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },

    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },

    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, - 10 * t / d) + 1) + b;
    }
});

// 一些工具方法
var Toolkit = {

	// 纵向滚动到指定位置
	scrollTween: function (y, callback) {
		jQuery('html,body').animate({ // Chrome和IE使用html FF使用body
			scrollTop: (y || 0)
		}, 500, 'easeOutExpo', function () {
			return callback && callback();
		});

		// jQuery('html, body').prop('scrollTop', y);
		// return callback && callback();
	},

	//禁止用滚动条
	forbidScroll: function () {
		document.body.parentNode.style.overflow = "hidden"
	},

	//启用
	allowScroll: function () {
		document.body.parentNode.style.overflow = "scroll";
	},

	// 取消选中的文本
	clearSelect: function () {
		if (document.selection && document.selection.empty) {
			document.selection.empty();
		}
		else if (window.getSelection) {
			window.getSelection().removeAllRanges();
		}
	},

    // 计算字符串的字节长度
    countByte: function (str) {
        var size = 0;
        for (var i = 0, l = str.length; i < l; i++) {
            size += str.charCodeAt(i) > 255 ? 2 : 1;
        }

        return size;
    },

	//计算字符串长度 ，中文算两个字节长度
	countCharacters: function(str) {
		var totalCount = 0; 
		for (var i=0; i<str.length; i++) { 
			var c = str.charCodeAt(i); 
			if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
				 totalCount++; 
			 }else {     
				 totalCount+=2; 
			 } 
		 }
		return totalCount;
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

    cancelBubble: function (_event) {
        if (_event && _event.stopPropagation)
            _event.stopPropagation();
        else
            window.event.cancelBubble=true;
    },

    cancelDefault: function (_event) {
        if(_event && _event.preventDefault){
            _event.preventDefault();
        } else{
            window.event.returnValue = false;
        }
        return false;
    },

    reflow: function (obj) {
        jQuery(obj).each(function () {
            jQuery(this).hide().show();
        });
    },

    // 后台的返回时间可能是毫秒 这里转换成可视化的格式
    formatTime: function (milli) {
        var fmtl = this.formatLength;

        if (/^\d+$/.test(milli)) {
            var date = new Date(milli);
            return [fmtl(date.getFullYear()), fmtl(date.getMonth() + 1), fmtl(date.getDate())].join('-') + ' ' + [fmtl(date.getHours()), fmtl(date.getMinutes()), fmtl(date.getSeconds())].join(':');
        }

        return milli;
    },

	formatSpace: function(size,num) {
		var unit = [' B',' KB',' MB',' GB', ' TB'],
			index = 0,
			num = num ? num : 2;
			size = size ? parseInt(size) : 0;
			
		while(size/1024 > 1){
			index ++;
			size = size/1024;
		}
		
		return size.toFixed(num)+unit[index];
		
	},
	// 将时间转换回Date对象
	getDate: function (time) {
		if (/^\d{4}-\d{1,2}-\d{1,2}\s+\d{1,2}:\d{1,2}:\d{1,2}$/.test(time)) {
			var list = time.split(/[-:\s]/);
			return new Date(list[0], list[1] - 1, list[2], list[3], list[4], list[5]);
		}
		return time || new Date();
	},

	// 格式化数字为指定长度
	formatLength: function (num) {
		return String(num).length == 1 ? ('0' + num) : num;
	},

    verifyEmail: function (email) {
        return /^([\w-])+(\.\w+)*@([\w-])+((\.\w+)+)$/.test(email);
    },

    gotoemail: function (email) {
        email = email.split('@')[1]
        emails = {
            'gmail.com': 'http://gmail.com',
            "hotmail.com": "http://www.hotmail.com",
            "live.com": "http://www.hotmail.com",
            "126.com": "http://mail.126.com",
            "163.com": "http://mail.163.com",
            "sina.com": "http://mail.sina.com.cn",
            "sina.cn": "http://mail.sina.com.cn",
            "qq.com": "http://mail.qq.com",
            "vip.qq.com": "http://mail.qq.com",
            "foxmail.com": "http://mail.qq.com",
            "yahoo.com": "http://mail.yahoo.com",
            "yahoo.com.tw": "http://mail.yahoo.com.tw",
            "yahoo.com.hk": "http://mail.yahoo.com.hk",
            "sohu.com": "http://mail.sohu.com",
            "yeah.net": "http://wwww.yeah.net",
            "emacle.com": "http://mail.emacle.com"
        }
        if (!emails[email]) return 'http://www.' + email
        return emails[email]
    }
};

// 所有由脚本创建的DOM结构都应该放置在这个容器里
// 以便统一DOM树形结构 方便调试
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

                // 点击对话框不会触发给document绑定的点击行为
                panel.click(Toolkit.cancelBubble);
                panel.mousedown(Toolkit.cancelBubble);
            }

            return panel;
        }
    };

})();


// 将非标准浏览器的本地存储桥接成标准API (IE6 IE7) 
(function () {

    function UserData() {
        this.userData = null;
        this.name = location.hostname;

        if (!this.userData) {
            try {
                this.userData = document.documentElement;
                this.userData.addBehavior("#default#userData");

                var expires = new Date();
                expires.setDate(expires.getDate() + 365);
                this.userData.expires = expires.toUTCString();
            }
            catch (e) {}
        }
    }

    UserData.prototype = {

        setItem: function (key, data) {
            try {
                this.userData.setAttribute(key, data);
                this.userData.save(this.name);
            }
            catch (e) {}
        },

        getItem: function (key) {
            try {
                this.userData.load(this.name);
            }
            catch (e) {}

            return this.userData.getAttribute(key);
        },

        removeItem: function (key) {
            try {
                this.userData.load(this.name);
                this.userData.removeAttribute(key);
                this.userData.save(this.name);
            }
            catch (e) {}
        },

        clear: function () {
            try {
                this.userData.load(this.name);
                var attributes = this.userData.attributes;
                for (var i = 0; i < attributes.length; i++) {
                    var key = attributes[i].name;
                    if (key != 'type' && key != 'style') this.userData.removeAttribute(key);
                }
                this.userData.save(this.name);
            }
            catch (e) {}
        }

    };

    // 如果不支持本地存储
    // 使用USERDATA替代接口
    if (!window.localStorage) window.localStorage = new UserData();
})();


// 扩展jQuery.support 添加fixed属性 用来检查浏览器是否支持fixed定位 (IE6)
jQuery(function () {
    var element = jQuery('<div style="position:fixed;top:10px;visibility:hidden;" />');
    DOMPanel.prepend(element);

    jQuery.support.fixed = (element.offset().top === jQuery(document).scrollTop() + 10);
    element.remove();
});


// 添加鼠标滚轮事件
(function () {

    var types = ['DOMMouseScroll', 'mousewheel'];

    if (jQuery.event.fixHooks) {
        for (var i = types.length; i;) {
            jQuery.event.fixHooks[types[--i]] = jQuery.event.mouseHooks;
        }
    }

    jQuery.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) {
                for (var i = types.length; i;) {
                    this.addEventListener(types[--i], handler, false);
                }
            }
            else {
                this.onmousewheel = handler;
            }
        },

        teardown: function () {
            if (this.removeEventListener) {
                for (var i = types.length; i;) {
                    this.removeEventListener(types[--i], handler, false);
                }
            }
            else {
                this.onmousewheel = null;
            }
        }
    };

    jQuery.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },
        unmousewheel: function (fn) {
            return this.unbind("mousewheel", fn);
        }
    });

    var handler = function (event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            returnValue = true,
            deltaX = 0,
            deltaY = 0;
        event = jQuery.event.fix(orgEvent);
        event.type = "mousewheel";

        if (orgEvent.wheelDelta) {
            delta = orgEvent.wheelDelta / 120;
        }
        if (orgEvent.detail) {
            delta = -orgEvent.detail / 3;
        }

        deltaY = delta;

        // Gecko
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = -1 * delta;
        }

        // Webkit
        if (orgEvent.wheelDeltaY !== undefined) {
            deltaY = orgEvent.wheelDeltaY / 120;
        }
        if (orgEvent.wheelDeltaX !== undefined) {
            deltaX = -1 * orgEvent.wheelDeltaX / 120;
        }

        args.unshift(event, delta, deltaX, deltaY);

        return (jQuery.event.dispatch || jQuery.event.handle).apply(this, args);
    };
})();


// 光标操作相关扩展
jQuery.fn.extend({

    // 获取光标位置
    getCaret: function () {
        var obj = jQuery(this)[0];
        var caretPos = 0;
        if (document.selection) {
            obj.focus();
            var sel = document.selection.createRange();
            sel.moveStart('character', - obj.value.length);
            caretPos = sel.text.length;
        }
        else if (obj.selectionStart || obj.selectionStart == 0) {
            caretPos = obj.selectionStart;
        }

        return caretPos;
    },

    // 定位光标到指定位置
    setCaret: function (pos) {
        return jQuery.each(this, function () {
            if (this.setSelectionRange) {
                this.focus();
                this.setSelectionRange(pos, pos);
            }
            else if (this.createTextRange) {
                var range = this.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        });
    },

    // 在光标位置插入或替换选择文本
    insertAtCaret: function (myValue) {
        var obj = jQuery(this)[0];
        if (document.selection) {
            this.focus();
            var sel = document.selection.createRange();
            sel.text = myValue;
            this.focus();
        }
        else if (obj.selectionStart || obj.selectionStart == 0) {
            var startPos = obj.selectionStart,
                endPos = obj.selectionEnd,
                scrollTop = obj.scrollTop;
            obj.value = obj.value.substring(0, startPos) + myValue + obj.value.substring(endPos, obj.value.length);
            this.focus();
            obj.selectionStart = startPos + myValue.length;
            obj.selectionEnd = startPos + myValue.length;
            obj.scrollTop = scrollTop;
        }
        else {
            this.value += myValue;
            this.focus();
        }

        return this;
    },

    selectText: function (start, end) {
        var obj = this[0];
        if (document.selection) {
            if (obj.tagName == 'TEXTAREA') {
                var i = obj.value.indexOf('\r', 0);
                while (i != -1 && i < end) {
                    end--;
                    if (i < start) {
                        start--;
                    }
                    i = obj.value.indexOf('\r', i + 1);
                }
            }
            var range = obj.createTextRange();
            range.collapse(true);
            range.moveStart('character', start);
            if (end != undefined) {
                range.moveEnd('character', end - start);
            }
            range.select();
        }
        else {
            obj.focus();
            obj.selectionStart = start;
            var sel_end = end == undefined ? start : end;
            obj.selectionEnd = Math.min(sel_end, obj.value.length);
        }
        return this;
    },

    // 支持表单的 Ctrl + Enter 快速提交
    ctrlEnter: function () {
        jQuery(this).keydown(function (e) {
            if (!e.shiftKey && !e.altKey && e.ctrlKey && e.keyCode == 13) {
                var obj = jQuery(e.target),
                    form = obj.is('form') ? obj : jQuery(obj[0].form);

                form.trigger('submit');
            }
        });
        return this;
    },

    // 判断两个jQuery元素相等
    equals: function (compareTo) {
        if (!compareTo || this.length != compareTo.length) {
            return false;
        }
        for (var i = 0, l = this.length; i < l; i++) {
            if (this[i] !== compareTo[i]) {
                return false;
            }
        }
        return true;
    },

    // 输入控件的长度限制
    // 注意：计算方式是小于255的字符记长0.5 大于记长为 1
    limitLength: function (limit, callback) {
        return this.each(function () {
            var obj = jQuery(this);
            if (obj.is('input:text') || obj.is('textarea')) {
                var that = this;
                var events = ['keyup', 'focus', 'blur'];
                jQuery.each(events, function (i, type) {
                    jQuery(that).bind(type, function () {
                        var obj = jQuery(this),
                            val = Toolkit.substrByByte(obj.val(), limit * 2), // 将限制放大两倍 因为期望的是按字节截取 
                            size = Math.ceil(Toolkit.countByte(val) / 2);
                        obj.val(val);
                        obj.scrollTop(obj[0].scrollHeight); // 滚动到最底部
                        callback && callback(val, size, limit);
                    });
                });
                obj.triggerHandler('blur');
            }
        });
    }
});

// dataset 扩展
(function () {

    var encode = function (name) {
        return 'data-' + name.hyphenate().toLowerCase();
    };

    var decode = function (name) {
        return name.replace(/^data-/ig, '').toLowerCase().camelCase();
    };

    var autobox = function (val) {
        if (val != null && new RegExp('^' + Number.from(val) + '$').test(val)) {
            return Number.from(val);
        }
        if (/true|false/i.test(val)) {
            return String(val) == 'true';
        }
        return val != null ? String(val) : null;
    };

    jQuery.fn.dataset = function (attr, val) {
        // 获取数据集
        if (arguments.length == 0) {
            var dataset = {};
            jQuery(this).eq(0).each(function () {
                var attrs = this.attributes;
                for (var i = 0, l = attrs.length; i < l; i++) {
                    var attr = attrs[i];
                    if (/^data-/i.test(attr.name)) {
                        dataset[decode(encode(attr.name.substring(5)))] = autobox(attr.value);
                    }
                }
            });
            return dataset;
        }

        // 返回指定数据
        if (arguments.length == 1 && typeof attr != 'object') {
            return autobox(this.attr(encode(attr)));
        }

        // 设置数据集
        var dataset = attr;
        if (typeof attr != 'object') {
            dataset = {};
            dataset[attr] = val;
        }
        var tmp = {};
        jQuery.each(dataset, function (k, v) {
            tmp[encode(k)] = autobox(v);
        });
        return this.attr(tmp);
    };
})();


// Comet 轮询
// interval是用来设置间隔轮询的 毫秒单位 目的是为了支持当服务器端不支持阻塞响应的时候 设置interval来定时请求
var CometRequest = new Class({

    Implements: [Events, Options],

    options: {
        url: null,
        method: 'get',
        format: 'json',
        timeout: 60000,
        interval: 0
    },

    initialize: function (options) {
        this.setOptions(options);
    },

    openConnect: function () {
        // 防止手动调用导致生成多个连接
        this.closeConnect();

        var self = this;
        this.request = jQuery.ajax({
            url: this.options.url,
            timeout: this.options.timeout,
            type: this.options.method,
            dataType: this.options.format,
            data: this.options.data,
            cache: false,
            beforeSend: function () {
                self.fireEvent(EmacleEvents.START, arguments);
            },
            success: function () {
                self.fireEvent(EmacleEvents.SUCCESS, arguments);
            },
            error: function () {
                self.fireEvent(EmacleEvents.ERROR, arguments);
            },
            complete: function () {
                self.delayTimer = self.openConnect.bind(self).delay(self.options.interval);
            }
        });
    },

    closeConnect: function () {
        // 清理阻塞式请求
        if (this.request && this.request.abort) {
            this.request.abort();
        }
        // 清理延迟式请求
        clearTimeout(this.delayTimer);
        this.request = null;
    }
});

// AJAX队列
var AjaxQueue = new Class({

	queue: [],

	request: null,

	ajax: function (opt) {
		this.queue.push(opt);
		this.start();

		return this;
	},

	start: function () {
		if (this.queue.length == 0 || this.request != null) {
			return false;
		}

		var self = this,
			opt = this.queue.shift(),
			temp = opt.complete || jQuery.noop;
		opt.complete = function () {
			temp.apply(this, arguments);
			self.request = null;
			self.start();
		};

		this.request = jQuery.ajax(opt);
	}
});

/**
 * 缓存类 基于LRU
 */
var CachePriority = {
    Low: 1,
    Normal: 2,
    High: 4
};

var Cache = new Class({

    initialize: function (size) {
        this.items = {};
        this.count = 0;
        this.size = size || -1;
        this.fillFactor = 0.75;
        this.purgeSize = Math.round(this.size * this.fillFactor);

        this.stats = {
            hits: 0,
            missed: 0
        };
    },

    getItem: function (key) {
        var item = this.items[key];

        if (item != null) {
            if (!this.isExpired(item)) {
                item.lastAccessed = new Date().getTime();
            }
            else {
                this.removeItem(key);
                item = null;
            }
        }

        var result = null;
        if (item != null) {
            result = item.value;
            this.stats.hits++;
        }
        else {
            this.stats.misses++;
        }
        return result;
    },

    setItem: function (key, value, options) {
        var CacheItem = function (k, v, o) {
            if ((k == null) || (k == '')) throw new Error("key cannot be null or empty");

            this.key = k;
            this.value = v;
            o = o || {};
            if (o.expirationAbsolute != null) o.expirationAbsolute = o.expirationAbsolute.getTime();
            if (o.priority == null) o.priority = CachePriority.Normal;
            this.options = o;

            this.lastAccessed = new Date().getTime();
        };

        this.addItem(new CacheItem(key, value, options));

        if ((this.size > 0) && (this.count > this.size)) {
            this.purge();
        }
    },

    clear: function () {
        for (var key in this.items) {
            this.removeItem(key);
        }
    },

    purge: function () {
        var tmparray = [];

        for (var key in this.items) {
            var item = this.items[key];
            if (this.isExpired(item)) {
                this.removeItem(key);
            }
            else {
                tmparray.push(item);
            }
        }

        if (tmparray.length > this.purgeSize) {
            tmparray = tmparray.sort(function (a, b) {
                if (a.options.priority != b.options.priority) {
                    return b.options.priority - a.options.priority;
                }
                else {
                    return b.lastAccessed - a.lastAccessed;
                }
            });

            while (tmparray.length > this.purgeSize) {
                var ritem = tmparray.pop();
                this.removeItem(ritem.key);
            }
        }
    },

    addItem: function (item) {
        if (this.items[item.key] != null) this.removeItem(item.key);

        this.items[item.key] = item;
        this.count++;
    },

    removeItem: function (key) {
        var item = this.items[key];
        delete this.items[key];
        this.count--;

        if (item.options.callback != null) {
            var callback = function () {
                item.options.callback(item.key, item.value);
            };
            setTimeout(callback, 0);
        }
    },

    isExpired: function (item) {
        var now = new Date().getTime();
        var expired = false;
        if ((item.options.expirationAbsolute) && (item.options.expirationAbsolute < now)) {
            expired = true;
        }
        if (!expired && (item.options.expirationSliding)) {
            var lastAccess = item.lastAccessed + (item.options.expirationSliding * 1000);
            if (lastAccess < now) {
                expired = true;
            }
        }
        return expired;
    }

});

// 指定位置Class
var Offset = new Class({

    Implements: [Options, Events],

    options: {
        top: null,
        left: null
    },

    initialize: function (element, options) {
        this.element = jQuery(element);
        this.setOptions(options);
        this.setOffset();
        this.listenResize();
    },

    setOffset: function () {
        var left = this.options.left;
        // 如果LEFT没有指定 那么水平居中
        if (left == null) {
            left = (jQuery(window).width() - this.element.outerWidth()) / 2;
            left = Math.max(0, left);
        }

        var top = this.options.top;
        // 如果TOP没有指定 那么垂直居中
        if (top == null) {
            top = (jQuery(window).height() - this.element.outerHeight()) / 2;
            top = Math.max(0, top);
        }

        // 如果元素不是fixed定位 那么加上滚动条距离
        if (this.element.css('position') != 'fixed') {
            left += jQuery(document).scrollLeft();
            top += jQuery(document).scrollTop();
        }

        this.element.css({
            left: left,
            top: top
        });
    },

    listenResize: function () {
        var self = this;
        var contextProxy = function () {
            // 防止销魂元素后导致内存泄露（因为RESIZE事件是注册在WINDOW对象上 而不是ELEMENT元素上）
            if (self.element.parent().size() === 0) {
                jQuery(window).unbind('resize', contextProxy);
            }
            else if (self.element.is(':visible') && self.element.css('top').toInt() >= 0) {
                self.setOffset();
            }
        };
        jQuery(window).resize(contextProxy);
    }

});

// 小提示效果
var Smallnotes = new Class({

    Implements: [Options, Events],

    options: {
        top: 0,
        time: 4000,
        pattern: null
    },

    initialize: function (text, options) {
        this.setOptions(options);

        var element = this.element = jQuery('<div class="supernatant">' + text + '</div>');
        element.css({
            top: this.options.top
        });

        // 额外的定制样式 目前支持的只有一种： error
        // 如果传递额外的类型 需要自行定义style, 需要注意的是class会自动添加前缀：supernatant-[pattern]
        if (this.options.pattern !== null) {
            element.addClass('supernatant-' + this.options.pattern);
        }

        // 保持单例
        if (Smallnotes.present) {
            Smallnotes.present.remove();
        }
        Smallnotes.present = this;

        // 添加到页面
        DOMPanel.append(element);

        // 定位
        this.offset = new Offset(element, {
            top: this.options.top
        });

        // 启用销毁定时器
        this.destroyTimer();
    },

    destroyTimer: function () {
        var that = this;
        setTimeout(function () {
            that.element.fadeOut('slow', function () {
                that.remove();
            });
        }, this.options.time);
    },

    remove: function () {
        return this.element && this.element.remove();
    }
});

// 快捷方式
function smallnotes(text, options) {
    return new Smallnotes(text, options);
}

// 常用事件类型
var EmacleEvents = {
    SHOW: 'EmacleEvents.SHOW',
    HIDE: 'EmacleEvents.HIDE',
    CLOSE: 'EmacleEvents.CLOSE',
    MINIMIZE: 'EmacleEvents.MINIMIZE',
    REMOVE: 'EmacleEvents.REMOVE',
    LOGIN: 'EmacleEvents.LOGIN',
    START: 'EmacleEvents.START',
    SUCCESS: 'EmacleEvents.SUCCESS',
    ERROR: 'EmacleEvents.ERROR',
    SWITCH: 'EmacleEvents.SWITCH',
    NORESULT: 'EmacleEvents.NORESULT',
    SELECT: 'EmacleEvents.SELECT',
    ENTER: 'EmacleEvents.ENTER'
};

// 遮罩层
var MaskLayer = new(new Class({

    element: null,

    getElement: function () {
        if (this.element === null) {
            this.element = jQuery('#masklayer');
            if (this.element.size() == 0) {
                this.element = jQuery('<div id="masklayer" />').appendTo(DOMPanel.getPanel());
            }
        }

        return this.element;
    },

    show: function () {
        this.getElement().show();
    },

    hide: function () {
        this.getElement().hide();
    }
}));

// 弹窗单例管理
var DialogManager = {

    present: null,

    keepSingle: function (dialog) {
        if (instanceOf(this.present, CommonDialog)) {
            this.present.close(dialog.options.modal);
        }

        this.present = dialog;

        this.bindEvent();
    },

	escCancel: function (e) {
		if (e.keyCode == 27 && DialogManager.present) {
			var dialog = DialogManager.present,
				element = dialog.element;

			if (element.is(':visible') && element.css('top').toInt() > 0) {
				dialog.hide();
			}
		}
	},

    bindEvent: function () {
        jQuery(document).keydown(this.escCancel);
        this.bindEvent = jQuery.noop;
    }
};

// 弹窗
var CommonDialog = new Class({

    Implements: [Options, Events],

    options: {
        width: 560,
        title: '提示',
        message: '你木有事做吗？你真的木有事做吗？那你替我写封情书给布娃娃吧~',
        isFixed: true,
        denyEsc: false,
        modal: true,
        minify: false,
        independence: false
    },

    initialize: function (message, options) {
        //  做个参数格式兼容 方便调用
        if (typeof message === 'object') {
            this.setOptions(message);
        }
        else if (typeof message === 'string') {
            this.options.message = message;
            this.setOptions(options);
        }

        var element = this.element = this.getElement();
        this.bindEvent();

        // 保持单例
        if (this.options.independence !== true) DialogManager.keepSingle(this);

        // 添加到页面
        DOMPanel.append(element);

        // 定位
        this.offset = new Offset(element, {
            top: this.options.top,
            left: this.options.left
        });

        // 显示
        this.show();
    },

    getElement: function () {
        var fragment = ['<div class="common-dialog">', '<div class="wrapper">', '<header>', '<h3 class="title">',
        this.options.title, '</h3>',
        this.options.minify ? '<a class="minify">最小</a>' : '', '<a class="close">关闭</a>', '</header>', '<section>',
        this.options.message, '</section>', '</div>', '</div>'].join('');

        var element = jQuery(fragment);

        // 设置样式
        element.css({
            width: this.options.width
        });
        if (this.isFixed === true && jQuery.support.fixed) {
            element.css({
                position: 'fixed'
            });
        }

        return element;
    },

    getHeader: function () {
        return this.find('.wrapper > header');
    },

    show: function () {
        if (this.options.modal === true) MaskLayer.show();
        this.element.show();
        this.offset.setOffset();
        this.fireEvent(EmacleEvents.SHOW, this);
    },

    hide: function () {
        MaskLayer.hide();
        this.element.css('top', '-9999px');
        this.fireEvent(EmacleEvents.HIDE, this);
    },

    minimize: function () {
        MaskLayer.hide();
        this.element.css('top', '-9999px');
        this.fireEvent(EmacleEvents.MINIMIZE, this);
    },

    close: function (keepMask) {
        !keepMask && MaskLayer.hide();
        this.element.remove();
        this.fireEvent(EmacleEvents.CLOSE, this);
    },

    find: function (rule) {
        return this.element.find(rule);
    },

    bindEvent: function () {

        var self = this;
        this.find('header .close').click(function () {
            self.hide();
        });
        this.find('header .minify').click(function () {
            self.minimize();
        });
    }
});

// Alert弹窗
// 注: callback为点击确定按钮触发的回调
// 当且仅当callback方法返回false时 弹窗不会触发隐藏事件
var AlertDialog = new Class({

    Extends: CommonDialog,

    options: {
        callback: jQuery.noop,
        confirmText: '确定'
    },

    getElement: function () {
        var element = this.parent();
        element.find('.wrapper').append('<footer><input type="button" value="' + this.options.confirmText + '" class="input-button" /></footer>');
        return element;
    },

    getFooter: function () {
        return this.find('.wrapper > footer');
    },

    bindEvent: function () {
        this.parent();

        var that = this;
        this.element.find('footer .input-button').click(function () {
            if (that.options.callback.call(that) !== false) {
                that.hide();
            }
        });
    },

    // 调用回调
    callback: function () {
        this.element.find('footer .input-button').click();
    }
});

// Confirm弹窗
var ConfirmDialog = new Class({

    Extends: AlertDialog,

    options: {
        cancelText: '取消'
    },

    getElement: function () {
        var element = this.parent();
        element.find('footer').append('<input type="button" value="' + this.options.cancelText + '" class="input-cancel" />');
        return element;
    },

    bindEvent: function () {
        this.parent();

        var that = this;
        this.element.find('footer .input-cancel').click(function () {
            that.hide();
        });
    }
});

/********************************************工具类结束 下方为网站应用*************************************************/

// PLACEHOLDER 占位效果
jQuery(function () {
	jQuery('.widget .placeholder input, .widget .placeholder textarea').each(function () {
		var input = jQuery(this),
			label = jQuery(this).siblings('.placeholder .holder');
		if (input.val()) {
			label.hide();
		}
	});
	jQuery('.widget .placeholder input, .widget .placeholder textarea').live('input propertychange focus blur keydown', function (e) {
		var input = jQuery(this),
			label = jQuery(this).siblings('.placeholder .holder');
		if (input.val().length > 0 || (e.type == 'keydown' && !e.ctrlKey && !e.altKey && !e.shiftKey && e.keyCode != 8)) {
			if (!input.attr('readonly')) label.hide();
		}
		else {
			label.show();
		}
	});

	// 添加一个FOCUS状态
	jQuery('.widget .placeholder input, .widget .placeholder textarea').live('focus', function () {
		var input = jQuery(this);
		input.parent('.placeholder').addClass('focus');
		input.siblings('label').css('color', '');
		input.removeClass('input-text-error');
		input.addClass('holder-ok');
	});
	jQuery('.widget .placeholder input, .widget .placeholder textarea').live('blur', function () {
		var input = jQuery(this);
		input.parent('.placeholder').removeClass('focus');
	});
	jQuery('.widget .placeholder label').live('click', function () {
		var input = jQuery(this).siblings('.placeholder input');
		input.focus();
	});
});

// 登录弹层
var LoginDialog = new(new Class({

    Implements: [Events],

    show: function () {
        this.dialog = this.getDialog();
        this.bindEvent();
        this.fireEvent(EmacleEvents.SHOW);
    },

    hide: function () {
        if (this.dialog != null) {
            this.dialog.hide();
        }
    },

    getDialog: function () {
        var self = this;
        return new ConfirmDialog({
            title: '请登录',
            message: '<div id="loginDialog">' + '<form name="login" class="login-form" autocomplete="off" method="post" action="/ajaxlogin/">' + '<div class="login-failure" style="display:none;"><span class="message">登录失败，邮箱或密码错误</span></div>' + '<div class="form-item"><div class="title clearfix"><span>邮箱：</span><span class="message email-error">请输入正确的邮箱地址</span></div><div class="widget"><input type="email" class="input-text" name="email" /></div></div>' + '<div class="form-item pwd-item"><div class="title clearfix"><span>密码：</span><span class="message password-error">密码不能为空</span></div><div class="widget"><input type="password" class="input-text" name="password" /></div></div>' + '</form>' + '</div>',
            width: 380,
            modal: true,
            callback: function () {
                self.loginHandler();
                return false;
            }
        });
    },

    // ajax提交登录
    loginHandler: function () {
        if (this.verifyData() === false) return false;

        var self = this;
        jQuery.ajax({
            url: '/ajaxlogin/',
            type: 'post',
            data: jQuery('#loginDialog form').serialize(),
            dataType: 'json',
            success: function (response) {
                if (response && response.success) {
                    jQuery('#loginDialog .login-failure').hide();
                    self.hide();
                    self.fireEvent(EmacleEvents.LOGIN, response['return']);
                }
                else {
                    jQuery('#loginDialog .login-failure').show();
                }
            },
            error: function () {
                smallnotes('服务器异常，请联系管理员！');
            }
        });

        return false;
    },

    //  检查表单数据
    verifyData: function () {
        var form = jQuery('#loginDialog form'),
            emailReg = /^([\w-])+(\.\w+)*@([\w-])+((\.\w+)+)$/,
            emailInput = form.find('input[name=email]'),
            passwordInput = form.find('input[name=password]'),
            email = emailInput.val().trim(),
            password = passwordInput.val().trim();

        if (emailReg.test(email) === false) {
            jQuery('#loginDialog .email-error').show();
            emailInput.focus();
            return false;
        }
        else {
            jQuery('#loginDialog .email-error').hide();
        }

        // 检查密码
        if (password.length <= 0) {
            jQuery('#loginDialog .password-error').show();
            passwordInput.focus();
            return false;
        }
        else {
            jQuery('#loginDialog .password-error').hide();
        }

        return true;
    },

    bindEvent: function () {
        var self = this;
        jQuery('#loginDialog :input').keypress(function (e) {
            if (e.keyCode == 13) {
                self.loginHandler();
            }
        });

        jQuery('#loginDialog input[name=email]').focus();
    }
}));


// 上传弹层
var UploadDialog = new(new Class({

    Implements: [Events],

    options: {
        'path': ''
    },

    init: function (session, aulnkt, rootname) {
        var self = this;

        seajs.use('swfupload', function () {
            var postParam = {
                'session': session,
                'aulnkt': aulnkt,
                'rootname': encodeURIComponent(rootname)
            };

			self.swfu = new SWFUpload({
				upload_url: '/review/file/fxupload/',
				flash_url: '/webstatic/flash/EmacleUploader.swf',
				assume_success_timeout: '10000',
				file_size_limit: 300 * 1024,
				file_queue_limit: 50,
				file_types: "*.*",
				file_types_description: "All files",

                post_params: postParam,

                // 设置按钮参数
                button_image_url: '/webstatic/images/index/upload_btn.png',
                button_placeholder_id: "upload_btn",
                button_width: 105,
                button_height: 27,
                button_text_top_padding: 0,
                button_text_left_padding: 0,
                button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,
                button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
                button_cursor: SWFUpload.CURSOR.HAND,

                // 注册Handler
                swfupload_preload_handler: self.preload.bind(self),
                swfupload_load_failed_handler: self.loadFailed.bind(self),
                file_queued_handler: self.fileQueued.bind(self),
                file_queue_error_handler: self.fileQueuedError.bind(self),
                file_dialog_start_handler: self.fileDialogStart.bind(self),
                file_dialog_complete_handler: self.fileDialogComplete.bind(self),
                upload_start_hander: self.uploadStart.bind(self),
                upload_progress_handler: self.uploadProgress.bind(self),
                upload_success_handler: self.uploadSuccess.bind(self),
                upload_error_handler: self.uploadError.bind(self),
                upload_complete_handler: self.uploadComplete.bind(self)
            });

			self.stopped = false;
            self.getMiniBoard();
        });
    },

    getDialog: function () {
        var self = this;
        window.uploadDialog = new CommonDialog({
            title: '上传文件',
            message: '<div id="uploadpanel">' + '<div class="uploadtitle"><span class="aupload">选择要上传的文件，单文件不超过300M</span><span id="upload_btn"></span></div>' + '<div class="uploadprocess"></div>' + '<div class="uploadnotice"><span>上传时可最小化本窗口，进行其他操作</span></div>' + '</div>',
            independence: true,
            minify: true
        });

        uploadDialog.hide = function () {
            MaskLayer.hide();
            if (jQuery.browser.msie && jQuery.browser.version < 8) {
                this.element.remove();
                uploadDialog = '';
            }
            else {
                this.element.css('top', '-9999px');
            }
            this.fireEvent(EmacleEvents.HIDE, this);
        };

		uploadDialog.addEvent(EmacleEvents.HIDE, function () {
			// 判断当前队列是否为空
			var stats = self.swfu.getStats();
			// self.swfu.stopUpload();
			if (stats && stats.files_queued > 0) {
				var yes = confirm('你确定要停止上传吗？');
				if (yes) {
					self.swfu.stopUpload();
					self.stopped = true;
					window.uploadDialog = null;
					self.clearMiniBoard();
					FileSystem.loadFiles();
				}
				else {
					if (self.swfu.getStats().files_queued > 0) {
						this.show();
						self.miniboard.self.hide();
					}
					//self.swfu.startUpload();
				}
			}
			else {
				self.swfu.stopUpload();
				self.stopped = true;
				window.uploadDialog = null;
				self.clearMiniBoard();
				FileSystem.loadFiles();
			}
		});

        uploadDialog.addEvent(EmacleEvents.MINIMIZE, function () {
            var stats = self.swfu.getStats();
            if (stats && stats.files_queued > 0) {
                self.miniboard.self.show();
            }
        });
        return uploadDialog;
    },

    getMiniBoard: function () {

        var self = this;

        self.miniboard = {
            self: jQuery('#uploadminiboard'),
            bar: jQuery('#uploadminiboard .uploading .bar'),
            upload: jQuery('#uploadminiboard .uploading .upload'),
            stop: jQuery('#uploadminiboard .uploading .upload-top .stop'),
            current: jQuery('#uploadminiboard .uploading .upload-top .course .current'),
            total: jQuery('#uploadminiboard .uploading .upload-top .course .total'),
            process: jQuery('#uploadminiboard .uploading .upload-strip .upload-stripcontent'),
            hide: jQuery('#uploadminiboard .uploading .upload-top .hide')
        };
        self.miniboard.bar.hide();

        self.switchBoard = function () {
            if (jQuery(self.miniboard.upload).css('display') == 'none') {
                self.miniboard.bar.hide();
                self.miniboard.upload.show();
            }
            else {
                self.miniboard.upload.hide();
                self.miniboard.bar.show();
            }
        };

        self.miniboard.hide.unbind('click').on('click', self.switchBoard);
        self.miniboard.bar.unbind('mouseover').on('mouseover', self.switchBoard);
        self.miniboard.stop.unbind('click').on('click', self.dialog.hide.bind(self.dialog));
    },

    // 相关Handler处理函数
    preload: function () {},

    loadFailed: function () {
        this.dialog.find('.uploadtitle span:first-child').html('');
        this.dialog.find('#uploadpanel .uploadprocess').html('<p><h3>上传插件加载异常,我们推荐您：</h3>' + '<p>1.查看浏览器是否安装了<a href="http://www.adobe.com/go/getflashplayer">flash</a>插件<br />' + '2.选择使用其他浏览器<br />' + '3.尝试使用<a href="/product/">客户端</a>上传</p>');
    },

    fileQueued: function (file) {
        var self = this;
        self.dialog.find('#uploadpanel .uploadprocess').append(Mustache.render(Template, {
            upload: file
        }));
        self.dialog.find('#' + file.id + ' .cancel').on('click', {
            id: file.id
        }, function (event) {
            self.swfu.cancelUpload(event.data.id);
        });
        self.swfu.setFilePath(Context.curpath, file.id);
    },

	fileQueuedError: function (file, errorCode, message) {
		
		var self = this;
		var noticeBoard = self.dialog.find('.uploadnotice span');
		// 添加过多文件
		if (errorCode == -100) {
			noticeBoard.html('一次只能添加50个文件');
		}
		// 添加无效文件
		else if (errorCode == -110) {
			// 文件过大
			if (file.name) {
				noticeBoard.html('文件' + file.name + '超过系统大小限制300M');
			}
			// 非法文件
			else {
				noticeBoard.html(file.name + '不是一个有效的文件');
			}
		}
		// 上传空文件
		else if (errorCode == -120) {
			noticeBoard.html('文件' + file.name + '为空，请再次选择一个文件');
		}
		// 其他可能
		else {
			noticeBoard.html('文件' + file.name + '添加失败');
		}
		setTimeout(function () {
			noticeBoard.html('上传时可最小化本窗口，进行其他操作');
		}, 5000);
	},

    fileDialogStart: function () {},

    fileDialogComplete: function (filesSelected, filesQueued) {
        var self = this;
        if (filesQueued > 0) {
            self.swfu.startUpload();
        }
    },

	uploadStart: function () {
	
	},

	uploadProgress: function (file, bytesLoaded, bytesTotal) {
		var self = this;
		var stats = self.swfu.getStats();
		
		var percent = Math.ceil((bytesLoaded / file.size) * 100);
		// 判断总数，当前在上传的序数
		self.total = stats.files_queued + stats.successful_uploads + stats.upload_errors;
		self.current = stats.successful_uploads + stats.upload_errors + 1;
		// 更新进度条
		self.dialog.find('#' + file.id + ' .process .processbg').css('width', (252 * percent) / 100 + 'px');
		self.dialog.find('.uploadtitle span:last-child').html('正在上传' + self.current + '/' + self.total);
		// 更新最小化面板
		self.miniboard.process.css('width', (375 / self.total) * ((self.current - 1) * 100 + percent) / 100 + 'px');
		self.miniboard.current.html(self.current);
		self.miniboard.total.html(self.total);
	},

    uploadSuccess: function (file, serverData, response) {
        var self = this;
        var resData = eval('(' + serverData + ')');
        if (resData.code == 0) {
            self.dialog.find('#' + file.id + ' .cancel').hide();
            self.dialog.find('#' + file.id + ' .complete').show();
        }
        else {
            smallnotes(resData.message);
        }
        setTimeout(function () {
            self.dialog.find('#' + file.id).fadeOut();
        }, 550);
    },

	uploadError: function (file, errorCode, message) {
		var self = this;
		// 用户取消上传
		if (errorCode == -280) {
			self.dialog.find('#' + file.id).fadeOut();
		}
		// 用户终止上传
		else if (errorCode == -290) {
			//
		}
		else {
			self.dialog.find('#' + file.id).fadeOut();
		}
	},

	uploadComplete: function (file) {
		var self = this;
		var stats = self.swfu.getStats();

		// 判断上传队列是否为空
		if (stats && (stats.files_queued > 0)) {
			if (!self.stopped) {
				self.swfu.startUpload();
			}
		}
		else {
			// 一堆要清理的工作
			self.dialog.find('.uploadtitle span:last-child').html('选择要上传的文件，单文件不超过300M');
			stats.successful_uploads = stats.upload_errors = 0;
			self.swfu.setStats(stats);
			self.dialog.hide();
			self.clearMiniBoard();
			FileSystem.loadFiles();
		}
	},

    // 自定义方法
    clearMiniBoard: function () {
        var self = this;
        self.miniboard.current.html(0);
        self.miniboard.total.html(0);
        self.miniboard.process.css('width', 0);
        self.miniboard.self.hide();
    },

    show: function () {
        var self = this;
        if (window.uploadDialog) {
            uploadDialog.show();
            self.miniboard.self.hide();
        }
        else {
            self.dialog = self.getDialog();
            self.init(Cookie.read('session'), Cookie.read('aulnkt'), Context.curpath);
        }
    },

    hide: function () {
        var self = this;
        if (self.dialog != null) { //self.dialog.hide(); 
        }
    }
}));


var UserSpace = new(new Class({
	updateSpace: function () {
		jQuery.ajax({
			url: '/userspace/',
			dataType: 'json',
			cache: false,
			success: function (res) {
				var total = '', space = false;
				if(CF.visitor.roletype=='ENTERPRISE'){
					total = '';
					space = false;
				}
				else if(CF.visitor.roletype=='TEAM'){
					total = '0.5G中的';
					space = { percent : res.data.percent };
				}
				else{
					total = CF.visitor.totalspace+'中的';
					space = { percent : res.data.percent };
				}
				var userspace = {
					total : total,
					totalused : res.data.totalused,
					space : space
				};
				jQuery('.userspace').html(Mustache.render(Template, {
					userspace: userspace
				}));
			}
		});
	}
}));

// 顶部菜单效果
jQuery(function () {
    var panel = jQuery('#header .quick-menu'),
        items = panel.find('li').not('.split'),
        menus = items.find('.menu');

    // 阻止冒泡
    panel.click(function (e) {
        e.stopPropagation();
    });

	// 展开菜单
	menus.click(function () {
		var item = jQuery(jQuery(this).parent());
		item.toggleClass('selected');
		items.not(item).removeClass('selected');

		// 如果是个人信息而且是展开 那么更新它
		if (item.is('.account') && item.is('.selected')) UserSpace.updateSpace();
	});

    // 鼠标左键点击隐藏菜单
    jQuery(document).on('click', function (e) {
        items.removeClass('selected');
    });
});

/** 全局模板 **/
var Template = null;
jQuery(function () {
    Template = jQuery('#emacleTempl').html();
});

// 个人消息
jQuery(function () {

	// 如果用户没有登录 不做处理
	if (!window.CF || !CF.visitor || !CF.visitor.userId) {
		return false;
	}

    var cometRequest = new CometRequest({
        url: '/webfs/file/listheadsharefolder',
        interval: 60000
    });

    var taskRequest = new CometRequest({
        url: '/task/list/?touserid=' + CF.visitor.userId + '&state=1',
        interval: 60000
    });

    // 公共属性
    var count = 0,
        countPanel = jQuery('#header .quick-menu .message'),
        countEcho = jQuery('#header .quick-menu .message sup'),
        noMsg = jQuery('#header .home-new .nomsg'),
        newTitle = jQuery('#header .home-new .newtitle'),
        taskCount = jQuery('#header .home-new .taskCount'),
        content = jQuery('#header .home-new .newmain');

	// 注册ajax请求函数
	var sendMessageXhr = function (e) {
		var target = jQuery(e.srcElement ? e.srcElement : e.target),
			shareItem = target.parent(),
			accept = target.hasClass('input-button') ? 1 : 0;
		jQuery.ajax({
			url: '/webfs/file/sharefolderaccept/',
			type: 'post',
			data: {
				path: shareItem.dataset('path'),
				shareid: shareItem.dataset('id'),
				accept: accept
			},
			dataType: 'json',
			beforeSend: function () {
				shareItem.find('.newbtn').hide();
				shareItem.find('.loading').show();
				shareItem.parent().css('background', '#FAFBFD');
			},
			success: function (response) {
				if (response.code == 0) {
					// var newCount = parseInt(count);
					if (count > 1) {
						count--;
						countEcho.text(count);

						if (accept && response.data) {
							var title = shareItem.parent().find('dt');
							text = title.html();

							title.html('<a href="' + encodeURI('/home/?_=' + String.uniqueID() + '#' + response.data) + '">' + text + '</a>');
						}
					}
					else {
						countEcho.hide();
					}

					shareItem.html(accept ? '已接受' : '已拒绝');
					shareItem.parent().css('background', '#FFFFEA');
				}
				else {
					if (count > 1) {
						count--;
						countEcho.text(count);
					}
					else {
						countEcho.hide();
					}

					shareItem.html(accept ? '接受失败' : '拒绝失败');
					shareItem.parent().css('background', '#FFFFEA');
				}
			},
			error: function () {
				shareItem.find('.loading').hide();
				shareItem.find('.newbtn').show();
				shareItem.parent().css('background', 'transparent');
			}
		});
		return false;
	};

    // 请求数据
    cometRequest.addEvent(EmacleEvents.SUCCESS, function (res, status, xmlhttp) {
        if (res.code == 0) {
            var inv_count = res.data.length,
                tas_count = parseInt(countPanel.dataset('task'));
            countPanel.dataset('invite', inv_count);
            count = inv_count + tas_count;

            // 更改消息统计和DOM结构
            if (count == 0) {
                countEcho.hide();
            }
            if (inv_count > 0) {
                countEcho.text(count).show();
                noMsg.hide();
                newTitle.show();
                content.html(Mustache.render(Template, {
                    folders: res.data
                })).show();
            }
            else {
                noMsg.hide();
                newTitle.hide();
                content.html('').hide();
            }
        }
    });

    taskRequest.addEvent(EmacleEvents.SUCCESS, function (res, status, xmlhttp) {
        if (res.code == 0) {
            var tas_count = res.data.count,
                inv_count = parseInt(countPanel.dataset('invite'));
            countPanel.dataset('task', tas_count);
            count = inv_count + tas_count;

			// 填充数据
			if (count == 0) {
				countEcho.hide();
			}
			if (tas_count > 0) {
				countEcho.text(count).show();
				taskCount.html('(' + tas_count + ')');
			}
			else {
				taskCount.html('');
			}
		}
	});
	// 添加按钮响应事件
	content.on('click', '.newbtn', sendMessageXhr);

    // 发起轮询
    cometRequest.openConnect();
    taskRequest.openConnect();
});

jQuery(function () {

	// 如果用户没有登录 不做处理
	if (location.pathname == '/feed/' || !window.CF || !CF.visitor || !CF.visitor.userId) {
		return false;
	}

	var updateRequest = new CometRequest({
		url: '/feeds/count/',
		interval: 60000
	});

	updateRequest.addEvent(EmacleEvents.SUCCESS, function (res, status, xmlhttp) {
		if (res.code == 0) {
			if (res.data.count == 0) {
				jQuery('#viewType .updates sup').hide();
			}
			else {
				jQuery('#viewType .updates sup').html(res.data.count).show();
			}
		}
	});

	updateRequest.openConnect();

});