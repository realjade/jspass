jQuery(function() {
    var usernameinput = $('#login input[name=username]'),
        passwordinput = $('#login input[name=password]'),
        loginpanel = $('#login');
    $('.help-inline').hide();
    $('.control-group').removeClass('error');
    $('#login button[name=login]').click(function(){
        if(validLogin()){
            $('#login .loginform').submit();
        }else{
            return false;
        }
    });
    function validLogin(){
        var username = $.trim(usernameinput.val()),
            password = $.trim(passwordinput.val());
        if(username){
            usernameinput.val(username);
            $('#login .usernamepanel').removeClass('error').find('.help-inline').hide();
        }else{
            $('#login .usernamepanel').addClass('error').find('.help-inline').show();
            return false;
        }
        if(password){
            passwordinput.val(password);
            $('#login .passwordpanel').removeClass('error').find('.help-inline').hide();
        }else{
            $('#login .passwordpanel').addClass('error').find('.help-inline').show();
            return false;
        }
        return true;
    }
});
