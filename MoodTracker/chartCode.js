window.addEventListener('load',()=>{
    // for getting localstorage mood data for ploting bar chart
    let value=JSON.parse(localStorage.getItem('GraphData'));
    // breaking json for assigning labels
    const labels=Object.keys(value);
    // breaking json for assigning data
    const data=Object.values(value);

    // Setting up most common mood status   
    const mostCommon=document.getElementById('mostCommon');
    const filtereddata =labels.filter((ele)=>value[ele]===Math.max(...data))
    if(filtereddata>1&&filtereddata.includes('Excited')){
        mostCommon.innerText="Excited";
    }else if(filtereddata>1&&filtereddata.includes('Happy')){
        mostCommon.innerText="Happy";
    }else{
        mostCommon.innerText=`${filtereddata[0]}`;
    }

    // for initializing chart
    createchart(labels,data)
})



function createchart(labels,data){
    // refering div element with id for chart isplay
    const canvaElement=document.getElementById('moodchart').getContext("2d");
    // configuring chart
    const config={
        // type of chart
        type:"bar",
        data:{
            labels:labels,
            datasets:[{
                label:"mood count",
                data:data
            }],
            // setting background color
            backgroundColor:['blue']
        },
        // setting text color to white colors
        options: {
            scales: {
                x: {
                    ticks: {
                        color: "white" 
                    }
                },
                y: {
                    ticks: {
                        color: "white" 
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
                }
            }
        }
    };
    // creating chart by using chart js
    new Chart(canvaElement,config);
}
