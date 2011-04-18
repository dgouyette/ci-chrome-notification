function cleanForId(toClean){
    return toClean.replace(/[^a-zA-Z0-9]+/g,'');;
}
	
//find all views and fill each one with corresponding builds
function findAllViews(){
	$.getJSON(localStorage["urlCI"]+'/api/json', function(data) {
		$.each(data.views, function(key, val) {
			var cleanViewID = cleanForId(val.name);
			findAllJobsByViewId(val.name);
			$("#tabs").tabs("add","#"+cleanViewID, cleanViewID);
		});
	});
}

//Find all jbos for a given view
function findAllJobsByViewId(viewID){
		$.getJSON(localStorage["urlCI"]+'/view/'+viewID+"/api/json/", function(data) {
			var cleanViewID=cleanForId(viewID);
			$.each(data.jobs, function(key, val) {
				var buildID = cleanForId(val.name);
				if(jobs[buildID]){
					$("#"+cleanViewID).append('<span><input class="jobs" id=' + buildID + ' checked=checked type="checkbox"/>&nbsp;' + buildID + '</span><br/>');					
				}
				else{
					$("#"+cleanViewID).append('<span><input class="jobs" id=' + buildID + ' type="checkbox"/>&nbsp;' + buildID + '</span><br/>');										
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