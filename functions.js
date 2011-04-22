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
				var buildID = val.name;
				jobs = JSON.parse(localStorage.jobs);
				//if (jQuery.contains(jobs,buildID )) {
				if($.inArray(buildID, jobs)!=-1){
					$("#"+cleanViewID).append('<span><input class="jobs" id=' + buildID + ' onclick="updateListBuildToNotificate()"  checked=checked type="checkbox"/>&nbsp;' + buildID + '</span><br/>');					
				}
				else{
					$("#"+cleanViewID).append('<span><input class=jobs id=' + buildID + ' onclick="updateListBuildToNotificate()" type="checkbox"/>&nbsp;' + buildID + '</span><br/>');										
				}	
			}); 
		});	
}


 function updateListBuildToNotificate(viewID) {
		localStorage.jobs = $(".jobs:checked");
		var idOfCheckedInput = []; 
		$(".jobs:checked").each(function(index, domEle){
			idOfCheckedInput[index]=domEle.id;
		})
		localStorage.jobs=JSON.stringify(idOfCheckedInput);
		console.log(localStorage.jobs);
    }