function happinessViz(femaleData, maleData) {
    var femaleArray = [];
    femaleData.forEach(element => {
        femaleDataArray.push(element.breed)
    });
    var occurences = {};
    for (var i = 0; i < femaleDataArray.length; i++) {
        if (typeof occurences[femaleDataArray[i]] == "undefined") {
            occurences[femaleDataArray[i]] = 1;
        } else {
            occurences[femaleDataArray[i]]++;
        }
    };
    var sortablefemaleData = [];
    for (var happiness in occurences) {
        sortablefemaleData.push([happiness, occurences[happines]]);
    }
    sortablefemaleData.sort(function (a, b) {
        return b[1] - a[1];
    });

    var maleDataArray = [];
    maleData.forEach(element => {
        maleDataArray.push(element.happiness)
    });
    var occurencesMale = {};
    for (var i = 0; i < maleDataArray.length; i++) {
        if (typeof occurencesMale[maleDataArray[i]] == "undefined") {
            occurencesMale[maleDataArray[i]] = 1;
        } else {
            occurencesMale[maleDataArray[i]]++;
        }
    };
    var sortablemaleData = [];
    for (var happiness in occurencesMale) {
        sortablemaleData.push([happiness, occurencesMale[happiness]]);
    }
    sortablemaleData.sort(function (a, b) {
        return b[1] - a[1];
    });
    var ctx = document.getElementById('femaleViz');
    var femaleData = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [sortablefemaleHappiness[0][1], sortablefemaleHappiness[1][1], sortablefemaleHappiness[2][1], sortablefemaleHappiness[3][1], sortablefemaleHappiness[4][1]],
                backgroundColor: ["#143642", "#0F8B8D", "#EC9A29", "#A8201A", "#DAD2D8"]
            }],
            labels: [sortablefemaleHappiness[0][0], sortablefemaleHappiness[1][0],sortablefemaleHappiness[2][0], sortablefemaleHappiness[3][0], sortablefemaleHappiness[4][0]]
        },
        options: {
            legend: {
                position: "bottom"
            }
        }
    });
    var ctx = document.getElementById('maleDataViz');
    var dogBreed = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [sortablemaleHappiness[0][1], sortablemaleHappiness[1][1], sortablemaleHappiness[2][1], sortablemaleHappiness[3][1], sortablemaleHappiness[4][1]],
                backgroundColor: ["#143642", "#0F8B8D", "#EC9A29", "#A8201A", "#DAD2D8"]
            }],
            labels: [sortablemaleHappiness[0][0], sortablemaleHappiness[1][0], sortablemaleHappiness[2][0], sortablemaleHappiness[3][0], sortablemaleHappiness[4][0]]
        },
        options: {
            legend: {
                position: "bottom"
            }
        }
    });
};
d3.json("/female").then(function (female) {
    console.log(female);
    d3.json("/male").then(function (male) {
        console.log(male);

        createMap(female, male);

        createCharts(female, male);

        createTagCloud_female(female);
        createTagCloud_male(male);

            })
});

$("#malePlots").show();
$("#femalePlots").show();
$("#happinessPlots").hide();
function selection(value) {
    
   }
    if (value == 'Happiness') {
        $("#male").hide();
        $("#femalePlots").hide();
        $("#happinessPlots").show();
    }
};