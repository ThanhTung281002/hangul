console.log("main.js loaded"); 



const DOM_LOG = "                   0. DOM:"; 
const API_FLOW_LOG = "                  1. API FLOW:"; 
const RENDER_LOG = "            2. RENDER:"; 
const CONTROLLER_LOG = "        3. CONTROLLER:"
const EVENT_HANDLER_LOG = "   4. EVENT HANDLER:"; 
const INIT_LOG = "5. INIT:";









// ============= 0. STATE ===============
const state = {
    appState: "PAUSE", 
    speedMenuOpen: false, 
    speedOption: "PRACTICE", 
    currentWord: "성자"
}







// ============== 1. RENDER =============
function render() {
    console.log(`${RENDER_LOG} vào hàm render state với state: ${JSON.stringify(state, null, 2)}`); 

    renderAppState(); 
    renderSpeedMenuOpen(); 
    renderSpeedOption(); 
    renderCurrentWord(); 
}


let lastAppState = "PAUSE"; 
let iconOutTime = 700; 


function renderAppState() {
    console.log(`${RENDER_LOG}  1. vào hàm render app state: ${state.appState}`); 

    if (lastAppState !== state.appState) {
        if (state.appState === "PLAYING") {
            const playIcon = document.querySelector("#play-icon"); 

            playIcon.classList.remove("hidden"); 
            
            setTimeout(() => {
                playIcon.classList.add("hidden"); 
            }, iconOutTime); 

        } else if (state.appState === "PAUSE") {
            const pauseIcon = document.querySelector("#pause-icon"); 

            pauseIcon.classList.remove("hidden"); 
            
            setTimeout(() => {
                pauseIcon.classList.add("hidden"); 
            }, iconOutTime); 

        }


        lastAppState = state.appState; 
    }
}


function renderSpeedMenuOpen() {
    console.log(`${RENDER_LOG}  2. vào hàm render speed menu open: ${state.speedMenuOpen}`); 

    const overlay = document.querySelector("#overlay"); 
    const speedMenu = document.querySelector(".speed-option-menu"); 


    if (state.speedMenuOpen === true) {
        overlay.classList.remove("hidden"); 
        speedMenu.classList.remove("hidden"); 

    } else if (state.speedMenuOpen === false) {
        overlay.classList.add("hidden"); 
        speedMenu.classList.add("hidden"); 

    }
}


function renderSpeedOption() {
    console.log(`${RENDER_LOG}  3. vào hàm render speed option: ${state.speedOption}`); 

    const icon = document.querySelector(".speed-select .icon"); 
    const description = document.querySelector(".speed-select .description"); 

    switch (state.speedOption) {
        case "BEGINNER": 
            icon.textContent = "🐢"; 
            description.textContent = "Beginner - 5s";
            break; 
        
        case "PRACTICE": 
            icon.textContent = "🚶‍♀️"; 
            description.textContent = "Practice - 3s";
            break; 
        
        case "FAST": 
            icon.textContent = "🚴"; 
            description.textContent = "Fast - 1.5s";
            break; 
        
        case "SPEED": 
            icon.textContent = "🚀"; 
            description.textContent = "Speed - 1s";
            break; 
        
        case "FLASH": 
            icon.textContent = "⚡"; 
            description.textContent = "Flash - 0.5s";
            break; 
        
        default: 
            icon.textContent = "🏃‍♂️"; 
            description.textContent = "Normal - 2s";
            break; 
    }
}


function renderCurrentWord() {
    console.log(`${RENDER_LOG}  4. vào hàm render current word: ${state.currentWord}`); 

    const currentWord = document.querySelector("#current-word"); 

    currentWord.textContent = state.currentWord; 
}









// =========== 4. EVENT HANDLER ===========
document.addEventListener("click", () => {
    console.log(`${EVENT_HANDLER_LOG} sự kiện click vào document`); 

    if (state.appState === "PLAYING") {
        state.appState = "PAUSE"; 

    } else if (state.appState === "PAUSE") {
        state.appState = "PLAYING"; 

    }

    render(); 
}); 











// ============ 5. INIT ============
(() => {
    console.log(`${INIT_LOG} init app`); 

    render(); 
})(); 