jQuery(function() {
    //保存code编辑器
    var codeEditor = {};
    //点击导航事件
    $('#codenav a').click(function (e) {
      tools.cancelDefault(e);
      $(this).tab('show');
      var tab = $(this).attr('href').split('#')[1];
      //记住点击的tab标签
      tools.setStore('tab',tab);
      if(!codeEditor[tab]){
        ({
            'json':function(){
                if(codeEditor['json'])
                    return;
                 seajs.use('code-json',function(){
                    codeEditor['json'] = $('#json .jsonpanel').jsoninput();
                    resize();
                }); 
            },
            'url':function(){
                if(codeEditor['url'])
                    return;
                codeEditor['url'] = true;
                var urlpanel = $('#url'),
                    urlinput = $('.urlinput',urlpanel),
                    urltype = $('.urltype',urlpanel),
                    urlresult = $('.urlresult',urlpanel),
                    urluntype = $('.urluntype',urlpanel),
                    urlunresult = $('.urlunresult',urlpanel),
                    before = -1,
                    time = null;
                urlinput.delayinput(renderResult);
                urltype.change(renderResult);
                function renderResult(){
                    urlresult.val(window[urltype.val()]($.trim(urlinput.val())));
                }
                urlresult.delayinput(renderUnResult);
                urluntype.change(renderUnResult);
                function renderUnResult(){
                    urlunresult.val(window[urluntype.val()]($.trim(urlresult.val())));
                }
            },
            'xmltojson':function(){
                if(codeEditor['xmltojson'])
                    return;
                seajs.use(['highlight','highlight-css','code-xmltojson'],function(){
                    codeEditor['xmltojson'] = true;
                    var xmlpanel = $('#xmltojson'),
                        xmlinput = $('.xmlinput',xmlpanel),
                        xmlresult = $('.jsonbeauty',xmlpanel);
                    xmlinput.delayinput(tojson);
                    function tojson(){
                        var json = $.xml2json($.trim(xmlinput.val()));
                        json && xmlresult.html(hljs.highlight('json',JSON.stringify(json,'undefined',4)).value);
                    }
                    tojson();
                }); 
            },
            'endecode':function(){
                if(codeEditor['endecode'])
                    return;
                codeEditor['endecode'] = true;
                var panel = $('#endecode'),
                    utffrom = $('.utffrom',panel),
                    utfto = $('.utfto',panel);
                $('.utfencode',panel).click(function(){
                    utfto.val(utffrom.val().replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"&#x$2;")}));
                });
                $('.utfdecode',panel).click(function(){
                    utffrom.val(unescape(utfto.val().replace(/&#x/g,'%u').replace(/;/g,'')));
                });
            },
            'javascript':codeMirror
        }[tab])(tab);
      }
    });
    function codeMirror(tab){
        if(codeEditor[tab])
            return;
        seajs.use('code-'+tab,function(){
            codeEditor[tab] = CodeMirror.fromTextArea($('#'+tab+' .codeinput')[0], {
                lineNumbers: true,
                lineWrapping: true,
                matchBrackets: true,
                continueComments: "Enter",
                smartIndent:true,
                indentUnit:4,
                styleActiveLine: true
            });
            resize();
        });
    }
    //恢复上次点击的tab标签
    var tab = tools.getStore('tab');
    if(tab){
        $('a[href="#'+tab+'"]').trigger('click');
    }
    /*$('#codenav li.active a').trigger('click');
    var codepanel = $('#code'),
        code = codepanel.text();
    seajs.use('codepass',function(){
        codepanel.html(codepass(code).code);
    });
    seajs.use(['codeinput','codeinput-css'],function(){
        codepanel.html(codepass(code).code);
    });*/
    //窗口自适应
    $(window).resize(resize);
    function resize(){
        var height = $(window).height();
        $('.CodeMirror').css('min-height',height-125);
        $('.resizepanel').css('min-height',height-135);
    }
});