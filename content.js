let editMode = false;
let expandMode = false; // New mode
let cleaningDisabled = false;
let hiddenSelectors = [];
const STYLE_ID = "cmw-style-block";
const CONTROL_PANEL_ID = "cmw-control-panel";

// --- Initialization ---

// Load settings immediately (performance)
loadHiddenElements();

// Listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "ENABLE_EDIT_MODE") {
        enableEditMode();
    } else if (message.action === "TOGGLE_CLEANING") {
        toggleCleaning();
    } else if (message.action === "TOGGLE_BEFORE_AFTER") {
        toggleBeforeAfter();
    }
});

// --- Core Logic ---

function loadHiddenElements() {
    const domain = location.hostname;
    chrome.storage.local.get([domain], (data) => {
        hiddenSelectors = data[domain] || [];
        applyHiddenStyles();
    });
}

function saveHiddenElements() {
    const domain = location.hostname;
    chrome.storage.local.set({ [domain]: hiddenSelectors });
    applyHiddenStyles();
}

function applyHiddenStyles() {
    let styleEl = document.getElementById(STYLE_ID);
    if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = STYLE_ID;
        document.head.appendChild(styleEl);
    }

    if (hiddenSelectors.length === 0) {
        styleEl.textContent = "";
        return;
    }

    if (cleaningDisabled) {
        // Visual Indicator Mode: Show elements but with red overlay
        const css = hiddenSelectors.join(",\n") + ` { 
            display: block !important; 
            position: relative !important;
            opacity: 0.5 !important;
            outline: 2px dashed red !important;
            pointer-events: none !important;
        }
        ${hiddenSelectors.join(",\n")}::after {
            content: "MASQUÉ";
            position: absolute;
            top: 0;
            left: 0;
            background: red;
            color: white;
            font-size: 10px;
            padding: 2px;
            z-index: 9999;
        }`;
        styleEl.textContent = css;
    } else {
        // Normal Hiding
        const css = hiddenSelectors.join(",\n") + " { display: none !important; }";
        styleEl.textContent = css;
    }
}

function toggleCleaning() {
    cleaningDisabled = !cleaningDisabled;
    applyHiddenStyles();
    if (cleaningDisabled) {
        alert("Mode 'Voir éléments masqués' activé. Les éléments cachés sont en rouge.");
    } else {
        alert("Nettoyage réactivé.");
    }
}

let beforeAfterMode = false;
let beforeAfterInterval = null;

function toggleBeforeAfter() {
    beforeAfterMode = !beforeAfterMode;
    
    if (beforeAfterMode) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'cmw-before-after-overlay';
        overlay.innerHTML = `
            <div class="cmw-ba-label">AVANT</div>
            <div class="cmw-ba-controls">
                <button id="cmw-ba-stop">Arrêter la comparaison</button>
            </div>
        `;
        document.body.appendChild(overlay);
        
        document.getElementById('cmw-ba-stop').addEventListener('click', () => {
            toggleBeforeAfter();
        });
        
        // Toggle every 2 seconds
        let showing = false;
        beforeAfterInterval = setInterval(() => {
            showing = !showing;
            cleaningDisabled = showing;
            applyHiddenStyles();
            
            const label = document.querySelector('.cmw-ba-label');
            if (label) {
                label.textContent = showing ? 'AVANT' : 'APRÈS';
                label.style.backgroundColor = showing ? '#ff0000' : '#00ff00';
            }
        }, 2000);
        
    } else {
        // Stop comparison
        if (beforeAfterInterval) {
            clearInterval(beforeAfterInterval);
            beforeAfterInterval = null;
        }
        
        const overlay = document.getElementById('cmw-before-after-overlay');
        if (overlay) overlay.remove();
        
        // Reset to cleaned state
        cleaningDisabled = false;
        applyHiddenStyles();
    }
}

// --- Edit Mode ---

function enableEditMode() {
    if (editMode) return;
    editMode = true;
    expandMode = false; // Default to hide
    
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("click", handleClick);
    
    showControlPanel();
}

function disableEditMode() {
    editMode = false;
    expandMode = false;
    
    document.removeEventListener("mouseover", handleMouseOver);
    document.removeEventListener("mouseout", handleMouseOut);
    document.removeEventListener("click", handleClick);
    
    document.querySelectorAll(".cmw-highlight").forEach(el => el.classList.remove("cmw-highlight"));
    document.querySelectorAll(".cmw-highlight-expand").forEach(el => el.classList.remove("cmw-highlight-expand"));
    
    const panel = document.getElementById(CONTROL_PANEL_ID);
    if (panel) panel.remove();
}

function showControlPanel() {
    if (document.getElementById(CONTROL_PANEL_ID)) return;

    const panel = document.createElement("div");
    panel.id = CONTROL_PANEL_ID;
    panel.innerHTML = `
        <div class="cmw-panel-header">Mode Édition</div>
        <div class="cmw-mode-switch">
            <button id="cmw-mode-hide" class="active">Masquer</button>
            <button id="cmw-mode-expand">Agrandir</button>
        </div>
        <button id="cmw-stop-btn" class="cmw-stop">Terminer</button>
    `;
    document.body.appendChild(panel);

    document.getElementById("cmw-stop-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        disableEditMode();
    });

    document.getElementById("cmw-mode-hide").addEventListener("click", (e) => {
        e.stopPropagation();
        expandMode = false;
        updatePanelUI();
    });

    document.getElementById("cmw-mode-expand").addEventListener("click", (e) => {
        e.stopPropagation();
        expandMode = true;
        updatePanelUI();
    });
}

