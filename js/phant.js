// DATA.SPARKFUN.COM
//

function getPhant(pubKey, dataField, callback) {
    var phantUrl = 'https://data.sparkfun.com';
    var url = phantUrl + '/output/' + pubKey + '.json';
    $.ajax({
        url: url,
        jsonp: 'callback',
        cache: false,
        dataType: 'jsonp',
        data: {
            page: 1
        },
        success: function(response) {
            // check for success
            if (response.success === false) {
                console.log( "Connection to cloud service failed: " + response.message);
                if (response.message == 'stream not found') {
                    console.log("Invalid key");
                } else {
                    console.log("Can't connect");
                }
            } else {
                if (response[0][dataField] === undefined) {
                    console.log("Bad datafield");
                } else {
                    callback(response[0][dataField]);
                }
            }
        },
        fail: function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Connection to cloud servive failed: " + err );
        }
    });
}

function setPhant(pubKey, priKey, dataField, theValue) {
    var phantUrl = 'https://data.sparkfun.com';

    var url = phantUrl + '/input/' + pubKey + '?private_key=' + priKey + '&' + dataField + '=' + theValue;
    $.getJSON(url)
        .done(function( json ) {
            //console.log( "JSON Data: " + JSON.stringify(json) );
        })
        .fail(function( jqxhr, textStatus, error ) {
            var response = JSON.parse(jqxhr.responseText);
            var err = textStatus + ", " + error + ', ' + response.message;
            console.log( "Connection to cloud service failed: " + err );
            if (response.message.indexOf('is not a valid field') >= 0) {
                console.log("Invalid datafield");
            } else if (error == "Unauthorized") {
                console.log("Invalid key");
            } else {
                console.log("Can't connect");
            }
    });
}