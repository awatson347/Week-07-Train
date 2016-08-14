

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC48DI2wAFGxVR4KK7-3-xo-xj8x3GtuHg",
    authDomain: "traindatabase-a5e7e.firebaseapp.com",
    databaseURL: "https://traindatabase-a5e7e.firebaseio.com",
    storageBucket: "traindatabase-a5e7e.appspot.com",
  };
  firebase.initializeApp(config);

    

var database = firebase.database();

// Capture Button Click
$("#addEmpButton").on("click", function() {

	// Grabs user input
	var empName = $('#empNameInput').val().trim();
	var Dest2 = $('#Dest').val().trim();
	var empStartDate = moment($('#startDateInput').val().trim(), "MM/DD/YY").format("X");
	var freq2 = $('#freq').val().trim();

	console.log("Submit button pushed!");

	// Push the Add Employee data to FB db
	database.ref().push({
		name: empName,
		role: Dest2,
		startDate: empStartDate,
		monthlyRate: freq2,
	});

	// Alert
	alert("Employee added!");

	// Clears the input text boxes
	$('#empNameInput').val("");
	$('#Dest').val("");
	$('#startDateInput').val("");
	$('#freq').val("");

	// Don't refresh the page!
	return false;
});


// Watches Firebase and runs this upon initial page load + when an employee is added
database.ref().on("child_added", function(snapshot) {

	// Store the child's snapshot data in local variables to make life easier
	var empName = snapshot.val().name;
	var Dest2 = snapshot.val().role;
	var empStartDate = snapshot.val().startDate;
	var freq2 = snapshot.val().monthlyRate;

	// Log everything that's coming out of snapshot
	console.log(empName);
	console.log(Dest2);
	console.log(empStartDate);
	console.log(freq2);

	// Convert the UNIX Start Date back to the American date format for readability
	var empStartAmerican = moment.unix(empStartDate).format("MM/DD/YY");

	// Calculate monthsWorked for each employee
	var monthsWorked = moment().diff(moment.unix(empStartDate, "X"), "months");

	// Calculates totalBilled for each employee
	var totalBilled = monthsWorked * freq2;
	console.log("Total Billed: $" + totalBilled);

	// Display each employee's data in the table
	$("#employeeTable > tbody").append("<tr><td>" + empName + "</td><td>" 
		+ Dest2 + "</td><td>"
		+ freq2 + "</td><td>" 
		+ empStartAmerican + "</td><td>"
		 
		+ monthsWorked + "</td><td>"
		+ totalBilled + "</td></tr>");


// Handle the errors
}, function(errorObject){

	console.log("Errors handled: " + errorObject.code)
})