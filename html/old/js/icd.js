define(['text!tmpl/icd_template.html', 'lib/chart/sample_data_require'], function(template, datas) {
	$('#david_icd').html(template);

	var data = datas.data, data2 = datas.data2, data3 = datas.data3;

	data["displayNames"] = ["2xx","3xx","4xx","5xx"];
	data["colors"] = ["green","orange","red","darkred"];
	data["scale"] = "pow";
	console.log('DATA ', data);

	// add presentation logic for 'data' object using optional data arguments
	data2["displayNames"] = ["2xx","3xx","4xx","5xx"];
	data2["colors"] = ["green","orange","red","darkred"];
	data2["scale"] = "linear";
	
	// add presentation logic for 'data' object using optional data arguments
	data3["displayNames"] = ["Data1", "Data2"];
	data3["axis"] = ["left", "right"];
	data3["colors"] = ["#2863bc","#c8801c"];
	data3["rounding"] = [2, 0];
	
	// 	var l1 = new LineGraph({containerId: 'graph1', data: data});
	var l1,l2, l3;

	//window.makegraphs = function() {
	$('#david_icd_activity_pill').click(function() {
		setTimeout(function() {
			if (!l1) {
				console.log('init-------------');
				l1 = new LineGraph({containerId: 'icd_graph1', data: data});
				l2 = new LineGraph({containerId: 'icd_graph2', data: data2});
				l3 = new LineGraph({containerId: 'icd_graph3', data: data3});
			}
		}, 500);
	});
	// };
	return {};
});
