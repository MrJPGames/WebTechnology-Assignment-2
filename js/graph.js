$(document).ready(function () {
    $.plot(
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