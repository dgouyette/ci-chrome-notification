        var req;
        var jobs = [];
        var data;

        function save_options() {
            $('#saveError').html("&nbsp;");
            var numRegExp = /(^-?\d\d*$)/;
            var t2r = $('#timeToRefresh').val();
            if (!numRegExp.test(t2r)) {
                console.log("Bad Value for Refresh Time");
                $('#saveError').text("Bad Value for Refresh Time");

            } else {
                localStorage.timeToRefresh = t2r;
                var urlCITmp = $('#urlCI').val();
                var urlCI = urlCITmp[urlCITmp.length - 1] == "/" ? urlCITmp : urlCITmp + "/";
                $('#urlCI').attr("value", urlCI);
                localStorage.urlCI = urlCI;
				findAllViews();
            }
        }


		function reset(){
			localStorage.clear();
		}

       
       


        $(document).ready(function() {

            


            if (localStorage['timeToRefresh']) {
                $('#timeToRefresh').val(localStorage['timeToRefresh']);
                $('#urlCI').val(localStorage['urlCI']);
				$('#tabs').tabs();
				findAllViews();
            }

            $("#save_btn").click(function(){

              save_options();
            });

            $("#reset_btn").click(function(){
                reset();
            });

            

        });


