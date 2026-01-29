// Boot Sequence
window.onload = function() {
    setTimeout(() => {
        const boot = document.getElementById('boot-screen');
        boot.style.opacity = '0';
        setTimeout(() => boot.style.display = 'none', 500);
        document.getElementById('desktop').style.display = 'block';
    }, 2000);
};

// Window Management
let zIndexCounter = 100;

function openWindow(id) {
    const win = document.getElementById(id);
    if (win.style.display !== 'flex') {
        // Reset position if it was closed (optional, keeps it center)
        // win.style.top = '50%'; win.style.left = '50%'; 
        win.style.display = 'flex';
        
        // Small delay to allow CSS transition
        setTimeout(() => win.classList.add('active'), 10);
    }
    focusWindow(win);
}

function closeWindow(id) {
    const win = document.getElementById(id);
    win.classList.remove('active');
    setTimeout(() => {
        win.style.display = 'none';
    }, 200);
}

function focusWindow(win) {
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;
}

// Dragging Logic
document.querySelectorAll('.title-bar').forEach(bar => {
    bar.addEventListener('mousedown', function(e) {
        const win = bar.parentElement;
        focusWindow(win); // Bring to front on drag start
        
        let shiftX = e.clientX - win.getBoundingClientRect().left;
        let shiftY = e.clientY - win.getBoundingClientRect().top;
        
        // Switch to absolute dragging mode
        win.classList.add('dragging');
        
        function moveAt(pageX, pageY) {
            win.style.left = pageX - shiftX + 'px';
            win.style.top = pageY - shiftY + 'px';
            win.style.transform = 'none'; // Disable center transform during drag
        }
        
        // Move once to snap to cursor immediately
        moveAt(e.pageX, e.pageY);

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        bar.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            bar.onmouseup = null;
            win.classList.remove('dragging');
        };
    });
});
