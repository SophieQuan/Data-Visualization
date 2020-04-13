//Line Chart Displays Temperature and Years
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

export default class LineDisplay {
    constructor(graphData, lnHolder, lnHeight, lnWidth) {
        this.h = lnHeight;
        this.w = lnWidth;
        this.holder = lnHolder;
        this.graphData = graphData;
        this.margin = { 
            top: 20,
            left:20,
            bottom:20,
            right:20
        }
        this.holderWidth = this.w;
        this.holderHeight = this.h - this.margin.top - this.margin.bottom;
        this.buildLineChart();
    }

    buildLineChart() {
        let dataset = this.graphData;

        let svg = d3.select(this.holder)
            .attr("viewBox", `0 0 1024 400`)
            // .attr('width', this.holderWidth)
            //add extra height to show negative values
            // .attr('height', this.holderHeight + this.margin.top + this.margin.bottom);

        //get the value of temp and year
        let tempData = dataset.map(d=>d.temp);
        let yearData = dataset.map(d=>d.year);
        
        //define the min data for temp value
        let minVal = d3.min(tempData);
        //define the max data for year value
        let maxVal = d3.max(yearData);

        /*
        add the scale to the x axis and y axis
        the range : the width and height of the graphData
        domain: data of x
        */
        let xScale = d3.scaleBand()
            .domain(yearData)
            .range([0,this.holderWidth])
            .paddingInner(0.05);

        let yScale = d3.scaleLinear()
            .domain(d3.extent(tempData))
            .range([this.holderHeight , 0])

        //create the x axis at the bottom and y axis on left side
        let xAxis = d3
            .axisBottom(xScale);

        let yAxis = d3
            .axisLeft(yScale)
            .ticks(20);
            
        //define the line of the graph   
        let lineFun = d3
            .line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.temp))
            .curve(d3.curveLinear);
        
        //draw the line path
        let viz = svg.append('path')
            .attr('d', lineFun(dataset))
            .attr('id','tempLine')
            .attr('transform', 'translate(40,0)')
            .attr('stroke-width','2')
            .attr('stroke','black')
            .attr('fill', 'none')

        //temperature data labels
        let labels = svg.selectAll('text')
            .data(dataset)
            .enter()
            .append('text')
            .attr('d', lineFun(dataset))
            .attr('transform', 'translate(35,-2)')
            .text(d => d.temp)
            .attr('x',d => xScale(d.year))
            .attr('y',d => yScale(d.temp))
            .attr('class','lineNum')
            .attr('font-size', '25px')
            .attr('font-family', 'sans-serif')
            .attr('text-anchor', 'start')
            
            .attr('font-weight','bold')
            .attr('fill',d => {
                if (d.temp > 0) {
                    //return positive colour
                    return `#C35300`;
                } else {
                    //return negative colour
                    return `#0A8379`;
                }
            });

        let circles = svg.selectAll('circle')
            .data(dataset)
            .enter()
            .append('circle')
            .attr('transform', 'translate(40,0)')
            .attr('cx',d => xScale(d.year))
            .attr('cy',d => yScale(d.temp))
            .attr("r",'3')
            .attr('fill',d => {
                if (d.temp > 0) {
                    //return positive colour
                    return `#C35300`;
                } else {
                    //return negative colour
                    return `#0A8379`;
                }
            });
        // append the group of nums and insert y axis
        svg.append('g')
            .attr("viewBox", `0 0 width height`)
            .attr('class','ylabel')
            .attr('transform', 'translate(30, 0)')
            .style('font-size', '16px')
            .call(yAxis)
            //add the prescription for yscale
            .append('text')
                .attr('transform', 'rotate(-90), translate(-150,-45)')
                .attr('font-size', '18px')
                .style('text-anchor', 'start')
                .style('fill', '#0A8379')
                .attr('font-weight','700')
                .text('Temperature (ºC)');

        //add the prescription for xscal
        svg.append('g')
            .attr('class','xScale')
            .attr('transform', 'translate(30, ' + yScale(minVal)+')')
            .style('font-size', '14px')
            //call the x axis
            .call(xAxis)
            .selectAll('text')
			.attr('transform', 'rotate(-90), translate(-30, -15)');
            //add the prescription for xscale
        svg.append('text')
            .attr('transform', 'translate (780, '+  (this.holderHeight + 70) + ')')
            .attr('font-size', '20px')
            .style('text-anchor', 'start')
            .style('fill', '#0A8379')
            .attr('font-weight','700')
            .text('Year')
        

    }
    //END buildLineChart :)
}