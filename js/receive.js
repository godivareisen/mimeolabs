var pubKey = 'XGLg5wbWdZtVKnwXydOl'
var dataField = 'mimeo'

setInterval(function() {
  getPhant(pubKey,dataField,scan);
}, 4000);

function scan(data) {
  var dataNum = parseInt(data);
  if (dataNum > 512) {
    $("#change").attr('src','images/mimeoscandemoanimation.gif');
  } else if (dataNum < 512) {
    $("#change").attr('src','images/mimeoanimation.gif');
  }
}
