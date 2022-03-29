const now = Date.now();
const oneDay = 1000 * 60 * 60 * 24;
const threeDays = oneDay * 3;
const oneWeek = oneDay * 7;

function getDueDateStyle(dueDateString){
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
    return style;
}

function renderDueDate(destinationSelector, dueDateString) {
    let style = getDueDateStyle(dueDateString);
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

function createKeyResultsTD(krs) {
    console.log("KRs:", krs);
    let html = krs.map(kr => "<p>"+kr['result'] + ":<span style='"+getDueDateStyle(kr['due'])+"'>"+kr['due']+"</span></p>")
    let rval = html.reduce((prev, cur) => prev + cur);
    console.log("KRs RVAL:", rval);
    return rval;
}

function createOKRRow(row) {
    console.log("Row:", row);
    return "<tr><td>"+row['objective']+"</td><td>"+createKeyResultsTD(row['key-results'])+"</td></tr>"
}

function createOKRRows(data) {
    console.log("Data:", data)
    return data['okrs'].map(createOKRRow);
}

function renderOKRTable() {
    fetch('https://raw.githubusercontent.com/kmbyrne/my-json/main/example.json')
        .then(response => response.json())
        .then(data => {

            AJS.$('#okr-table').append(createOKRRows(data));
        });
}

