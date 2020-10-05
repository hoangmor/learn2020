window.addEventListener('scroll', function(){
    var header = document.querySelector("header");
    // alert(window.scrollY);
    header.classList.toggle('sticky', window.scrollY > 0);
});