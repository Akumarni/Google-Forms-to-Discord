var webhook = "";

function onSubmit(e) {
	var form = FormApp.getActiveForm();
	var allResponses = form.getResponses();
	var latestResponse = allResponses[allResponses.length - 1];
	var response = latestResponse.getItemResponses();
	var items = [];
	
	for (var i = 0; i < response.length; i++) {
		var question = response[i].getItem().getTitle();
		var answer = response[i].getResponse();
		var parts = answer.match(/[\s\S]{1,1024}/g) || [];
		
		if(answer == "") continue;
		for (var j = 0; j < parts.length; j++) {
			if(j == 0) {
				items.push({ "name": question, "value": parts[j], "inline": false });
			} else {
				items.push({ "name": question.concat(" (cont.)"), "value": parts[j], "inline": false });
			}
		}
	}
	
	var options = {
		"method": "post",
		"payload": JSON.stringify({
			"embeds": [{ "title": "Moderation Appeal - danielytuk", "color": 14508118,
			"fields": items,
			"footer": { "text": "Copyright © 2019 danielytuk. " } }]
		})
	};
	UrlFetchApp.fetch(webhook, options);
};
