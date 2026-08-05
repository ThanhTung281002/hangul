console.log("main.js loaded"); 



import { fakeWords } from "./services/fakeServices.js";






const DOM_LOG = "                   0. DOM:"; 
const API_FLOW_LOG = "                  1. API FLOW:"; 
const RENDER_LOG = "            2. RENDER:"; 
const CONTROLLER_LOG = "        3. CONTROLLER:"
const EVENT_HANDLER_LOG = "   4. EVENT HANDLER:"; 
const INIT_LOG = "5. INIT:";









// ============= 0. STATE ===============
const state = {
    appState: "PLAYING", 
    speedMenuOpen: false, 
    speedOption: "NORMAL", 
    currentWord: "성자"
}



const app = {
    state: "PLAYING", 
    intervalId: null, 
    intervalTime: 2000, 
    words: null, 
    indexWord: 0
}







// ============== 2. RENDER =============
function render() {
    console.log(`${RENDER_LOG} vào hàm render state với state: ${JSON.stringify(state, null, 2)}`); 

    renderAppState(); 
    renderSpeedMenuOpen(); 
    renderSpeedOption(); 
    renderCurrentWord(); 
}


let lastAppState = "PLAYING"; 
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
            description.textContent = "Beginner - 10s";
            break; 
        
        case "PRACTICE": 
            icon.textContent = "🚶‍♀️"; 
            description.textContent = "Practice - 6s";
            break; 
        
        case "FAST": 
            icon.textContent = "🚴"; 
            description.textContent = "Fast - 3s";
            break; 
        
        case "SPEED": 
            icon.textContent = "🚀"; 
            description.textContent = "Speed - 2s";
            break; 
        
        case "FLASH": 
            icon.textContent = "⚡"; 
            description.textContent = "Flash - 1s";
            break; 
        
        default: 
            icon.textContent = "🏃‍♂️"; 
            description.textContent = "Normal - 4s";
            break; 
    }
}


function renderCurrentWord() {
    console.log(`${RENDER_LOG}  4. vào hàm render current word: ${state.currentWord}`); 

    const currentWord = document.querySelector("#current-word"); 

    currentWord.textContent = state.currentWord; 
}






















// ============= 3. CONTROLLER ==============
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}



function shuffle(array) {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}





// làm vài việc trước đã 
app.words = shuffle(fakeWords); 
app.indexWord = 0; 

async function appRun() {
    console.log(`${CONTROLLER_LOG}  9. vào hàm run app`); 

    if (app.state === "PLAYING") {
        // cấu hình vài cái trước khi chạy
        state.appState = "PLAYING"; 
        switch (state.speedOption) {
            case "BEGINNER": 
                app.intervalTime = 10000; 
                break; 
            
            case "PRACTICE": 
                app.intervalTime = 6000; 
                break; 
            
            case "FAST": 
                app.intervalTime = 3000; 
                break; 
            
            case "SPEED": 
                app.intervalTime = 2000; 
                break; 
            
            case "FLASH": 
                app.intervalTime = 1000; 
                break; 
            
            default: 
                app.intervalTime = 4000; 
                break; 
        }


        state.currentWord = app.words[app.indexWord].content; 
        render(); 

        // chờ một lát để icon play ẩn đi rồi bắt đầu chạy interval
        delay(iconOutTime); 

        app.intervalId = setInterval(() => {
            // tăng indexWord
            app.indexWord++; 

            if (app.indexWord >= app.words.length) {
                app.words = shuffle(fakeWords); 
                app.indexWord = 0; 
            }

            state.currentWord = app.words[app.indexWord].content; 
            render(); 
        }, app.intervalTime); 




    } else if (app.state === "PAUSE") {
        // dừng việc chạy đó lại
        clearInterval(app.intervalId); 

        state.appState = "PAUSE"; 
        render(); 
    }
}












async function handle_click_word_card() {
    console.log(`${CONTROLLER_LOG} hàm xử lí sự kiện click vào thẻ từ Hangul`); 

    if (app.state === "PLAYING") {
        app.state = "PAUSE"; 
        await appRun(); 

    } else if (app.state === "PAUSE") {
        app.state = "PLAYING";
        await appRun(); 

    }
}





async function handle_click_speed_select() {
    console.log(`${CONTROLLER_LOG} hàm xử lí sự kiện click vào nút chọn tốc độ`); 

    // nếu click vào đây mà app đang chạy thì dừng app và mở menu 
    // nếu app dừng rồi thì bật mở tương ứng thôi
    if (app.state === "PLAYING") {
        app.state = "PAUSE"; 
        state.speedMenuOpen = true; 
        appRun(); 
    } else if (app.state === "PAUSE") {
        if (state.speedMenuOpen === true) {
            state.speedMenuOpen = false; 
            render(); 

        } else if (state.speedMenuOpen === false) {
            state.speedMenuOpen = true; 
            render(); 
        }
    }
}






async function handle_click_option(option) {
    console.log(`${CONTROLLER_LOG} vào hàm xử lí chọn chế độ: ${option}`); 

    state.speedOption = option; 
    state.speedMenuOpen = false; 
    render(); 
}
















// =========== 4. EVENT HANDLER ===========
document.addEventListener("click", async (e) => {
    console.log(`${EVENT_HANDLER_LOG} sự kiện click vào document`); 

    const clickEl = e.target.closest(".word-card, .speed-select, .option"); 

    if (!clickEl) return; 


    if (clickEl.matches(".word-card")) {
        console.log(`${EVENT_HANDLER_LOG}   1. sự kiện click vào thẻ từ Hangul`); 
        await handle_click_word_card();

    } else if (clickEl.matches(".speed-select")) {
        console.log(`${EVENT_HANDLER_LOG}   1. sự kiện click vào nút chọn tốc độ`); 
        await handle_click_speed_select(); 

    } else if (clickEl.matches(".option")) {
        const option = clickEl.dataset.option; 
        console.log(`${EVENT_HANDLER_LOG}   1. sự kiện click vào nút chọn tốc độ: ${option}`); 

        await handle_click_option(option); 
    }

}); 
















// ============ 5. INIT ============
(async () => {
    console.log(`${INIT_LOG} init app`); 

    await appRun(); 
})(); 