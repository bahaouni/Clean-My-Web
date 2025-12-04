document.addEventListener('DOMContentLoaded', () => {
    loadSites();

    document.getElementById('resetAllBtn').addEventListener('click', () => {
        if (confirm("Êtes-vous sûr de vouloir tout réinitialiser ? Cela effacera toutes vos configurations.")) {
            chrome.storage.local.clear(() => {
                loadSites();
                alert("Toutes les données ont été effacées.");
            });
        }
    });
});

function loadSites() {
    const list = document.getElementById('sitesList');
    list.innerHTML = '';

    chrome.storage.local.get(null, (items) => {
        const domains = Object.keys(items);
        
        if (domains.length === 0) {
            list.innerHTML = '<div class="empty-state">Aucun site nettoyé pour le moment.</div>';
            return;
        }

        domains.forEach(domain => {
            const selectors = items[domain];
            if (!Array.isArray(selectors)) return; // Skip non-array items if any

            const item = document.createElement('div');
            item.className = 'site-item';
            
            item.innerHTML = `
                <div class="site-info">
                    <span class="site-domain">${domain}</span>
                    <span class="site-count">${selectors.length} élément(s) masqué(s)</span>
                </div>
                <button class="delete-btn" data-domain="${domain}">Réinitialiser</button>
            `;

            list.appendChild(item);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const domain = e.target.dataset.domain;
                chrome.storage.local.remove(domain, () => {
                    loadSites();
                });
            });
        });
    });
}
