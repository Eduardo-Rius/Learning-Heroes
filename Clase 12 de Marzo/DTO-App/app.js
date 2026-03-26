document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Logic ---
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items and views
            navItems.forEach(nav => nav.classList.remove('active'));
            views.forEach(view => view.classList.remove('active'));

            // Add active class to clicked nav item
            item.classList.add('active');

            // Show target view
            const targetViewId = item.getAttribute('data-view');
            const targetView = document.getElementById(`view-${targetViewId}`);
            if (targetView) {
                targetView.classList.add('active');
            }
        });
    });

    // --- Tabs Logic (Compra View) ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Set Active
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });

    // --- Toast Notification Logic (Reservar) ---
    const reserveBtns = document.querySelectorAll('.reserve-btn');
    const toast = document.getElementById('toast');

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    reserveBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('¡Reserva confirmada con éxito!');
        });
    });

    // --- Comments Modal Logic ---
    const fabButton = document.getElementById('fab-comment');
    const modal = document.getElementById('comment-modal');
    const closeBtn = document.getElementById('close-modal');
    const commentForm = document.getElementById('comment-form');
    const commentsFeed = document.getElementById('comments-feed');

    fabButton.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Handle form submission
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('user-name').value;
        const commentInput = document.getElementById('user-comment').value;

        if (nameInput.trim() && commentInput.trim()) {
            addComment(nameInput, commentInput);
            
            // Cleanup
            commentForm.reset();
            modal.classList.remove('active');
            showToast('¡Experiencia compartida!');
        }
    });

    function addComment(name, text) {
        // Create initial letter avatar
        const initial = name.charAt(0).toUpperCase();

        const card = document.createElement('div');
        card.className = 'comment-card glass-panel';
        
        // Random accent color for Avatar for visual variety
        card.innerHTML = `
            <div class="comment-header">
                <div class="avatar" style="background: var(--accent-gradient)">${initial}</div>
                <div class="user-info">
                    <h4>${name}</h4>
                    <span>Hace un momento</span>
                </div>
            </div>
            <p class="comment-text">${text}</p>
            <div class="comment-actions">
                <button class="action-btn"><span class="material-icons-outlined">favorite_border</span> 0</button>
            </div>
        `;

        // Add to beginning of feed
        commentsFeed.prepend(card);
    }
});
