$(document).ready(function () {
    var plot = $.plot(
        $("#flot"),
        [
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
                bars: {
                    show: true,
                    align: "center",
                    barWidth: 0.5
                },      
                points: {
                    show: true,
                    fill: false
                }
            },
            grid: {
                hoverable: true
            },
            xaxis: {
                axisLabel: "Product name",
                labelAngle: -90,
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
                ]
            }
        }
    );
});

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

//Hover interaction
$("#flot").bind("plothover", function (event, pos, item) {
    console.log(item);
    if (item) {
        var x = item.datapoint[0].toFixed(2),
            y = item.datapoint[1].toFixed(2);

        $("#tooltip").html(Math.round(y) + " exploits")
            .css({top: item.pageY-Math.round($("#tooltip").height()+10), left: item.pageX-Math.round($("#tooltip").width()/2)})
            .fadeIn(200);
        console.log();
    } else {
        $("#tooltip").hide();
    }
});

/*
[
    ["Mac OS X", 444],
    ["iOS", 387],
    ["Flash Player", 329],
    ["Ubuntu Linux", 261],
    ["Air SDK", 259],
    ["AIR", 259],
    ["Air SDK & Compiler", 259],
    ["Opensuse", 243],
    ["Debian Linux", 234],
    ["Internet Explorer", 231]
]
*/