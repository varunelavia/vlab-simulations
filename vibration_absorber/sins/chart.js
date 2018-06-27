/////////////////////////////////////////////////////////////////////////////////////
var canvas1 = document.getElementById('x1xstscreen');
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById('x2xstscreen');
var ctx2 = canvas2.getContext('2d');
var animpoints1 = [];
var animpoints2 = [];
var point1 = [];
var label1 = [];
var point2 = [];
var label2 = [];
function updategraph(xst,x1,x2,omega,omega1,omega2,mu,fnot,k1,k2,m1,m2)
{
	while(animpoints1.length > 0 || animpoints2.length > 0 || point1.length > 0 || point2.length > 0 || label1.length > 0 || label2.length > 0)
	{
		animpoints1.pop();
		animpoints2.pop();
		point1.pop();
		point2.pop();
		label1.pop();
		label2.pop();
	}
	
	var t=0;
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
						labelString: 'x1/xst'
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
						labelString: 'x2/xst'
					}
				}]
			}
		}
	};
	
	var mychart1 =  new Chart(ctx1, config1);
	var mychart2 =  new Chart(ctx2, config2);
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
	//for(t=0;t<=time*300;t=t+(time/20))
	for(t=2;t<=50;t=t+0.1)
	{
		var temp1 = Math.pow(t,4)/(Math.pow(omega1,2)*Math.pow(omega2,2));
    	var temp2 = (1+mu)*Math.pow(t/omega1,2);
    	var temp3 = Math.pow(t/omega2,2);
    	var temp = temp1 - (temp2 + temp3) + 1;
		var x1 = Math.abs(((1 - Math.pow(t	/omega2,2)) * xst) / temp);
		var x2 = Math.abs((1 * xst) / temp);
		var x1xst = x1/xst;
		var x2xst = x2/xst;
		if(t<5)
		{
			point1.push(x1xst);
			point2.push(x2xst);
			label1.push(t);
			label2.push(t);
			
		}
		var temp1 = fnot * (k2 - (m2 * omega *omega)) * Math.cos(omega * t);
		var temp2 = (m1 * m2 * Math.pow(omega,4)) - (omega * omega) *[(m2 * (k1 + k2) ) + (m1 * k2)] + (k1 * k2 + (k2 * k2));
		var x1 = temp1/temp2;
		
		var x2 = [fnot * k2 * Math.cos(omega * t)] / temp2;
		animpoints1.push(x2);
		animpoints2.push(x1);
		//var x = Math.sqrt(fnot * omega * Math.pow(k2/m2,2)+ k1 * Math.pow(m1,4) + t);
		//label1.push(t);
		//point1.push(x);
		//var x = Math.sqrt(fnot * omega * Math.pow(k2/m2,2)+ k1 * Math.pow(m1,4) + i*i);
		//point2.push(x);
		//label2.push(i);
		//var X = ((unbalance/mass) * Math.pow(eta,2))/Math.sqrt(Math.pow(1-Math.pow(eta,2),2) + Math.pow(2*zeta*eta,2));
		//var phialpha = Math.atan((2*zeta*eta)/(1-Math.pow(eta,2)));
		//var displacement = X * Math.sin((omega*t)-phialpha);
		//point1.push(displacement);
		//label1.push(t+"s");
		//var magnificationfactor = (Math.pow(i,2))/Math.sqrt(Math.pow(1-Math.pow(i,2),2) + Math.pow(2*zeta*i,2));
		//point2.push(magnificationfactor);
		//label2.push("n = "+i);
		//var phaseangle = Math.atan((2*zeta*i)/(1-Math.pow(i,2)));
		//point3.push(phaseangle * 180 / Math.PI);
		//label3.push("n = "+i);	
	}
	mychart1.update();
	mychart2.update();
}   