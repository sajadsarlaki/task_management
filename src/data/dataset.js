const data = [{
    id: 1,
    icon: "⭕️",
    status: "open",
    title: "Human Interest Form",
    content: "Fill out human interest distribution form",
    labels:[]
}, {
    id: 2,
    icon: "⭕️",
    status: "open",
    title: "Purchase present",
    content: "Get an anniversary gift",
    labels:[]

}, {
    id: 3,
    icon: "⭕️",
    status: "open",
    title: "Invest in investments",
    content: "Call the bank to talk about investments",
    labels:[]

}, {
    id: 4,
    icon: "⭕️",
    status: "open",
    title: "Daily reading",
    content: "Finish reading Intro to UI/UX",
    labels:[]

}];

const statuses = [{
    status: "open",
    icon: "⭕️",
    color: "#EB5A46"
}, {
    status: "in progress",
    icon: "🔆️",
    color: "#00C2E0"
}, {
    status: "in review",
    icon: "📝",
    color: "#C377E0"
}, {
    status: "done",
    icon: "✅",
    color: "#3981DE"
}
];

const labels = [
    { name: 'done', color:'#fd2'  },
    { name: 'important',  color:'red'},
    { name: 'started', color:'#090'},
    { name: 'delay', color:'#009' },
];

// save to localStorage
// localStorage.setItem("items", JSON.stringify(data) );
// localStorage.setItem("statuses", JSON.stringify(statuses));
// localStorage.setItem("items", JSON.stringify(labels) );


export { data, statuses, labels };
