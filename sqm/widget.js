let container;
let host;
let eyeSensor;

function setText(value) {
  container.text(value);
  if (value > 20) {
    container.addClass('bad');
  } else {
    container.removeClass('bad');
  }
}

function updateSQM() {
  fetch(`http://${host}:1380/geteye?idx=${eyeSensor}`).then(response => {
    const data = response.json();
    if (data.result === "OK") {
    	setText(response.value);
    }
  });
  
  setTimeout(updateSQM, 5000);
}

window.addEventListener('onWidgetLoad', function (obj) {
  host = obj.detail.fieldData.host;
  container = $('.main-container');
  eyeSensor = obj.detail.fieldData.eyeSensor;
  updateSQM();
});
