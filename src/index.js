/*
    Bar & line charts based of the Arctic Mountains &
    Fiords climate data from Stats Canada using es6 classes,
    d3, and chart.js

    Created for CWD3500 - Web Application Frameworks
    
    Created by:

    Sabre Harrisson - 100725581
    Sophie - 100724844
    Melissa Khan - 100708543
*/
//IMPORT BAR AND LINE DISPLAYS
import BarDisplay from './BarDisplay';
import LineDisplay from './LineDisplay';

//BAR DISPLAY GRAPH INFORMATION
let graphData;
let graphHolder;
let lineHolder;
let barWidth = 920;
let barHeight = 400;
let barPadding = 2;
let barHolder = "#barSpace";

//declare buttons
let annualButton = document.getElementById("annual");
let springButton = document.getElementById("spring");
let summerButton = document.getElementById("summer");
let fallButton = document.getElementById("fall");
let winterButton = document.getElementById("winter");

//declare the all chart svg
let mySVG = document.querySelectorAll("svg");


//LINE DISPLAY CHART dimensions
let lnHolder = "#lineSpace";
let lnHeight = 400;
let lnWidth = 920;

//set the season to start at 0
let seasonsName = 0;

let splashScreen = document.querySelector('#splash');
let graphScreen = document.querySelector('#graph');
// let showData = document.querySelector('#showData');

// function showSplash(){
//     TweenMax.to(splashScreen,3,{
//         opacity:1,
//         onComplete: function(){
//             TweenMax.to(splashScreen,0.25,{
//                 opacity:0,
//                 onComplete: function(){
//                     TweenMax.fromTo(graphScreen,0.5,{
//                         opacity:0
//                     },{
//                         opacity:1,
//                     })
//                 }
//             })
            
//         }
//     })
// }
let button = document.querySelectorAll('.theButton');

function setActive() {
    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", function() {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
    }
}

//function start the charts
function drawChart(){
    //hide other svg chart when switch data
    mySVG.forEach(svg =>{
        svg.innerHTML = "";
    })
    graphHolder = new BarDisplay(graphData, barHolder, barWidth, barHeight, barPadding);
    lineHolder = new LineDisplay(graphData,lnHolder, lnHeight, lnWidth);
}


//external data
fetch('data.json')
    .then(data => data.json())
    .then(data => {
        // showSplash();
        //take data from data.json
        graphData = data.climateData.seasons[seasonsName].seasonData;
        console.log(graphData);
        showData.addEventListener('click', () =>{
            splashScreen.style.display = 'none';
            TweenMax.fromTo(graphScreen,0.5,{
                opacity:0
            },{
                opacity:1,
                ease: Linear.easeInOut
            })
        });
        drawChart();
        setActive();
        //applied the data fot the buttons
        annualButton.addEventListener('click', () =>{
            graphData = data.climateData.seasons[0].seasonData;
            drawChart();
        });
        springButton.addEventListener('click', () =>{
            graphData = data.climateData.seasons[1].seasonData;
            drawChart();
        });
        summerButton.addEventListener('click', () =>{
            graphData = data.climateData.seasons[2].seasonData;
            drawChart();
        });
        fallButton.addEventListener('click', () =>{
            graphData = data.climateData.seasons[3].seasonData;
            drawChart();
        });

        winterButton.addEventListener('click', () =>{
            graphData = data.climateData.seasons[4].seasonData;
            drawChart();
        })
        
});
