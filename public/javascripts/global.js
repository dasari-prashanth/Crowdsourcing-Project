// Userlist data array for filling in info box
var userListData = [];
var CompareContent = '';


$('#search').click(function(){ 
			
			CompareContent = $('#searchtext').val(); 
			populateTable();
});

	
// DOM Ready =============================================================
$(document).ready(function() {

});


// Functions =============================================================

// Fill table with data
function populateTable() {

    // jQuery AJAX call for JSON
    $.getJSON( '/users/sample3', function( data ) {

        // Stick our user data array into a userlist variable in the global object
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string

        $.each(data, function(){
			
			var textcont = this.docText;
			textcont = textcont.toLowerCase();
			CompareContent = CompareContent.toLowerCase();
			var multi=CompareContent.split(" ");
			var length=multi.length;
			for(var i=0;i<length;i++){
			var n = textcont.search(multi[i]);
			if(n>=0){
				var newdiv = document.createElement('div');
				newdiv.id = '' + this.docID + '';
				newdiv.innerHTML= '<br><b>' + this.docID + '</b><br>' + this.docText + '';
				document.getElementById('userList').appendChild(newdiv);
			}
			}
        });
    });
};


/* 

Function to select Key Words and save


*/
var ToSave = '';
var ToSaveSplit = ToSave.split("");
var Description = '';


$('#userList').click(function(e){
         s = window.getSelection();
         var range = s.getRangeAt(0);
         var node = s.anchorNode;
         while(range.toString().indexOf(' ') != 0) {                 
            range.setStart(node,(range.startOffset -1));
         }
         range.setStart(node, range.startOffset +1);
         do{
           range.setEnd(node,range.endOffset + 1);

        }while(range.toString().indexOf(' ') == -1 && range.toString().trim() != '');
		var str = range.toString().trim();
		
		//Code to highlight text
		var newNode = document.createElement("span");
		newNode.setAttribute("class", "highlighted");
		range.surroundContents(newNode);
        
        ToSave += str + ' ' ;
		ToSaveSplit = ToSave.split(" ");
		if (ToSaveSplit.length >= 3){
			Description = prompt("Briefly describe relation between " +ToSaveSplit[0]+ " and " +ToSaveSplit[1]+"","");
			addUser();
			ToSave = '';
		
		}
       });


				
// Add data
/*

Function to add data to MongoDb

*/
function addUser(event) {
    //event.preventDefault();


        //compile all user info into one object
        var newUser = {
            'FirstSelection' : '' +ToSaveSplit[0]+ '',
			'SecondSelection' : ''+ToSaveSplit[1]+ '',
			'Description' : ''+Description+''
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
};


/*
Function to ask description
*/



// Delete User
/*
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};*/