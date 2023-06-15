let wordsnorm=[
    "kedi", "araba", "yemek", "pilot", "saat", "kalem", "kitap", "insan", "bilgi", "telefon", "masa",
    "para", "bahce", "kopek", "avukat", "canta", "daha", "kalmak", "pantolon", "egitim", "seker",
    "televizyon", "resim", "sapka", "havlu", "yorgan", "bardak", "kavun", "mayonez", "sabun", "mantar",
    "nane", "pasta", "silgi", "tabak", "eldiven", "fal", "uzun", "cati", "manti", "otobus","adam","akil",
    "ara","arti","aski","atis","ayak","bakis","baris","baska","bekle","belki","benim","beyaz","bilgi","biraz",
    "birlik", "bize", "buca", "bunlar", "burada", "burun", "bolge", "calis", "camasir", "cevre", "cikmak", 
    "davet", "deniz", "dert", "devam", "deger", "dikkat", "dilim","isim", "cizgi", "firca", "hediye",
    "diger", "dogru", "doktor", "dolu", "dost", "duvar", "dunya", "dusun", "eden", "ediyor", "egemen", 
    "ekip","emin","eniyi","eski","evet","farkli","fatura","filiz","gelis","gelmek","geri","gibi","gizli",
    "gokyuzu", "gonder", "gormek", "goster", "guzel", "hakli", "halde", "hava", "hayat", "hedef", "hemsire",
    "herhangi","hizmet","iade","ihbar","ikinci","ilgili","istek","iyi","izmir","jandarma","kabul","kadin",
    "kapi","kardes","kaybetmek","kazanmak","kelime","kemal","kesfetmek","kilo","kitap","konusmak",
    "korku","kotu","kredi","kutu","kuvvet","labirent","lazim","mahalle","makine","maksat","mal","mantik",
    "matematik","meclis","medya","mekan","mesgul","meyve","millet","misafir","muhasebe","mutlu",
    "mudur","musaade","muzik","nasil","nefes","nese","neden","nerede","neyse","nihayet","nispet","numara",
    "kadar","oda","olmak","sokak", "hastane", "yuzme", "konser", "gece", "gitar", "bahar", "yazilim", "kahve",
    "gunes", "kayak", "deniz", "sarap", "kare", "hayvan", "portakal", "balik", "evlilik", "gozluk", "arabasi",
    "defter", "kombi", "sampuan", "kazak", "kaplumbaga", "marul", "dudak", "kayisi", "yorgan", "kilim"
];
let kelimelerdiv= document.getElementById("kelimeler")
let activeworddiv= document.getElementById("active-word-div")
let innerword= document.getElementById("innerword")
let temel= document.getElementById("temel")
let timerp= document.getElementById("timer")
let wordsmin= document.getElementById("wordsmin")
let wrongsp= document.getElementById("wrongs")
let clickedkey= document.getElementById("clickedkey")
let errorrate= document.getElementById("errorrate")
let tryagain= document.getElementById("tryagain")
let sktimer= document.getElementById("sktimer")
let skwordsmin= document.getElementById("skwordsmin")
let skwrongs= document.getElementById("skwrongs")
let skerrorrate= document.getElementById("skerrorrate")
let reset= document.getElementById("reset")
let reset1= document.getElementById("reset1")
let closesetting= document.getElementById("closesetting")
let setting= document.getElementById("settings")
let opensettings= document.getElementById("opensettings")
let selectedyime = document.getElementById("times");
let turkce = document.getElementById("turkce");
let english = document.getElementById("english");
let tureng = document.getElementById("tureng");
let girilenkelime=[]
let innerWord = [];
let dks=0;
let timer =60;
let words = [...wordsnorm]; // Dizi kopyası
let girilenharf=[]
let kaydir=0
let wrongs=0
let basla =  false;
let rate=0;
let surebelirle=60;

