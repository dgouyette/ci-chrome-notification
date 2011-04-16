function cleanJobNameForId(viewID){
    viewID =  viewID.replace(/[^a-zA-Z0-9]+/g,'');
    return viewID;
}
	
function findAllViews(){
	$.getJSON(localStorage["urlCI"]+'/api/json', function(data) {
		$.each(data.views, function(key, val) {
			var cleanViewID = cleanJobNameForId(val.name);
			findAllJobsByViewId(val.name);
			$("#tabs").tabs("add","#"+cleanViewID, cleanViewID);
		});
	});
}

function findAllJobsByViewId(viewID){
		console.log(localStorage);
		$.getJSON(localStorage["urlCI"]+'/view/'+viewID+"/api/json/", function(data) {
			console.log("viewId clean : "+cleanJobNameForId(viewID));
			var cleanViewID=cleanJobNameForId(viewID);
			$.each(data.jobs, function(key, val) {
			if(jobs[val.name]){
				console.log("ok");
				$("#"+cleanViewID).append('<span><input class="jobs" id=' + val.name + ' checked=checked type="checkbox" onclick="updateListBuildToNotificate()"/>&nbsp;' + val.name + '</span><br/>');					
			}
			else{
				console.log("ko");
				$("#"+cleanViewID).append('<span><input class="jobs" id=' + val.name + ' type="checkbox" onclick="updateListBuildToNotificate()"/>&nbsp;' + val.name + '</span><br/>');										
				
			}	
			}); 
		});	
}


 function updateListBuildToNotificate() {
		/**var jobs = $.makeArray(localStorage.jobs);
		$(".jobs:checked").each(function(key, val){
			jobs[val.id]=true;
		});
		$(".jobs :not(:checked)").each(function(key, val){
			jobs[val.id]=false;
		});
		localStorage.jobs=JSON.stringify(jobs);**/
    }