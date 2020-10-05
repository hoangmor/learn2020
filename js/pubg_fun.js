document.addEventListener('mousemove', function(event){
    var body = document.querySelector('body');
    var bullte = document.createElement('span'); 
    var x = event.offsetX;
    var y = event.offsetY;
    bullte.style.left = x+'px';
    bullte.style.top = y+'px';
    body.appendChild(bullte);
    var sound = document.getElementById('sound');
    sound.play();
});