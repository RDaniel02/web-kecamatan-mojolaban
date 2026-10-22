// Fungsi buka/tutup accordion gaya borderless
function toggleAccordion(headerElement) {
    const item = headerElement.parentElement;
    item.classList.toggle('open');
}

// Fungsi pergantian tab
function switchTab(evt, targetId) {
    const container = evt.currentTarget.closest('.tab-container') || document;
    
    // Non-aktifkan semua tombol tab dalam grup
    const buttons = container.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Non-aktifkan semua panel tab dalam grup
    const panels = container.querySelectorAll('.tab-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    // Aktifkan tombol yang diklik dan target panel
    evt.currentTarget.classList.add('active');
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}