function updatePanelUI() {
    const hideBtn = document.getElementById("cmw-mode-hide");
    const expandBtn = document.getElementById("cmw-mode-expand");
    if (expandMode) {
        hideBtn.classList.remove("active");
        expandBtn.classList.add("active");
    } else {
        hideBtn.classList.add("active");
        expandBtn.classList.remove("active");
    }
}

// --- Interaction Handlers ---

function handleMouseOver(e) {
    if (!editMode) return;
    if (e.target.id === CONTROL_PANEL_ID || e.target.closest(`#${CONTROL_PANEL_ID}`)) return;
    
    if (expandMode) {
        e.target.classList.add("cmw-highlight-expand");
    } else {
        e.target.classList.add("cmw-highlight");
    }
}

function handleMouseOut(e) {
    if (!editMode) return;
    e.target.classList.remove("cmw-highlight");
    e.target.classList.remove("cmw-highlight-expand");
}

function handleClick(e) {
    if (!editMode) return;
    if (e.target.id === CONTROL_PANEL_ID || e.target.closest(`#${CONTROL_PANEL_ID}`)) return;

    e.preventDefault();
    e.stopPropagation();

    const target = e.target;
    target.classList.remove("cmw-highlight");
    target.classList.remove("cmw-highlight-expand");

    if (expandMode) {
        // Interactive Expand: User drags to choose size
        startInteractiveExpand(target, e);
    } else {
        // Hide Logic with animation
        target.classList.add('cmw-hiding');
        
        setTimeout(() => {
            const selector = getUniqueSelector(target);
            if (!hiddenSelectors.includes(selector)) {
                hiddenSelectors.push(selector);
                saveHiddenElements();
            }
        }, 400);
    }
}

// Interactive Expand Feature
let expandingElement = null;
let expandStartX = 0;
let expandStartY = 0;
let expandStartScale = 1;
let expandClickHandler = null;

function startInteractiveExpand(element, event) {
    expandingElement = element;
    expandStartX = event.clientX;
    expandStartY = event.clientY;
    expandStartScale = 1;
    
    // Initial styling
    element.style.setProperty('transform-origin', 'center', 'important');
    element.style.setProperty('z-index', '999999', 'important');
    element.style.setProperty('position', 'relative', 'important');
    element.style.setProperty('background', 'white', 'important');
    element.style.setProperty('padding', '20px', 'important');
    element.style.setProperty('border-radius', '8px', 'important');
    element.style.setProperty('box-shadow', '0 10px 40px rgba(0,0,0,0.3)', 'important');
    element.style.setProperty('transition', 'transform 0.1s ease-out', 'important');
    element.classList.add('cmw-expanded');
    
    // Show instruction overlay
    const overlay = document.createElement('div');
    overlay.id = 'cmw-expand-overlay';
    overlay.innerHTML = `
        <div class="cmw-expand-instruction">
            Déplacez la souris ↑↓
            <br>
            <span style="font-size: 1.2em; font-weight: 900;">100%</span>
        </div>
    `;
    document.body.appendChild(overlay);
    
    // Add mouse move listener
    document.addEventListener('mousemove', handleExpandDrag);
    
    // Add click listener after a short delay to prevent immediate trigger
    setTimeout(() => {
        expandClickHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            finishExpand();
        };
        document.addEventListener('click', expandClickHandler, true);
    }, 100);
}

function handleExpandDrag(e) {
    if (!expandingElement) return;
    
    // Calculate scale based on vertical mouse movement
    const deltaY = expandStartY - e.clientY; // Moving up = positive = bigger
    const scale = Math.max(0.5, Math.min(3, 1 + (deltaY / 200))); // Range: 0.5x to 3x
    
    expandStartScale = scale;
    expandingElement.style.setProperty('transform', `scale(${scale})`, 'important');
    
    // Update instruction with current scale
    const instruction = document.querySelector('.cmw-expand-instruction');
    if (instruction) {
        instruction.innerHTML = `
            Déplacez la souris ↑↓
            <br>
            <span style="font-size: 1.2em; font-weight: 900;">${Math.round(scale * 100)}%</span>
        `;
    }
}

function finishExpand() {
    document.removeEventListener('mousemove', handleExpandDrag);
    if (expandClickHandler) {
        document.removeEventListener('click', expandClickHandler, true);
        expandClickHandler = null;
    }
    
    // Remove overlay
    const overlay = document.getElementById('cmw-expand-overlay');
    if (overlay) overlay.remove();
    
    // Apply final scale with smooth animation
    if (expandingElement) {
        expandingElement.style.setProperty('transition', 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)', 'important');
        setTimeout(() => {
            if (expandingElement) {
                expandingElement.style.setProperty('transition', '', 'important');
            }
        }, 300);
    }
    
    expandingElement = null;
}

// --- Selector Generation ---

function getUniqueSelector(el) {
    if (el.id && !/\d{5,}/.test(el.id)) {
        return "#" + CSS.escape(el.id);
    }
    
    let path = [];
    while (el.nodeType === Node.ELEMENT_NODE) {
        let selector = el.nodeName.toLowerCase();
        if (el.id && !/\d{5,}/.test(el.id)) {
            selector = "#" + CSS.escape(el.id);
            path.unshift(selector);
            break;
        } else {
            let sibling = el;
            let nth = 1;
            while (sibling = sibling.previousElementSibling) {
                if (sibling.nodeName.toLowerCase() == selector) nth++;
            }
            if (nth != 1) selector += ":nth-of-type(" + nth + ")";
        }
        path.unshift(selector);
        el = el.parentNode;
    }
    return path.join(" > ");
}
