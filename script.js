// Boot Sequence
window.onload = function() {
    setTimeout(() => {
        document.getElementById('boot-screen').style.display = 'none';
        document.getElementById('desktop').style.display = 'block';
    }, 2500); // 2.5s boot time
};

// Window Management
function openWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'block';
    // Small delay to allow CSS transition to catch the "display: block" change
    setTimeout(() => {
        win.classList.add('open');
    }, 10);
}

function closeWindow(id) {
    const win = document.getElementById(id);
    win.classList.remove('open');
    setTimeout(() => {
        win.style.display = 'none';
    }, 200); // Wait for animation
}

// Draggable Windows (Simple implementation)
document.querySelectorAll('.title-bar').forEach(bar => {
    bar.addEventListener('mousedown', function(e) {
        const windowDiv = bar.parentElement;
        let shiftX = e.clientX - windowDiv.getBoundingClientRect().left;
        let shiftY = e.clientY - windowDiv.getBoundingClientRect().top;

        // Reset transform to allow absolute positioning drag
        windowDiv.style.transform = 'none'; 
        
        function moveAt(pageX, pageY) {
            windowDiv.style.left = pageX - shiftX + 'px';
            windowDiv.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        bar.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            bar.onmouseup = null;
        };
    });
});
