<html> 
<head>
  <!-- Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700">
  <!-- Icons -->
  <link rel="stylesheet" href="assets/vendor/nucleo/css/nucleo.css" type="text/css">
  <link rel="stylesheet" href="assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" type="text/css">
  <link rel="stylesheet" href="css.css">
  <link rel="stylesheet" href="assets/css/argon.css?v=1.1.0" type="text/css">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.22/css/jquery.dataTables.css">
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.js"></script>
</head>
<body>
<div class="header bg-primary pb-6">
  <div class="container-fluid">
    <div class="header-body">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Biometrics Data Assessment</h6>
        </div>
        <div class="col-lg-6 col-5 text-right">
        </div>
      </div>
    </div>
  </div>
</div>	
<div class="main-content">	
	<div class="container-fluid mt--6">
		<div class="row">
			<div class="col">
		      	<div class="card mb-4">
		            <div class="card ">
		              <div class="card-body">
		              	<form action="index.php" method="post" enctype="multipart/form-data">
							<input type="file" name="fileInput" id="fileInput">
						</form>
		              </div>
			            <table id="myTable" class="table">
						  <thead>
						    <tr>
						      <th>ID</th>
						      <th>Date</th>
						      <th>Time</th>
						      <th>S</th>
						      <th>S</th>
						      <th>S</th>
						    </tr>
						  </thead>
						  <tbody>
						  </tbody>
						</table>
		            </div>
		        </div>
		    </div>
	    </div>
	</div>
</div>

<script src="js.js"></script>
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/modernizr.min.js"></script>
<script src="js/jquery.slimscroll.js"></script>
<script src="js/waves.js"></script>
<script src="js/jquery.nicescroll.js"></script>
<script src="js/jquery.scrollTo.min.js"></script>
</body>


</html>