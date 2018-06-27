var can = document.getElementById('graphscreen');
var ctx = can.getContext('2d');    
var animpoints = [];
function updategraph(ze,o)
{
	while(animpoints.length > 0)
	{
		animpoints.pop();
	}
	var x0 = 1;
	var z = ze;
	var omegan = o;
	var t;
	var point = [];
	var temppoints = [];
	var label = [];
	var t=0;
	var f = omegan/(2*Math.PI);
	var time = 1/f;
	var i = 0;
	var config = {
		type: 'line',
		data: {
			labels: label,
			datasets: [{
				borderWidth: 1,
				label: '',
				backgroundColor: window.chartColors.yellow,
                   borderColor: window.chartColors.yellow,
                   data: point,    
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
					display: false,
					scaleLabel: {
						display: true,
						labelString: 'Time'
					}
				}],
				yAxes: [{
					gridLines: {
						color: "rgba(0, 0, 0, 0)",
					},
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Displacement'
					}
				}]
			}
		}
	};
	var mychart =  new Chart(ctx, config);
    while(mychart.data.labels.length > 0) {
    	mychart.data.labels.pop();
    }
    mychart.data.datasets.forEach((dataset) => {
    	while(dataset.data.length > 0)
    	{
    		dataset.data.pop();
    	}
	});
	for(t=0,i=0;t<=time*40;i++,t=t+(time/20))
    {
		var temp1 = x0/Math.sqrt(1-Math.pow(z,2));//Correct
    	var temp2 = Math.exp(-z*omegan*t);//correct
		var temp3 = Math.sqrt(1-Math.pow(z,2))*omegan*t;//correct
		var temp4 = Math.sqrt(1-Math.pow(z,2))/z;//correct
		var temp5 = Math.atan(temp4);
		var temp6 = temp3 + temp5;
		var temp7 = Math.sin(temp6);
		var x = temp1*temp2*temp7;
		if(i<=50)
		{
		point.push(x);
		label.push((t*1000000).toFixed(2)+"*10^-6 s");	
		}
		temppoints.push(x);
		animpoints.push(x);
	}
	
	mychart.update();
	var max = Math.max.apply(null,temppoints); // get the max of the array
	var min = Math.min.apply(null,temppoints); // get the min of the array
	var minindex = temppoints.indexOf(min);
	for(i=0;i<minindex;i++)
	{
		temppoints.shift();
	}
	var secondmax =  Math.max.apply(null,temppoints); // get the 2nd max
	delta = Math.log(max/secondmax);
}   