(function() {

        window.onload = function() {
            updateScroll();
        };

        function updateScroll(){
            var element = document.getElementById("messages");
            element.scrollTop = element.scrollHeight;
        }
}) ();