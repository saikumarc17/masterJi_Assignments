const emojiBTn=document.querySelectorAll('.emoji');
let selectedEmoji='';
const moodNote=document.getElementById('moodNote');
const saveMood=document.getElementById('saveMood');
const timeLineFeed=document.getElementById('timeLineFeed');
const totalEntries=document.getElementById('totalEntries');

let feedbackArr=[];

window.addEventListener('load',()=>{
    // getting mood timeline from local storage
    feedbackArr=JSON.parse(localStorage.getItem('moodTracker'));
    
    // checks if timeline is empty or not
    if(feedbackArr){
        feedbackArr.forEach((ele)=>{
            // for creating timeLineFeed by passing object 
            generateTimeLine(ele)
        })

        //for allowing user to log once in a day only
        // getting last login date
        const lastLoginDate= new Date(
            feedbackArr[feedbackArr.length-1].timeStamp
        ).getDate();
        // getting system date
        const currentDate=new Date()
        // disabling subit button by default
        saveMood.disabled=true;
        // console.log(lastLoginDate<currentDate.getDate());
        
        // checking if currentdate > lastlogin
        if(currentDate.getDate()>lastLoginDate){
            saveMood.disabled=false;
            console.log(lastLoginDate,currentDate.getDate());
        }
        // for updating entries count
        updateTotalentries(feedbackArr)
    }else{
        feedbackArr=[]
        // for updating entries count
        updateTotalentries(feedbackArr)
    }
    // generating status for ploting data
    generatestatus();

})

// adding click events to all emojies and highlight on clicks 
emojiBTn.forEach((ele)=>{
    ele.addEventListener('click',()=>{
        // clearing default for all emojis
        clearActive();
        let classes=['bg-gray-200','rounded-full','p-2']
        selectedEmoji=ele.innerText;
        ele.classList.add(...classes);
    })
})

// for savng mood on submit
saveMood.addEventListener('click',()=>{
    // checks if emoji selected or not
if(selectedEmoji){
    let ele={
        selectedEmoji,
        moodNote:moodNote.value,
        timeStamp:new Date().toString(),
        status:addstatus(selectedEmoji)
    }
    feedbackArr.push(ele);
    localStorage.setItem('moodTracker',JSON.stringify(feedbackArr));
    generateTimeLine(ele);    
    clearform();
}else{
    // alerts user to select emoji
    alert('Select current status to Submit')
}
    
})

// for setting status based on emojis
function addstatus(ele){
    if('🤩'===ele){
        return 'Excited';
    }else if('😀'===ele){
        return 'Happy';
    }else if('😐'===ele){
        return 'Neutral';
    }else{
        return 'Sad';
    }
}

// clearing emoji highlight
function clearActive(){
    let classes=['bg-gray-200','rounded-full','p-2']
    emojiBTn.forEach((item)=>{
        item.classList.remove(...classes);
    })
}

// generating timeline html andappending it to parent element
function generateTimeLine(item){
    let child=`
        <span class="text-2xl" >${item.selectedEmoji}</span>
        <span > ${item.timeStamp.slice(0,15)}  </span>
        <div class="mx-2" >${item.moodNote}</div>
    `
    let childele=document.createElement('div');
    childele.classList.add('p-4', 'rounded-lg' ,'m-2' ,'bg-gray-800');
    childele.innerHTML=child;
    timeLineFeed.appendChild(childele)
}

// clearing data after submt
function clearform(){
    clearActive();
    moodNote.value='';
}

// generating plot data from filtered array
function generatestatus(){
    let arr=feedbackArr.reduce((acc,curr)=>{
    acc[curr.status]=(acc[curr.status] || 0) + 1 ;
    return acc   
    },{})
    // setting plot data in local storage
    localStorage.setItem('GraphData',JSON.stringify(arr));

}

// updating total entries in html
function updateTotalentries(arr){
    totalEntries.innerText=arr.length;
}