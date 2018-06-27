# vlab-simulations
Simulations for Virtual Labs, NIT-K, Surathkal.

## Structure of simulations
The structure  contains three parts, viz graphs, animation and calculations.

## Steps to be performed before starting the development.
- First the number of inputs and outputs are decided.
- Equations have to be derived which will take the inputs and give the outputs which were decided in the above step.
- The total number of graphs have to be decided and equation to get the points of the graph has to be derived from the above inputs.

##  Prerequisites to develop simulations
- One should have the basic understanding of HTML.
- One should have the basic understanding of JavaScript.
- One should have the strong understanding of jQuery.
- One should know the workflow of chart.js which is JavaScript library used to plot the graph.
- One should know how to develop animation using HTML5 Canvas.

## File structure for the simulation
- There will be one HTML file and one folder named *sins*.
- The HTML file will contain the structure of the simulation frame.
- The *sins* folder will contain the frame image which will represent the frame of the simulation.
- It was also contain MOMScript.css file which will contain the styles for the simulation frame.
- There would be multiple images which has to be kept in the simulation frame.
- It will also contain images for the buttons for controlling the simulation frame.
### chart.js file
- There will be one javascript file named chart.js, this chart.js file will contain  arrays   for animation and graph points, It will also contain one function named *updategraph*.
- This update graph function will have parameters which will be used to calculate the points of the graph.
- This *updategraph* function is called each time when the user value changes.
- When the *updategraph* function is called, it remove all the points from the animation and  graph point arrays, then it will recalculate these points with the new user inputs. This new calculated points are pushed into the animation and graph point arrays and the graph is updated.
- This *updategraph* function will also have configuration of the graph.
### sim.js file
- There will be one file named sim.js, this file will contain all the static variables whose values will be needed in the calculations, this file will contain a function named *display*, This *display* function is called each time when the user input value changes. This function takes the user input values into local variables, by using these variables and performing mathematical operations on them we get the desired output, then the output is displayed into the *div* having id as *commentboxleft* and/or *commentboxright*.
- This *display* function also call the *updategraph* function with the parameters which are required to plot the graph.
- This *display* function will also perform the animation.
- When the *display* function is called it requests an animation frame.
- There is a function named *drawRectangle* or *drawAnimation*, this function will draw the animation in the canvas by using the variables of an object named *myRectangle*.
- There is also one function named *animate* which will call the *drawRectangle* or *drawAnimation* function and update the variables of myRectangle object.
- Variables of the myRectangle object are updated by the animation points array, which is made by *updategraph* function.
- This *animate* function will clear the canvas before drawing of the new animation screen, and is set to be called continuously for infinite time.
- This sim.js file will also contain JavaScript code for the scaling factor which is explain later in this documentation.
- This sim.js file also handles all the change in the user inputs, This file calls *display* function on the change of any of the user inputs, this file also contains all the mouseover and/or mouseleave event handling functions and work accordingly. This file also handles click event of the controlling buttons, and perform the required actions.
- This file also control the toggling of animation and graph by performing show and hide operations.
## Working of scaling factor
- Let us assume that we want to scale the radius, Let's assume that we can show minimum radius 20 and maximum radius 160, Hence 160 - 20 equals to 140, so the range to display the radius is 140 and now we will use the following piece of code to scale a radius. The value we get at end will be used in simulation.
```javascript
var tempradius = parseInt(radius);
      var scalingfactor = tempradius/140;
      var quotient = Math.floor(scalingfactor);
      var remainder = tempradius - (quotient * 140);
      remainder = remainder + 20;
      if(tempradius%140 == 0)
      {
          scalingfactor = scalingfactor + 1;
      }
      tempradius = remainder;
      document.getElementById("radiusscalingfactor").innerHTML = "Radius Scaling Factor - 1:"+Math.ceil(scalingfactor);
```
## Working of animation
- The sim.js file contains a function called *animate*, this function is set to call for infinite amount of time. This *animate* function first clear the previous animation screen and then updates the parameters of myRectangle object which are used for the animation and then draws the animation screen with the updated values.
- You can check the example [Here](https://www.html5canvastutorials.com/advanced/html5-canvas-oscillation-animation/).
## Working of graphs
-  Graph is plotted by using chart.js library. The chart.js file contains *updategraph* function, this function is called each time when the user input values changes, this function is called by the *display* function written in sim.js file. When this function is called, the graph and animation array are emptied first, then the new animation and graph points are calculated using the equation, the inputs of that equation are passed as a parameter to the function, the newly calculated values are then push into the arrays of graph and animation and then the new graph is plotted.
