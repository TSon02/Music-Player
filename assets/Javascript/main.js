/** F8
 * 1. Render songs => OK
 * 2. Play / Pause / Seek => OK
 * 3. CD rotate => OK
 * 4. Next / Previous => OK
 * 5. Show / Hide Playlist => OK
 * 6. Random => OK
 * 7. Next / Repeat when ended => OK
 * 8. Active song => OK
 * 9. Scroll active song into  => OK
 * 10. Play song when click => OK
 * 11. Volumn => OK
 * 12. Change tooltip => OK
 */

const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)
        const music=$(".music")
        const playListL=$(".playlist__list")
        const cdThumb=$(".cd__thumb")
        const cd=$(".cd")
        const songName=$(".song__name")
        const songAuthor=$(".song__author")
        const audio=$("#audio")
        const playBtn=$(".btn-toggle-play")
        const nextBtn=$(".btn-next")
        const prevBtn=$(".btn-prev")
        const randomBtn=$(".btn-random")
        const repeatBtn=$(".btn-repeat")
        const songCurrentTime=$(".timeAudio__current-time")
        const songDuratuon=$(".timeAudio__duration")
        const progressValue=$('.progress__value')
        const progressBar=$(".progress")
        const volume=$(".volume")
        const volumeBar=$(".volume-bar")
        const volumeBarValue=$(".volume-bar__value")
        const favourite=$('.favourite')
        const addF=$(".addF")
        const listMusicBtn=$(".list-music__icon")
        const listMusic=$(".listMusic__container")
        const listItem=$(".playlist__item")
        const closeList=$(".close-list")
        console.log(closeList,listItem,listMusic,listMusicBtn,addF,favourite,volumeBar, volume, progressBar,progressValue,songDuratuon,songCurrentTime,repeatBtn,randomBtn,prevBtn,nextBtn,playListL,cdThumb,songName,songAuthor,audio,playBtn,music,cd)
