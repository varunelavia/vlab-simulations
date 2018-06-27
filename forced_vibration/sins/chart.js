/////////////////////////////////////////////////////////////////////////////////////
var canvas1 = document.getElementById('appliedforcescreen');
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById('displacementscreen');
var ctx2 = canvas2.getContext('2d');  
var canvas3 = document.getElementById('magnificationscreen');
var ctx3 = canvas3.getContext('2d');  
var canvas4 = document.getElementById('phaseanglescreen');
var ctx4 = canvas4.getContext('2d');  
var animpoints = [];
var point1 = [];
var label1 = [];
var point2 = [];
var label2 = [];
var point3 = [];
var label3 = [];
var point4 = [];
var label4 = [];
function updategraph(forcefrequency,force,zeta,omegan,stiffness)
{
	while(animpoints.length > 0 || point1.length > 0 || point2.length > 0 || label1.length > 0 || label2.length > 0 || label3.length > 0 || point3.length > 0 || label4.length > 0 || point4.length > 0)
	{
		animpoints.pop();
		point1.pop();
		point2.pop();
		label1.pop();
		label2.pop();
		point3.pop();
		label3.pop();
		point4.pop();
		label4.pop();
	}
	//var time = 1/forcefrequency;
	//var t=0;
	//var f = forcefrequency/(2*Math.PI);
	//var time = 1/f;
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
						labelString: 'Applied Force'
					}
				}]
			}
		}
	};
	var config2 = {
		type: 'line',
		data: {
			labels: label2,
			datasets: [{
				borderWidth: 1,
				label: '',
				backgroundColor: window.chartColors.yellow,
                   borderColor: window.chartColors.yellow,
                   data: point2,    
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
						labelString: 'Displacement'
					}
				}]
			}
		}
	};
	var config3 = {
		type: 'line',
		data: {
			labels: label3,
			datasets: [{
				borderWidth: 1,
				label: '',
				backgroundColor: window.chartColors.yellow,
                   borderColor: window.chartColors.yellow,
                   data: point3,    
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
						labelString: 'Magnification Factor'
					}
				}]
			}
		}
	};
	var config4 = {
		type: 'line',
		data: {
			labels: label4,
			datasets: [{
				borderWidth: 1,
				label: '',
				backgroundColor: window.chartColors.yellow,
                   borderColor: window.chartColors.yellow,
                   data: point4,    
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
						labelString: 'Phase angle (theta)'
					}
				}]
			}
		}
	};
	var mychart1 =  new Chart(ctx1, config1);
	var mychart2 =  new Chart(ctx2, config2);
	var mychart3 =  new Chart(ctx3, config3);
	var mychart4 =  new Chart(ctx4, config4);
	
    while(mychart1.data.labels.length > 0) {
		
    	mychart1.data.labels.pop();
    }
    mychart1.data.datasets.forEach((dataset) => {
    	while(dataset.data.length > 0)
    	{
    		dataset.data.pop();
    	}
	});
	while(mychart2.data.labels.length > 0) {
		
    	mychart2.data.labels.pop();
    }
    mychart2.data.datasets.forEach((dataset) => {
    	while(dataset.data.length > 0)
    	{
    		dataset.data.pop();
    	}
	});
	while(mychart3.data.labels.length > 0) {
		
    	mychart3.data.labels.pop();
    }
    mychart3.data.datasets.forEach((dataset) => {
    	while(dataset.data.length > 0)
    	{
    		dataset.data.pop();
    	}
	});
	while(mychart4.data.labels.length > 0) {
		
    	mychart4.data.labels.pop();
    }
    mychart4.data.datasets.forEach((dataset) => {
    	while(dataset.data.length > 0)
    	{
    		dataset.data.pop();
    	}
	});
	for(t=0,i=0;t<=100;i=i+0.1,t=t+1)
	{
		//var temp1 = Math.cos((forcefrequency * t)* Math.PI / 180);
		var appliedforce = force * 	Math.cos((forcefrequency * t)* Math.PI / 180);
		point1.push(appliedforce);
		label1.push(t+"s");	
		//var temp5 = 2 * zeta * (forcefrequency/omegan);
		//var temp6 = 1 - Math.pow(forcefrequency/omegan,2);
		//var temp2 = parseFloat(temp5)/parseFloat(temp6);
		//var temp3 = Math.atan(temp2);
		var phaseangle = Math.atan((2*zeta*(forcefrequency/omegan))/(1-((forcefrequency/omegan)*(forcefrequency/omegan))));
		var displacement =(force/stiffness)*Math.sin((forcefrequency * t)-phaseangle)/Math.sqrt((1 - ((forcefrequency/omegan)*(forcefrequency/omegan)))+Math.pow(2 * zeta * (forcefrequency/omegan),2));
		point2.push(displacement);
		label2.push(t+"s");
		animpoints.push(displacement);
		//if(i<5)
		//{
		//var temp2 = 2 * 0.125 * (i)/(1 - Math.pow(i),2);
		//var temp3 = Math.atan(temp2);
		//point4.push(temp3);
		//label4.push(i);
		//var temp4 = 1/Math.sqrt(Math.pow(1-(i*i),2)+Math.pow(2*zeta*(i),2));
		point3.push(1/Math.sqrt(Math.pow(1-(i*i),2)+Math.pow(2*zeta*(i),2)));
		label3.push(i+"s");
		//var phaseangle = Math.atan((2*zeta*(i))/(1-((i)*(i))));
		//point4.push(phaseangle);
		//label4.push(i+"s");

		//}		
	}
	for(i=0;i<1;i=i+0.1)
	{
		var phaseangle = Math.atan((2*zeta*(i))/(1-((i)*(i))));
		point4.push(phaseangle * 180 / Math.PI);
		label4.push("n = "+i);
	}
	for(i=1.1;i<5;i=i+0.1)
	{
		var phaseangle = Math.atan((2*zeta*(i))/(1-((i)*(i))));
		point4.push(180-Math.abs(phaseangle * 180 / Math.PI));
		label4.push("n = "+i);
	}
	mychart1.update();
	mychart2.update();
	mychart3.update();
	mychart4.update();
}   