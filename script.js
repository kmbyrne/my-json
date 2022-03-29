const now = Date.now();
const oneDay = 1000 * 60 * 60 * 24;
const threeDays = oneDay * 3;
const oneWeek = oneDay * 7;

function renderDueDate(destinationSelector, dueDateString) {
    let dueDate = Date.parse(dueDateString);
    let style = '';
    if (dueDate - now < 0) {
        style = 'color:red';
    } else if (dueDate - now < threeDays) {
        style = 'color:orange';
    } else if (dueDate - now < oneWeek) {
        style = 'color:#ffad23';
    } else {
        style = 'color:green';
    }
    AJS.$(destinationSelector).html('<p style=' + style + '>' + dueDateString + '</p>');
}

const rows = [];
let btn = document.getElementById("addRowButton");
btn.addEventListener('click', event => {
    rows.push("blah")
    AJS.$('#rows').html(rows.map(x => '<span>' + x + '</span>'))
});

document.getElementById('fetchGoogle').addEventListener('click', event => {
    fetch('https://raw.githubusercontent.com/kmbyrne/my-json/main/example.json')
        .then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(data));
            AJS.$('#movies').text(JSON.stringify(data));
        })
})

function renderOKRTable() {
    fetch('https://raw.githubusercontent.com/kmbyrne/my-json/main/example.json')
        .then(response => response.json())
        .then(data => {
            let okrs = data["okrs"];
            AJS.$('#okr-table').html(okrs.reduce((prev, cur) => prev + "<tr><td>" + cur['objective']+"</td><td>" + cur['key-result'] + "</td></tr>"));
        })
}

