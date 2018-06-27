/////////////////////////////////////////////////////////////////////////////////////
var canvas1 = document.getElementById('displacementscreen');
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById('magnificationfactorscreen');
var ctx2 = canvas2.getContext('2d');
var canvas3 = document.getElementById('phaseanglescreen');
var ctx3 = canvas3.getContext('2d');  
var animpoints = [];
var point1 = [];
var label1 = [];
var point2 = [];
var label2 = [];
var point3 = [];
var label3 = [];
function updategraph(rotationspeed,unbalance,zeta,omega,omegan,stiffness,mass)
{
	while(animpoints.length > 0 || point1.length > 0 || point2.length > 0 || label1.length > 0 || label2.length > 0 || label3.length > 0 || point3.length > 0)
	{
		animpoints.pop();
		point1.pop();
		point2.pop();
		label1.pop();
		label2.pop();
		point3.pop();
		label3.pop();
	}
	
	var t=0;
	var eta = omega/omegan;
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
						labelString: 'Displacement'
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
						labelString: 'Magnification Factor'
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
						labelString: 'Phase angle (theta)'
					}
				}]
			}
		}
	};
	
	var mychart1 =  new Chart(ctx1, config1);
	var mychart2 =  new Chart(ctx2, config2);
	var mychart3 =  new Chart(ctx3, config3);
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
	//for(t=0;t<=time*300;t=t+(time/20))
	for(t=0,i=0;t<=100;i=i+0.1,t=t+1)
	{
		var X = ((unbalance/mass) * Math.pow(eta,2))/Math.sqrt(Math.pow(1-Math.pow(eta,2),2) + Math.pow(2*zeta*eta,2));
		var phialpha = Math.atan((2*zeta*eta)/(1-Math.pow(eta,2)));
		var displacement = X * Math.sin((omega*t)-phialpha);
		point1.push(displacement);
		label1.push(t+"s");
		animpoints.push(displacement);
		var magnificationfactor = (Math.pow(i,2))/Math.sqrt(Math.pow(1-Math.pow(i,2),2) + Math.pow(2*zeta*i,2));
		point2.push(magnificationfactor);
		label2.push("n = "+i);
		//var phaseangle = Math.atan((2*zeta*i)/(1-Math.pow(i,2)));
		//point3.push(phaseangle * 180 / Math.PI);
		//label3.push("n = "+i);	
	}
	for(i=0;i<1;i=i+0.1)
	{
		var phaseangle = Math.atan((2*zeta*i)/(1-Math.pow(i,2)));
		point3.push(phaseangle * 180 / Math.PI);
		label3.push("n = "+i);
	}
	for(i=1.1;i<5;i=i+0.1)
	{
		var phaseangle = Math.atan((2*zeta*i)/(1-Math.pow(i,2)));
		point3.push(180-Math.abs(phaseangle * 180 / Math.PI));
		label3.push("n = "+i);
	}
	//alert(point3.length);
	mychart1.update();
	mychart2.update();
	mychart3.update();
}   