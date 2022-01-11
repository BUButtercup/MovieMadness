$(document).foundation()

// dropdown
// $('.dropdown-trigger').dropdown();

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var options = {
        dropdownOptions: {
            alignment: 'bottom',
            hover: false,
            coverTrigger: false,
            closeOnClick: true
        }
    }
    var instances = M.Dropdown.init(elems, options);
  });


