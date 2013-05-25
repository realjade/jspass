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
        $('.CodeMirror').height(height-125);
        $('.jsonpanel').height(height-135);
    }
});