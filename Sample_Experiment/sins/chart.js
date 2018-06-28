/////////////////////////////////////////////////////////////////////////////////////
var canvas1 = document.getElementById('displacementcurvescreen'); //Enter the id of the canvas where you want to display chart/graph
var ctx1 = canvas1.getContext('2d');
var animpoints = [];
var point1 = [];//if there are more graphs, make multiple arrays as point2,label2:point3,label3 and so on.
var label1 = [];
function updategraph(n1,n2) //Get the parameters from display function
{
	while(animpoints.length > 0 || point1.length > 0  || label1.length > 0 )//Empty all the arrays.
	{
		animpoints.pop();
		point1.pop();
		label1.pop();
	}
	var config1 = {  //Keep this configurations same, dont change it untill necessary. if more than 1 graphs are there, then simply copy and paste the configurations into config2,config3 and so on.
		type: 'line',
		data: {
			labels: label1, //Change it accordingly
			datasets: [{
				borderWidth: 1,
				label: '',
				backgroundColor: window.chartColors.yellow,
                   borderColor: window.chartColors.yellow,
                   data: point1,    //Change it accordingly
				fill: false,
				pointRadius: 0,
			}]
		},
		options: {
			responsive: true,
			title: {
				display: false,
				text: ''
			},
			legend: {
				display: true
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					gridLines: {
						color: "rgba(0, 0, 0, 0)",
					},
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Time'//This is the x axis label, you change it accordingly
					}
				}],
				yAxes: [{
					gridLines: {
						color: "rgba(0, 0, 0, 0)",
					},
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'y = x^2'//This is the y axis label, you change it accordingly
					}
				}]
			}
		}
	};
	
	var mychart1 =  new Chart(ctx1, config1); //Make myChart2,myChart3....... if more graphs are there.
	
    while(mychart1.data.labels.length > 0) {//Empty the labels of graph
		
    	mychart1.data.labels.pop();
    }
	mychart1.data.datasets.forEach((dataset) => {//Emptyy the data of graph
    	while(dataset.data.length > 0)
    	{
    		dataset.data.pop();
    	}
	});
	//Simply copy and paste the above two loops if you have more than one graphs, replace myChart1 with its respective number.
	for(t=0;t<=200;t=t+1) //let us make the graph of y = t^2
	{
		var temp = Math.pow(t,2);//Do calculations
		point1.push(temp); //Push the y axis answer into point array
		label1.push(t); //Push the x axis answer into label array
		animpoints.push(t); //Push the animation points into animpoints array
	}
	mychart1.update(); //Updation of new graph, simple copy and paste it if more graphs are there.
}   