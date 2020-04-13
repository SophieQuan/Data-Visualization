//Bar Chart Displays Precipitation and Years
/*
    Bar & line charts based off of the Arctic Mountains &
    Fiords dlimate data from Stats Canada using es6 classes,
    d3, and chart.js

    Created for CWD3500 - Web Application Frameworks
    
    Created by:

    Sabre Harrisson - 100725581
    Sophie - 100724844
    Melissa Khan - 100708543
*/
import * as d3 from 'd3';

//creating the barDisplay - Bar Chart
export default class BarDisplay {
    //taking the information/properties from index.js
    constructor(graphData, barHolder, barWidth, barHeight, padding){
        this.w = barWidth;
        this.h = barHeight;
        this.padding = padding;
        this.barHolder = barHolder;
        this.graphData = graphData;
        this.margin = { 
            top: 20,
            left:20,
            bottom:20,
            right: 20
        }
        this.holderWidth = this.w;
        this.holderHeight = this.h - this.margin.top - this.margin.bottom;
        this.buildChart();
    }
    
    //starting to build the chart
    buildChart() {
    
        let dataset = this.graphData;
        // set the width and height of the svg
        //create the svg as the graph
        let svg = d3.select(this.barHolder)
        .attr("viewBox", `0 0 1024 400`)
        // .attr('width', this.holderWidth)
        //add extra height to show negative values
        // .attr('height', this.holderHeight);
        
        //get the precip and year values from data.json
        let precipData =dataset.map(d=>d.precip);
        let yearData = dataset.map(d=>d.year);

        //add the scale to the x axis
        let xScale = d3.scaleBand()
            .domain(yearData)
            .range([0,this.holderWidth])
            .paddingInner(0.05);
            
        // add the y scale/numbers to the y axis
        let yScale = d3.scaleLinear()
            .domain(d3.extent(precipData))
            .range([this.holderHeight,0])

        //create the x axis using the scale of the xScale
        let xAxis = d3
            .axisBottom(xScale);

        //creating the y axis using the precip nums
        let yAxis = d3
            .axisLeft(yScale)
            .ticks(20);

        let minVal = d3.min(precipData);
        // append the new group of the rect (bars)
        svg.append('g')
            .attr("viewBox", `0 0 1024 400`)
            .attr('transform', 'translate(30, 0)')
            //create the rects
            .selectAll('rect')
                //usse the data
                .data(dataset)
                .enter()
                .append('rect')
                .attr('class','bar')
                //the width position
                .attr('x', d => xScale(d.year))
                //the height is the precipitation 
                .attr('y', d =>{
                    //get the height by using an if statement in case of neg nums
                    if(d.precip>=0){
                        return yScale(d.precip)
                    }
                    else{
                        return yScale(0);	
                    }
                })
                //the width plus the padding
                .attr('width', xScale.bandwidth)
                //change the height by finding the absolute number of the height
                .attr('height', d => Math.abs(yScale(0) - yScale(d.precip)))
                //changing the colours of the bars
                .attr('fill',d => {
                    if (d.precip > 0) {
                        //change it to a brighter colours - pinks
                        return `#C35300`;
                        
                    } else {
                        //if its less than 0 change the colour to darker colours - orange/fall
                        return `rgb(${Math.abs(d.precip)*1},131,121)`;
                    }
                });
                //define the min data for precip value
        
        // append the group of labels 
        svg.append('g')
            //create the classes for the labels
            .attr('class','labels')
            //get all the text
            .selectAll('text')
                //get the data
                .data(dataset)
                .enter()
                //make the text go to the proper positions
                .append('text')
                    .attr('id','chartNum')
                    //move the text over to be on top the bar - the middle of the bar
                    .attr('transform', 'translate(32, 0)')
                    //make the text be the label of the precipitation its on
                    .text(d => d.precip)
                    //get the x attribute to be 10 higher than the bar
                    .attr('x',(d ,i)=> i * (this.holderWidth / precipData.length ))
                    .attr('y',(d) => {
                        if (d.precip > 0) {
                            //make the label 20px lower
                            return yScale(d.precip)+20;
                        } else {
                            //make the label 10 px higher
                            return yScale(d.precip)-10
                        }
                    })
                    //change the fill of the labels
                    .attr('fill',d => {
                        if (d.precip > 0) {
                            //change it to a brighter colours - pinks
                            return `#C35300`;
                            
                        } else {
                            //if its less than 0 change the colour to darker colours - orange/fall
                            return `rgb(${Math.abs(d.precip)*1},131,121)`;
                        }
                    })
                    //change the font size
                    .attr('font-size', '14px')
                    //change the font-weight for visual purposes
                    .attr('font-weight', '700');
        

        // append the group of nums and insert x axis
        svg.append('g')
            .attr('class','xScale')
            .attr('transform', 'translate(30, ' + yScale(minVal)+')')
            .style('font-size', '14px')
            //call the x axis
            .call(xAxis)
            .selectAll('text')
			.attr('transform', 'rotate(-90), translate(-30, -15)')

        //add the prescription for xscale
        //year label display
        svg.append('text')
                .attr('transform', 'translate (780, '+  (this.holderHeight + 70) + ')')
                .attr('font-size', '20px')
                .style('text-anchor', 'start')
                .style('fill', '#0A8379')
                .attr('font-weight','600')
                .text('Year')

        // append the group of nums and insert y axis
        svg.append('g')
            .attr('class','yScale')
            .attr('transform', 'translate(30, 0)')
            .style('font-size', '16px')
            .call(yAxis)
            //add the prescription for yscale
            .append('text')
                .attr('transform', 'rotate(-90), translate(-150,-45)')
                .attr('font-size', '18px')
                .style('text-anchor', 'start')
                .style('fill', '#0A8379')
                .attr('font-weight','600')
                .text('Precipitation (%)');
        //END OF START CHART
    }

 // END OF BAR DISPLAY
}