words.sort(() => Math.random() - 0.5);

   let kelimeler = words.forEach((word,index)=>{
   kelimelerdiv.innerHTML+=`<div class="word" id="word${index}"></div>`
    for (let i = 0; i < word.length; i++) {
       let harf = word[i]; 
       document.getElementById(`word${index}`).innerHTML += `<span id="word${index}-harf${i}" >${harf}</span>`
    }}
)
document.getElementById(`word0`).classList.add("active-word")


selectedyime.addEventListener("change",()=>{
   if(selectedyime.value==="dkk1"){
       timer=60;
       timerp.innerHTML=timer
   }
   else if(selectedyime.value==="dkk2"){
       timer=120;
       timerp.innerHTML=timer
   }
   else if(selectedyime.value==="dkk5"){
       timer=300;
       timerp.innerHTML=timer
   }
   else if(selectedyime.value==="dkk10"){
       timer=600;
       timerp.innerHTML=timer
   }
})


innerword.oninput=()=>{
    document.addEventListener("keydown",(e)=>{
    if (e.key===" ") {
        e.preventDefault()
        if(innerword.value){
            let girilen = innerword.value.trim()
            innerword.value="";
            girilenkelime.push(innerword.value.trim())
            console.log(girilenkelime)

            let index= girilenkelime.length-1;
            if (girilen===words[index]) {
                document.getElementById(`word${index}`).style.color="green";
                document.getElementById(`word${index}`).style.opacity="50%";
                document.getElementById(`word${index+1}`).classList.add("active-word");
                let wordwidth=document.getElementById(`word${index+1}`).getBoundingClientRect().width;
                kaydir=kaydir+ wordwidth
                console.log("word"+index +" "+wordwidth+ " " + kaydir + " kaydırıldı")
                kelimelerdiv.style.transform=`translateX(-${kaydir}px)`
                // document.getElementById(`word${index}`).remove();
                document.getElementById(`word${index}`).classList.remove("active-word");
                dks= dks+1
                console.log("+1dks");
            }
            else{
                document.getElementById(`word${index}`).style.color="red"
                document.getElementById(`word${index}`).style.opacity="50%";
                document.getElementById(`word${index+1}`).classList.add("active-word");
                let wordwidth=document.getElementById(`word${index+1}`).getBoundingClientRect().width;
                kaydir=kaydir+ wordwidth

                console.log("word"+index +" "+wordwidth+ " " + kaydir + " kaydırıldı")
                kelimelerdiv.style.transform=`translateX(-${kaydir}px)`
                document.getElementById(`word${index}`).classList.remove("active-word");
                wrongs++
            }  
            let activeword= girilenkelime[0]
            console.log(activeword)
        }
    }
   })
}

let width=document.getElementById(`word0`).getBoundingClientRect().width;
kelimelerdiv.style.transform=`translateX(-${width/2}px)`

innerword.onclick=()=>{
  let inter= setInterval(() => {
       timer--
       timerp.innerHTML=timer
       wordsmin.innerHTML=dks
       wrongsp.innerHTML=wrongs
       rate = dks+wrongs;
       rate = (wrongs/rate)*100
       errorrate.innerHTML= `${Math.floor(rate)}%` 

       if(timer==0){

           sktimer.innerHTML=surebelirle;
           skwordsmin.innerHTML=dks;
           skwrongs.innerHTML=wrongs;
           skerrorrate.innerHTML=`${ Math.floor(rate)}%`;
           clearInterval(inter)
           skor.classList.add("viewmode")
           temel.classList.add("deactive")
           console.log(sondegerler)
       }
   }, 1000);
}

document.addEventListener("keydown",(e)=>{
   clickedkey.innerHTML=e.key
   if(e.key==" "){
       clickedkey.innerHTML="space"
   }
})

reset.onclick=()=>{
   location.reload()
}
reset1.onclick=()=>{
   location.reload()
}
closesetting.onclick=()=>{
   setting.style.transform="translateX(-450px)"
}
opensettings.onclick=()=>{
   setting.style.transform="translateX(0)"
}
