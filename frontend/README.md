# FRONTEND OF HANGUL APP 
Các nền tảng mà mình sẽ sử dụng: 
1. HTML thuần
2. Tailwind CSS, Daisy UI
3. JS thuần
4. Phong cách state driven UI




## UI Figma: 
Link tới trang thiết kế: [Hangul app design](https://www.figma.com/design/0VcYiHtWtbULjDc7OJQ2Nh/My-website?node-id=458-2&t=LSoS4yn48nc6NNMJ-0)



## UI tĩnh: 
Làm thôi. 



## UI động: 
Tới bước này thôi, app này không cần api luôn, vì chỉ cần dữ liệu tĩnh có sẵn ở frontend là đủ rồi. 


### State: 
```javascript

const state = {
    appState: "PLAYING" || "PAUSE" || initial: "PAUSE",
    speedMenuOpen: true || false || initial: false, 
    speedOption: "BEGINNER" || "PRACTICE" || "NORMAL" || "FAST" || "SPEED" || "FLASH" || intial: "NORMAL", 
    currentWord: initial: "하나님"
}


const app = {
    state: "PLAYING" || "PAUSE" || initial: "PAUSE"

}



```