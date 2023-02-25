//import of txt to datatable
$(document).ready(function() {
  const fileInput = document.getElementById('fileInput');
  const maxEntriesPerID = 4;
  const idCounter = {};
  const morningShiftTimeinEntry = {};
  const morningShiftTimeoutEntry = {};
  const afternoonShiftTimeinEntry = {};
  const afternoonShiftTimeoutEntry = {};
  
  fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
      // Split the text into rows
      var rows = reader.result.trim().split('\n');
      // Loop rows and add to the DataTable
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i].trim().split(/\s+/);
        var id = row[0];
        var time = row[2];
        var morningShiftTimein = (time >= '08:00:00' && time <= '09:00:00');
        var morningShiftTimeout = (time >= '12:00:00' && time <= '13:00:00');
        var afternoonShiftTimein = (time >= '13:01:00' && time <= '14:00:00');
        var afternoonShiftTimeout = (time >= '17:00:00' && time <= '18:00:00');
        var isMorningLate = (time >= '08:31:00' && time <= '08:45:00');
        var isAfternoonLate = (time >= '13:31:00' && time <= '13:45:00');
        var isMorningAbsent = (time >= '08:46:00' && time <= '12:00:00');
        var isAfternoonAbsent = (time >= '13:46:00' && time <= '16:59:00');
        
        if (!idCounter[id]) {
          idCounter[id] = 0;
        }
        if (idCounter[id] < maxEntriesPerID) {
          if ((morningShiftTimein && !morningShiftTimeinEntry[id]) || (morningShiftTimeout && !morningShiftTimeoutEntry[id]) || (afternoonShiftTimein && !afternoonShiftTimeinEntry[id]) || (afternoonShiftTimeout && !afternoonShiftTimeoutEntry[id])) {
            if (isMorningLate) {
              $('#myTable').DataTable().row.add(row).nodes().to$().addClass('late');
            } else if (isAfternoonLate) {
              $('#myTable').DataTable().row.add(row).nodes().to$().addClass('late');
            } else if (isMorningAbsent || isAfternoonAbsent) {
              $('#myTable').DataTable().row.add(row).nodes().to$().addClass('absent');
            } else {
              $('#myTable').DataTable().row.add(row).draw();
            }
            idCounter[id]++;
            if (morningShiftTimein) {
              morningShiftTimeinEntry[id] = true;
            } else if (morningShiftTimeout) {
              morningShiftTimeoutEntry[id] = true;
            } else if (afternoonShiftTimein) {
              afternoonShiftTimeinEntry[id] = true;
            } else if (afternoonShiftTimeout) {
              afternoonShiftTimeoutEntry[id] = true;
            }
          }
        }
      }
    };
  });
});

//ID search
$(document).ready(function() {
  var table = $('#myTable').DataTable();

  $('input[type="search"]').keyup(function() {
    table.column(0).search($(this).val()).draw();
  });


//Modal
$('.clickable-tr').on('click', 'tr', function () {
  var data = table.row($(this)).data();
  var value = data[0]; 
  var timeIn = data[2];

  // Count instances of value in column 0
  var instance = table.column(0).data().filter(function(id) {
    return id === value;
  }).length;
  console.log("instance "+ instance)
  var hasClassLate = ($('tr').hasClass('late'));
  var hasClassAbsent = ($('tr').hasClass('absent'));
  var absences = 4 - instance;
  console.log(hasClassLate);
  console.log(hasClassAbsent);

  if(instance === 4){
      Swal.fire({
      title: "Employee: " + value,
      html: "No Late or absences",
      icon: 'info'
      });
  }
  if(hasClassLate){
  Swal.fire({
      title: "Employee: " + value,
      html: "Employee has 1 late today",
      icon: 'info'
      });;
  console.log('The table contains rows with the "late" class.');
  }

  if(hasClassAbsent === true){
  Swal.fire({
      title: "Employee: " + value,
      html: "Employee has 1 absent today",
      icon: 'info'
      });;
  }

  if(hasClassLate === true && instance < 4 ){
    Swal.fire({
        title: "Employee: " + value,
        html: "Employee has "+ absences + " missed attendance and 1 late today",
        icon: 'info'
        });;
  }
  else{
    Swal.fire({
      title: "Employee: " + value,
      html: "Employee has "+ absences + " missed attendance today",
      icon: 'info'
      });
  }



  });
});
