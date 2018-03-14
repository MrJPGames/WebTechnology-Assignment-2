//Create tooltip element
$("<div id='tooltip'></div>").css({
    position: "absolute",
    display: "none",
    border: "1px solid #fdd",
    padding: "2px",
    color: "black",
    "background-color": "white",
    opacity: 0.80
}).appendTo("body");

//Add .exists() function to jQuery
jQuery.fn.exists = function(){return this.length>0;}

if ($("#exploitsGraph").exists()){
    //Create bar chart
    var plot = $.plot(
        $("#exploitsGraph"),
        [
            //Graph data [id, value]
            {
                label: "Exploits disclosed",
                data: [
                    [0, 444],
                    [1, 387],
                    [2, 329],
                    [3, 261],
                    [4, 259],
                    [5, 259],
                    [6, 259],
                    [7, 243],
                    [8, 234],
                    [9, 231]
                ]
            }
        ]
        ,
        {
            series: {  
                //Set graph type to bars
                bars: {
                    show: true,
                    align: "center",
                    barWidth: 0.5
                },      
                points: {
                    show: false,
                    fill: false
                }
            },
            grid: {
                //Make hoverable
                hoverable: true
            },
            xaxis: {
                axisLabel: "Product name",
                labelAngle: -90,
                //id -> name ([id, name])
                ticks: [
                    [0, "Mac OS X"],
                    [1, "iOS"],
                    [2, "Flash Player"],
                    [3, "Ubuntu Linux"],
                    [4, "Air SDK"],
                    [5, "AIR"],
                    [6, "Air SDK & Compiler"],
                    [7, "Opensuse"],
                    [8, "Debian Linux"],
                    [9, "Internet Explorer"]
                ],
                axisLabelUseCanvas: true
            }
        }
    );

    

    //Hover interaction
    $("#exploitsGraph").bind("plothover", function (event, pos, item) {
        if (item) {
            var x = item.datapoint[0].toFixed(2),
                y = item.datapoint[1].toFixed(2);

            //Set hover text and location
            $("#tooltip").html(Math.round(y) + " exploits")
                .css({top: item.pageY-Math.round($("#tooltip").height()+10), left: item.pageX-Math.round($("#tooltip").width()/2)})
                .fadeIn(200);
        } else {
            $("#tooltip").hide();
        }
    });
}


if ($("#cybersecuritySpendingGraph").exists()){
    //Create bar chart
    var plot = $.plot(
        $("#cybersecuritySpendingGraph"),
        [
            //Graph data [year, value]
            {
                label: "billions USD",
                data: [
                    [2009, 25],
                    [2010, 26],
                    [2011, 31],
                    [2012, 34],
                    [2013, 40],
                    [2014, 46],
                    [2015, 52],
                    [2016, 57],
                    [2017, 63]
                ],
                //Set graph of absolute values to bars
                bars: {
                    show: true, 
                    align: "center",
                    lineWidth:1
                }
            },
            {
                label: "%GDP",
                data: [
                    [2009, 0.18],
                    [2010, 0.185],
                    [2011, 0.2],
                    [2012, 0.22],
                    [2013, 0.26],
                    [2014, 0.28],
                    [2015, 0.3],
                    [2016, 0.33],
                    [2017, 0.35]
                ],
                yaxis: 2,
                points: { 
                    symbol: "circle", 
                    fillColor: "#FF0000", 
                    show: true 
                },
                lines: {
                    show: true
                },
                grid: {
                    hoverable: false
                }
            }
        ]
        ,
        {
            series: {        
                points: {
                    show: false,
                    fill: false
                }
            },
            grid: {
                //Make hoverable
                hoverable: true
            },
            yaxes: [
                //yaxis:1
                {
                    position: "left",
                    color: "black",
                    axisLabel: "billions USD",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelPadding: 3            
                }, 
                //yaxis:2
                {
                    position: "right",
                    min: 0,
                    clolor: "black",
                    axisLabel: "% of GDP",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelPadding: 3            
                }
            ],
            xaxis: {
                mode: "year",     
                tickLength: 0,
                axisLabel: "Date",
                tickDecimals: 0,
                axisLabelUseCanvas: true
            },
            legend: {
                noColumns: 1,
                labelBoxBorderColor: "#000000",
                position: "nw"       
            }
        }
    );

    //Hover interaction
    $("#cybersecuritySpendingGraph").bind("plothover", function (event, pos, item) {
        if (item) {
            var x = item.datapoint[0].toFixed(2),
                y = item.datapoint[1].toFixed(2);

            //Remove decimals if possible without losing data
            var val = Math.round(y);
            if (val != y)
                val = y;

            //Set hover text and location
            $("#tooltip").html(val + " " + item.series.label)
                .css({top: item.pageY-Math.round($("#tooltip").height()+10), left: item.pageX-Math.round($("#tooltip").width()/2)})
                .fadeIn(200);
            } else {
                $("#tooltip").hide();
        }
    });
}