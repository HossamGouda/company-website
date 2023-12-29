import '@laylazi/bootstrap-rtl/dist/js/bootstrap.min.js';
import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min';
import '../sass/style.scss';
import '@fortawesome/fontawesome-free/js/all.min';


$(function() {
    $('.thumbnail2').hover(function() {
        $(this).find('.project-category').hide();
        $(this).find('.caption2').slideDown(250);
    },
    function(){
        $(this).find('.caption2').slideUp(250);
        $(this).find('.project-category').show();    
    }
    );

    var pathname = window.location.pathname;//إحضار المسار المتواجدين فيه
    console.log(pathname);
    $('.navbar-nav > li > a[href="'+pathname+'"]').parent().addClass('active');
    
    //إضافة الصنف الفعال للصفحات المتعلقة بصفحة المدونة
    if (pathname == "/blog-details.html" || pathname == "/add-blog.html") {
      $('.navbar-nav > li > a[href="/blog.html"]').parent().addClass('active');
    }

    //إضافة الصنف الفعال للصفحات المتعلقة بصفحة المشروع
    if (pathname == "/project-details.html") {
        $('.navbar-nav > li > a[href="/projects.html"]').parent().addClass('active');
    }
    
    //gallery
    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
      $('#show-previous-image, #show-next-image')
        .show();
      if (counter_max === counter_current) {
        $('#show-next-image')
          .hide();
      } else if (counter_current === 1) {
        $('#show-previous-image')
          .hide();
      }
    }

    function loadGallery(setIDs, setClickAttr) {
      let current_image,
        selector,
        counter = 0;

      $('#show-next-image, #show-previous-image')
        .on('click', function () {
          if ($(this)
            .attr('id') === 'show-previous-image') {
            current_image--;
          } else {
            current_image++;
          }

          selector = $('[data-image-id="' + current_image + '"]');
          updateGallery(selector);
        });

      function updateGallery(selector) {
        let $sel = selector;
        current_image = $sel.data('image-id');
        $('#image-gallery-title')
          .text($sel.data('title'));
        $('#image-gallery-image')
          .attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('image-id'));
      }

      if (setIDs == true) {
        $('[data-image-id]')
          .each(function () {
            counter++;
            $(this)
              .attr('data-image-id', counter);
          });
      }
      $(setClickAttr)
        .on('click', function () {
          updateGallery($(this));
        });
    }
});

var date = new Date();
var year = date.getFullYear();
document.getElementById("date").innerHTML = year;

// Add the following code if you want the name of the file appear on select
$(".custom-file-input").on("change", function() {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});