const app={
    currentIndex : 0,
    isPlaying: false,
    isRandom:false,
    isRepeat:false,
    isHoldProgressBar:false,
    isMute:false,
    isLike:false,
    songs:[
        {
            name:'See You Again',
            singer:'Wiz Khalifa',
            path:'./assets/music/See You Again ft. Charlie Puth [320] - charlie puth - Zing MP3.mp3',
            image:'./assets/img/See You Again.jpg',
        },
    
        {
            name:`We Don't Talk Anymore`,
            singer:'Charlie Puth',
            path:`./assets/music/We Don't Talk Anymore - Charlie Puth, Selena Gomez - we don't talk anymore.mp3`,
            image:`./assets/img/We Don't Talk Anymore.jpeg`,
        },
    
        {
            name:'Little Do You Know',
            singer:'Alex & Sierra',
            path:'./assets/music/Little Do You Know- Alex & Sierra.mp3',
            image:`./assets/img/imgB.jpeg`,
        },
    
        {
            name:'Too Late',
            singer:'Addie Nicole',
            path:'./assets/music/Too Late- OmgLoSteve, Addie Nicole.mp3',
            image:'./assets/img/imgG.jpeg',
        },
    
        {
            name:'Attention',
            singer:'Charlie Puth',
            path:'./assets/music/Attention - Charlie Puth.mp3',
            image:'./assets/img/imgD.jpeg',
        },
    
        {
            name:'Versace',
            singer:'The Same Persons',
            path:'./assets/music/Versace- The same Persons.mp3',
            image:'./assets/img/imgE.jpeg',
        },
    
        {
            name:'Set Fire To The Rain',
            singer:'Rain Adele ft. Vahn',
            path:'./assets/music/Set Fire To The Rain- Adele.mp3',
            image:'./assets/img/imgF.jpeg',
        },
    
        {
            name:'Trap Queen Remix',
            singer:'Adriana Gomez',
            path:'./assets/music/Trap Queen (Eightfold MKJ Remix)- Adriana Gomez, Eightfold MKJ.mp3',
            image:'./assets/img/imgH.jpeg',
        },
    
        {
            name:'Shape of You',
            singer:'Ed Sheeran',
            path:'./assets/music/Shape of You.mp3',
            image:'./assets/img/imgK.jpg',
        },
    
        {
            name:'Rockabye',
            singer:'Clean Bandit',
            path:'./assets/music/Rockabye- Clean Bandit; Sean Paul; Anne-Marie.mp3',
            image:'./assets/img/imgA.jpg',
        },
    ],

    render:function(){
        const htmls=this.songs.map(function(song,index){
            return   `
            <li class="playlist__item ${index===app.currentIndex ? 'active':''}" data-index="${index}">
            <div class="playlist__img">
              <img src="${song.image}" alt="">
            </div>
            <div class="playlist__info">
              <div class="playlist__info-name">${song.name}</div>
              <div class="playlist__info-author">${song.singer}</div>
            </div>
            <div class="music-waves">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="playlist__option">
              <i class="fa-solid fa-ellipsis"></i>
            </div>
          </li>
            `
            
        })
        playListL.innerHTML=htmls.join("")
    },

    defineProperties:function(){
        Object.defineProperty(this,'currentSong',{
            get:function(){
                return this.songs[this.currentIndex]
            }
        })
    },

    timeFormat:function(seconds){
        const date=new Date(seconds * 1000).toISOString().slice(14, 19)
        return date
    },

    loadCurrentSong :function(){
        cdThumb.src=`${this.currentSong.image}`
        songName.textContent=`${this.currentSong.name}`
        songAuthor.textContent=`${this.currentSong.singer}`
        audio.src=`${this.currentSong.path}`
        progressValue.style.width=0
        // audio.play()
    },

    scrollToActiveSong :function(){
        setTimeout(function(){
            $(".playlist__item.active").scrollIntoView({
                behavior:"smooth",
                block:'center',
            })
        },200)
    },

    nextSong :function(){
        this.currentIndex++;
        if(this.currentIndex > this.songs.length-1)
        {
            this.currentIndex = 0
        }
        this.loadCurrentSong()

    },

    prevSong :function(){
        this.currentIndex--
        if(this.currentIndex < 0)
        {
            this.currentIndex = this.songs.length-1
        }
        this.loadCurrentSong()
    },

    randomSong :function(){
        let newIndex
        do{
            newIndex=Math.floor(Math.random()*this.songs.length);
        }
        while(this.currentIndex === newIndex )

        this.currentIndex = newIndex;
        this.loadCurrentSong()
    },  







    handleEvents :function(){
        playBtn.onclick=function(){
            if(app.isPlaying){
                audio.pause()
            }
            else{
                audio.play()    
            }
        }

        
        // xử lý bật tắt nhạc
        audio.onplay=function(){
            app.isPlaying=true
            music.classList.add("playing")
            cdThumbAnimate.play()
        }

        audio.onpause=function(){
            music.classList.remove("playing")
            app.isPlaying=false
            cdThumbAnimate.pause()
        }
        // xử lý quay cd
        const cdThumbAnimate=cdThumb.animate([
            {transform:'rotate(360deg)'}
        ],
        {
            duration:10000,
            iterations:Infinity
        })
        cdThumbAnimate.pause()

        //xử lý next song // previous song

        nextBtn.onclick=function(){
            if(app.isRandom)
            {
                app.randomSong()
            }
            else{
            app.nextSong()
            }
            cdThumbAnimate.cancel()
            if(app.isPlaying){
                audio.play()
            }
            app.render()
            app.scrollToActiveSong()
        }

        prevBtn.onclick=function(){
            if(app.isRandom)
            {
                app.randomSong()
            }
            else{
                app.prevSong()
            }
            cdThumbAnimate.cancel()
            if(app.isPlaying){
                audio.play()
            }
            app.render()
            app.scrollToActiveSong()
        }

        randomBtn.onclick=function(){
            if(app.isRandom)
            {
                app.isRandom = false
                randomBtn.classList.remove("active")
            }
            else{
                app.isRandom = true
                randomBtn.classList.add("active")
            }
        }

        repeatBtn.onclick=function(){
            if(app.isRepeat){
                app.isRepeat = false
                repeatBtn.classList.remove("active")
            }
            else{
                app.isRepeat = true
                repeatBtn.classList.add("active")
            }
        }

        audio.onended=function(){
            if(app.isRepeat)
            {
                audio.play()
            }
            else{
                app.isPlaying = true
                nextBtn.click()
            }
        }

        // xử lý thời gian và thanh tiến trình
        audio.onloadedmetadata=function(){
            songCurrentTime.textContent = app.timeFormat(audio.currentTime.toFixed(2))
            songDuratuon.textContent = app.timeFormat(audio.duration.toFixed(2))
        }
        // xử lý percent của thanh bar
        audio.ontimeupdate=function(){
            songCurrentTime.textContent = app.timeFormat(audio.currentTime.toFixed(2))
            const progressPercent=(audio.currentTime / audio.duration)*100

            progressValue.style.width = progressPercent +'%'
        }

        // xử lý khi tua nhạc
        progressBar.onclick=function(e){
                const width = this.clientWidth
                const clickX =e.offsetX
                console.log(clickX)
                const duration = audio.duration
        
                audio.currentTime=(clickX / width) * duration
        }

        // xử lý thanh volume
        volume.onclick=function() {
            if(app.isMute)
            {
                volumeBarValue.style.width=100 + "%"
                audio.muted=false
                app.isMute = false
                volume.classList.remove("active")
            }
            else{
                volumeBarValue.style.width=0 + "%"
                audio.muted=true
                app.isMute=true
                volume.classList.add("active")
            }
            

        }

        volumeBar.onclick = function(e){
            if(audio.volume === 0){
                volumeBarValue.style.width=0 + "%"
                app.isMute=true
            }
            else{
                if(app.isMute){
                    volume.click()
                }
            }
            console.log(e.offsetX)
            volumeBarValue.style.width=e.offsetX + "px"
            audio.volume = e.offsetX / this.offsetWidth 
        }

        // xử lý ấn space để play / pause
        document.onkeyup = function(e) {
            if(e.which===32){
                playBtn.click()
            }
        }

        // xử lý heart 

        favourite.onclick = function(e) {
            
            console.log(11)
            if(app.isLike)
            {
                app.isLike = false
                favourite.classList.remove("active")
            }
            else{
                app.isLike = true
                favourite.classList.add("active")
                volumeBar.style.height = 6.5 + 'px'
            }
        }

        addF.onclick = function(e) {
            e.stopPropagation()
        }

        // xử lý hiện list song và ẩn list song
        listMusicBtn.onclick = function() {
            listMusic.classList.add("list-open")
        }

        closeList.onclick = function() {
            listMusic.classList.remove("list-open")
        }
        // lắng nghe hành vi click vào list song
        playListL.onclick = function(e) {
            
            const songElement = e.target.closest(".playlist__item:not(.active)")
            if(e.target.closest(".playlist__item:not(.active)") || e.target.closest(".playlist__option")){
                if(songElement){
                    console.log(songElement.dataset.index)
                    app.currentIndex = Number(songElement.dataset.index)
                    app.loadCurrentSong()
                    app.scrollToActiveSong()
                    app.render()
                    audio.play()
                    
                }
                else if(songElement.target(".playlist__option"))
                {
                    console.log(2)
                }
            }
        }
    },


    



    start:function(){
        // Định nghĩa các thuộc tính cho object
        this.defineProperties()

        // Lắng nghe và xử lý các sự kiện DOM event
        this.handleEvents()

        // Tải thông tin bài hát đầu tiên vào UI(giao diện) khi chạy ứng dụng
        this.loadCurrentSong()

        // render playlist
        this.render()
    }
}


