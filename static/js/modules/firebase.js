jQuery(function() {
    var myDataRef = new Firebase('https://zxksubzw9mv.firebaseio-demo.com/');
    $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
            var name = $('#nameInput').val();
            var text = $('#messageInput').val();
            //myDataRef.set('User ' + name + ' says ' + text);
            myDataRef.push({name: name, text: text});
            $('#messageInput').val('');
        }
    });
    myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
    });
    function displayChatMessage(name, text) {
        tools.log({name: name, text: text});
    };
});