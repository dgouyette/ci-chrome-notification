function cleanForId(toClean){
    return toClean.replace(/[^a-zA-Z0-9]+/g,'');;
}
	
//find all views and fill each one with corresponding builds
function findAllViews(){

	$.getJSON(localStorage["urlCI"]+'/api/json', function(data) {
		var counter = 1;
		$.each(data.views, function(key, val) {
			var cleanViewID = cleanForId(val.name);
			findAllJobsByViewId(val.name);
			if (counter==1){
				$('#allViews').append($('<li/>').attr('class', 'active').append($('<a>'+cleanViewID+'</a>').attr('data-toggle', 'tab').attr('href', '#'+cleanViewID)));
				$(".tab-content").append($('<div class="active">').addClass('tab-pane').attr('id', cleanViewID));
			
				
			}else{
				$('#allViews').append($('<li/>').append($('<a>'+cleanViewID+'</a>').attr('data-toggle', 'tab').attr('href', '#'+cleanViewID)));
				$(".tab-content").append($('<div/>').addClass('tab-pane').attr('id', cleanViewID));
			
			}

			 counter++;

		});
	});
}

//Find all jbos for a given view
function findAllJobsByViewId(viewID){
	$.getJSON(localStorage["urlCI"]+'/view/'+viewID+"/api/json/", function(data) {
			var cleanViewID=cleanForId(viewID);
			$.each(data.jobs, function(key, val) {
				var buildID = val.name;
				if (localStorage.jobs){
					jobs = JSON.parse(localStorage.jobs);

				}
				if($.inArray(buildID, jobs)!=-1){
					$("#"+cleanViewID).append('<span><input class="jobs" name="'+buildID+'" checked=checked type="checkbox"/>&nbsp;' + buildID + '<br/><span>');				
				}
				else{			
					$("#"+cleanViewID).append('<input class=jobs name="'+buildID+'"    type="checkbox"/>&nbsp;' + buildID+ '<br/>');	
										
				}	

				$(":checkbox").click(function(){		
					updateListBuildToNotificate(this.name)
                	
            	});
			}); 
		});	


}



 function updateListBuildToNotificate(viewID) {
		localStorage.jobs = $(".jobs:checked");
		var idOfCheckedInput = []; 
		$(".jobs:checked").each(function(index, domEle){
			idOfCheckedInput[index]=domEle.name;
		})
		localStorage.jobs=JSON.stringify(idOfCheckedInput);

    }
