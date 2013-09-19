        var urlCI = localStorage.urlCI;
		var jobs = [];

        var defaultTimeToRefresh = 10000;
        var previousState = [];

        function notifyIfStatusChange(jobName, color, description, pictureUrl) {
            switch (color) {
                case 'blue':
                    description = "BUILD OK " + description;
                    break;
                case 'red':
                    description = "BUILD KO " + description;
                    break;
                case 'yellow':
                    description = "BUILD INSTABLE " + description;
                    break;
                default:
                    description = "BUILD (" + color + ") " + description;
                    break;
            }


            if (previousState[jobName] != color && previousState[jobName]) {
		        console.log(chrome.extension.getURL('img/'+pictureUrl));
                var notification = webkitNotifications.createNotification(chrome.extension.getURL('img/'+pictureUrl), jobName, description);
                 notification.onclick = function () {
                    window.open(urlCI+'/job/'+jobName+'/lastBuild/console');
                    notification.close();
                }
                notification.show();
            }
            previousState[jobName] = color;
        }


		function updateParams(){
			 if (localStorage.jobs) {
		            jobs = JSON.parse(localStorage.jobs);
		     }
		}


        function updateJobStatus() {

            $.each(jobs, function(key, val) {
                var jobId = val;
                if (_.contains(jobs,jobId )) {
                    $.getJSON(urlCI + "job/" + jobId + "/api/json/", function(data) {
                        var description = "";
                        $.each(data.healthReport, function(index, value) {
                            description += value.description;

                        });
						if (data.builds[0]){
						description += "console ="+ data.builds[0].url;
						}

                        var color = data.color.replace("_anime", "");
                        notifyIfStatusChange(jobId, color, description, data.healthReport[0] ? data.healthReport[0].iconUrl : null);
                    });
                }
            });
            setTimeout(updateJobStatus, localStorage.timeToRefresh ? localStorage.timeToRefresh : defaultTimeToRefresh);
            setTimeout(updateParams, localStorage.timeToRefresh ? localStorage.timeToRefresh : defaultTimeToRefresh);
        }


        $(document).ready(function() {
		console.log("dom ready");
            window.setTimeout(updateJobStatus, localStorage.timeToRefresh ? localStorage.timeToRefresh : defaultTimeToRefresh);
            updateParams();
        });
