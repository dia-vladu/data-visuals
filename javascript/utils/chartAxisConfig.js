import { axisLineColor, gridLineColor, referenceTextColor } from "../styles/colors.js";

// Configuration for OX axis
export const oxAxisConfig = (height, width) => ({
    axisLineConfig: {
        x1: 50,
        y1: height - 30, // Dynamic height calculation
        x2: width - 25,
        y2: height - 30,
        stroke: axisLineColor.stroke, 
        strokeWidth: 2
    }
});

function getGridLineScale(i, data) {
    console.log('data: ', data);
    let maxi = Math.max(...data.map(val => val.value));
    let mini = Math.min(...data.map(val => val.value));
    console.log('maxi: ', maxi);
    console.log('mini: ', mini);
    if (maxi >= 1000000) {
        maxi /= 1000000;
        if (mini >= 1000000) {
            mini /= 1000000;
        }
    } else if (maxi >= 1000) {
        maxi /= 1000;
        if (mini >= 1000) {
            mini /= 1000;
        }
    }
    let gridLineScale = ((Math.ceil(maxi) - Math.floor(mini)) / 5) * i + Math.floor(mini)
    console.log(gridLineScale)
    return gridLineScale;
}

// Configuration for OY axis
export const oyAxisConfig = (height, width) => ({
    axisLineConfig: {
        x1: 50,
        y1: 30,
        x2: 50,
        y2: height - 30,
        stroke: axisLineColor.stroke,
        strokeWidth: 2
    },
    gridLineConfig: {
        count: 5,
        yPosition: (i) => (height - 30) - ((height - 60) / 5) * i,
        x1: 50,
        x2: width - 25,
        stroke: gridLineColor.stroke,
        strokeDasharray: 4,
        strokeWidth: 1,
        fillOpacity: 0.7
    },
    referenceTextConfig: {
        count: 5, // There are 5 reference lines on the OY axis
        yPosition: (i) => (height - 30) - ((height - 60) / 5) * i,
        fill: referenceTextColor.fill,
        referenceText: (i, data) => getGridLineScale(i, data)
    }
});