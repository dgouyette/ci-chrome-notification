        var req;
        var jobs = [];
        var data;

        function save_options() {
            var numRegExp = /(^-?\d\d*$)/;
            var t2r = $('#timeToRefresh').val();
            if (!numRegExp.test(t2r)) {
                console.log("Bad Value for Refresh Time");
                $('#errorText').text("Bad Value for Refresh Time");
		$("#saveError").addClass("in");
             
            } else {
		$("#saveError").alert('close');
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
		$('#errorText').alert().fadeIn();
            	
		


            if (localStorage['timeToRefresh']) {
                $('#timeToRefresh').val(localStorage['timeToRefresh']);
                $('#urlCI').val(localStorage['urlCI']);
		findAllViews();
            }

            $("#save_btn").click(function(){

              save_options();
            });

            $("#reset_btn").click(function(){
                reset();
            });

           
                                    

        });


