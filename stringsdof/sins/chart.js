/////////////////////////////////////////////////////////////////////////////////////
var canvas1 = document.getElementById('displacementcurvescreen');
var ctx1 = canvas1.getContext('2d');
var animpoints = [];
var point1 = [];
var label1 = [];
function updategraph(initialdisplacement,omega)
{
	while(animpoints.length > 0 || point1.length > 0  || label1.length > 0 )
	{
		animpoints.pop();
		point1.pop();
		label1.pop();
	}
	var config1 = {
		type: 'line',
		data: {
			labels: label1,
			datasets: [{
				borderWidth: 1,
				label: '',
				backgroundColor: window.chartColors.yellow,
                   borderColor: window.chartColors.yellow,
                   data: point1,    
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
					display: false,
					scaleLabel: {
						display: false,
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
						labelString: 'Amplitude'
					}
				}]
			}
		}
	};
	
	var mychart1 =  new Chart(ctx1, config1);
	
    while(mychart1.data.labels.length > 0) {
		
    	mychart1.data.labels.pop();
    }
    mychart1.data.datasets.forEach((dataset) => {
    	while(dataset.data.length > 0)
    	{
    		dataset.data.pop();
    	}
	});
	for(t=0;t<=100;t=t+0.1)
	{
		var displacement = initialdisplacement * Math.cos((omega * t));
		point1.push(displacement);
		label1.push(t+"s");	
	}
	mychart1.update();
}   