$(document).ready(function() {
  // Listen for file input changes
  const fileInput = document.getElementById('fileInput');
  fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
      // Split the text into rows
      var rows = reader.result.trim().split('\n');
      // Loop over the rows and add them to the DataTable
      for (var i = 0; i < rows.length; i++) {
    var row = rows[i].trim().split(/\s+/);
    var time = row[2];
    var isMorningLate = (time >= '08:31:00' && time <= '08:45:00');
    var isAfternoonLate = (time >= '13:31:00' && time <= '13:45:00');
    var isMorningAbsent = (time >= '08:46:00' && time <= '12:00:00');
    var isAfternoonAbsent = (time >= '13:46:00' && time <= '16:59:00');
    
    if (isMorningLate) {
      $('#myTable').DataTable().row.add(row).nodes().to$().addClass('late');
    } else if (isAfternoonLate) {
      $('#myTable').DataTable().row.add(row).nodes().to$().addClass('late');
    } else if (isMorningAbsent || isAfternoonAbsent) {
      $('#myTable').DataTable().row.add(row).nodes().to$().addClass('absent');
    } else {
      $('#myTable').DataTable().row.add(row).draw();
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