app.start()


























































































































































// const songs=[
//     {
//         name:'See You Again',
//         singer:'Wiz Khalifa',
//         path:'E:\Code Front End\Hello\Code Music Player\assets\music\See You Again ft. Charlie Puth [320] - charlie puth - Zing MP3.mp3',
//         image:'E:\Code Front End\Hello\Code Music Player\assets\img\See You Again.jpg',
//     },

//     {
//         name:`We Don't Talk Anymore`,
//         singer:'Charlie Puth',
//         path:`E:\Code Front End\Hello\Code Music Player\assets\music\We Don't Talk Anymore - Charlie Puth, Selena Gomez - we don't talk anymore.mp3`,
//         image:`E:\Code Front End\Hello\Code Music Player\assets\img\We Don't Talk Anymore.jpeg`,
//     },

//     {
//         name:'Little Do You Know',
//         singer:'Alex & Sierra',
//         path:'E:\Code Front End\Hello\Code Music Player\assets\music\Little Do You Know- Alex & Sierra.mp3',
//         image:'E:\Code Front End\Hello\Code Music Player\assets\img\Little Do You Know.jpeg',
//     },

//     {
//         name:'Too Late',
//         singer:'Addie Nicole',
//         path:'E:\Code Front End\Hello\Code Music Player\assets\music\Too Late- OmgLoSteve, Addie Nicole.mp3',
//         image:'E:\Code Front End\Hello\Code Music Player\assets\img\Little Do You Know.jpeg',
//     },

//     {
//         name:'Attention',
//         singer:'Charlie Puth',
//         path:'E:\Code Front End\Hello\Code Music Player\assets\music\Attention - Charlie Puth.mp3',
//         image:'E:\Code Front End\Hello\Code Music Player\assets\img\Little Do You Know.jpeg',
//     },

//     {
//         name:'Versace',
//         singer:'The Same Persons',
//         path:'E:\Code Front End\Hello\Code Music Player\assets\music\Versace- The same Persons.mp3',
//         image:'E:\Code Front End\Hello\Code Music Player\assets\img\Little Do You Know.jpeg',
//     },

//     {
//         name:'Set Fire To The Rain',
//         singer:'Rain Adele ft. Vahn',
//         path:'E:\Code Front End\Hello\Code Music Player\assets\music\Set Fire To The Rain- Adele.mp3',
//         image:'E:\Code Front End\Hello\Code Music Player\assets\img\Little Do You Know.jpeg',
//     },

//     {
//         name:'Trap Queen Remix',
//         singer:'Adriana Gomez',
//         path:'E:\Code Front End\Hello\Code Music Player\assets\music\Trap Queen (Eightfold MKJ Remix)- Adriana Gomez, Eightfold MKJ.mp3',
//         image:'E:\Code Front End\Hello\Code Music Player\assets\img\Little Do You Know.jpeg',
//     },

//     {
//         name:'Shape of You',
//         singer:'Ed Sheeran',
//         path:'E:\Code Front End\Hello\Code Music Player\assets\music\Shape of You.mp3',
//         image:'E:\Code Front End\Hello\Code Music Player\assets\img\Little Do You Know.jpeg',
//     },

//     {
//         name:'Rockabye',
//         singer:'Clean Bandit',
//         path:'E:\Code Front End\Hello\Code Music Player\assets\music\Rockabye- Clean Bandit; Sean Paul; Anne-Marie.mp3',
//         image:'E:\Code Front End\Hello\Code Music Player\assets\img\Little Do You Know.jpeg',
//     },
// ]