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



$(document).ready(function() {
  var table = $('#myTable').DataTable();

  $('input[type="search"]').keyup(function() {
    table.column(0).search($(this).val()).draw();
  });
});


// $('.clickable-tr').click(function() {
//   swal("Testing");
// });

$('.clickable-tr').on('click', 'tr', function () {
    var table = $('#myTable').DataTable();
    var data = table.row($(this)).data();
    var value = data[0]; 
    var timeIn = data[2];
Swal.fire(
  "Employee: ".concat(value),
  "Time: ".concat(timeIn),
  'info'
);
});


