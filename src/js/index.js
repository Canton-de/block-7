import '../scss/style.scss';
import '../scss/media-medium.scss';
import '../scss/media-bold.scss';

console.log('123')



const readMore = (text,btn,textPos,arrowsPos,hideText,readMoreText) =>{
    let switcher = false;
    let textHeight
    return () =>{
        if(!switcher){
            textHeight = text.offsetHeight;
            text.style.height="auto";
            btn.children[textPos].innerHTML = hideText
            btn.children[arrowsPos].classList.add('arrows-to-top');
        }else{
            if(window.innerHeight<768){
                text.style.height='90px'
            }else {
                text.style.height='160px'
            }
            text.style.height=textHeight+'px';
            btn.children[textPos].innerHTML = readMoreText
            btn.children[arrowsPos].classList.remove('arrows-to-top')
        }
        switcher = !switcher
    }
}

const makeMenuItemsHover = ()=>{
    const menuItems = document.querySelectorAll('.menu__list-item:not(.active)');
    menuItems.forEach((el)=>{
        el.addEventListener('mouseover',()=>{
            el.classList.add('active-item')
        })
        el.addEventListener('mouseleave',()=>{
            el.classList.remove('active-item')
        })
    })
}
const makeItemsActive = (items)=>{
    items.forEach((el)=>{
        el.addEventListener('click',()=>{
            items.forEach(item=>item.classList.remove('active'))
            el.classList.add('active')
        })
    })
}
const makeMenuItemsActive = ()=>{
    const menuItems = document.querySelectorAll('.menu__list-item');
    makeItemsActive(menuItems)
}
const makeServiceItemsActive = ()=>{
    const serviceItems = document.querySelectorAll('.service__swiper-category');
    makeItemsActive(serviceItems)
}
const makeFooterItemsActive = ()=>{
    const footerItems = document.querySelectorAll('.menu-footer__lang-item')
    makeItemsActive(footerItems)
}
makeServiceItemsActive()
makeMenuItemsHover()
makeMenuItemsActive()
makeFooterItemsActive()
const makeTable = () =>{
    const tableDatas = document.querySelectorAll('.price-slider__service-desc')
    const table = document.createElement('table')
    
    const priceSlider = document.querySelector('.price-among-slider')
    const rowCounts = Math.ceil(tableDatas.length/3);
    const makeOrder = document.querySelector('.make-order')
    for(let i = 0 ;i< rowCounts;i++){
        const tr = document.createElement('tr')
        
        
        for(let j = 0;j < 3;j++){
            
            const td = document.createElement('td')
            
            td.innerHTML = tableDatas[i*3+j].innerHTML
            tr.appendChild(td)
            
            if(j==2){
                const td = document.createElement('td')
                const copyOrder = makeOrder.cloneNode(true)
                td.appendChild(copyOrder)
                tr.appendChild(td)
            }
        }
        table.appendChild(tr)
        }
    priceSlider.classList.add('table-among')
    priceSlider.appendChild(table)
}
makeTable()
const makeShowMore = () =>{
    let serviceText = document.querySelector('.service__text-wrapper');
    let readMoreBtn = document.querySelector('.read-more')
    const readMoreFunc = readMore(serviceText,readMoreBtn,0,1,'Скрыть','Читать далее')
    readMoreBtn.addEventListener('click',()=>{
        readMoreFunc();
    })
    let imageText = document.querySelector('.image-slider__wrapper');
    let showMoreBtn = document.querySelector('.show-more')
    const showMoreFunc = readMore(imageText,showMoreBtn,0,1,'Скрыть','Показать все')
    showMoreBtn.addEventListener('click',()=>{
        showMoreFunc();
    })  
    let imageText2 = document.querySelector('.technics-slider__wrapper');
    let showMoreBtn2 = document.querySelector('.show-more-2')
    const showMoreFunc2 = readMore(imageText2,showMoreBtn2,0,1,'Скрыть','Показать все')
    showMoreBtn2.addEventListener('click',()=>{
        showMoreFunc2();
    }) 
}
makeShowMore()

const opacityWrapper = document.querySelector('.opacity-wrapper')
const cursorWrapper = document.querySelector('.cursor-wrapper') 

const menu = document.querySelector('.menu')
const toggleShowMenu = () =>{
    const crossButton = document.querySelector('.cross-button')
    const burgerBtn = document.querySelector('.header__burger')
    burgerBtn.style.pointerEvents="auto"
    const showObj = (event)=>{
            if(menu.dataset.hidden=="true"){
                menu.style.transform = 'translate(0,0)'
                opacityWrapper.style.opacity = '0.3'
                menu.dataset.hidden = 'false'
                opacityWrapper.style.pointerEvents="none"
                document.body.style.height="500px"
                document.body.style.overflow="hidden"
            }
            event.stopPropagation()
        }
    
    const hideObj = ()=>{
        if(menu.dataset.hidden=='false'){
            if(window.innerWidth<1440){
            menu.style.transform=`translate(-120%,0)`
            }
            menu.dataset.hidden = 'true'
            opacityWrapper.style.pointerEvents="auto"
            document.body.style.height="content-fit"
            document.body.style.overflow="auto"
            menu.style.position="fixed";
            opacityWrapper.style.opacity = '1'
            
        }
        
    }
    cursorWrapper.addEventListener('click',()=>{
        hideObj()
    })
    crossButton.addEventListener('click',()=>{
        hideObj()
    })
    
    burgerBtn.addEventListener('click',(e)=>{
            showObj(e,menu)
        })
}   
toggleShowMenu()
const makeModal = (objectsToShow,modal,crossBtn) =>{
    let isHidden = true
    const menuChildren = Array.from(menu.children)
    const showObj = (event)=>{
            if(isHidden){
                modal.style.transform = 'translate(0,0)'
                menu.style.opacity='0.3'
                opacityWrapper.style.opacity = '0.3'
                isHidden = false
                opacityWrapper.style.pointerEvents="none"
                menuChildren.forEach(el=>el.style.pointerEvents="none")
            }
            event.stopPropagation()
        }
    
    const hideObj = ()=>{
        if(!isHidden){
            menuChildren.forEach(el=>el.style.pointerEvents="auto")
            modal.style.transform=`translate(120%,0)`
            isHidden = true
            opacityWrapper.style.pointerEvents="auto"
            menu.style.pointerEvents="auto"
            modal.style.position="fixed";
            opacityWrapper.style.opacity = '1'
            menu.style.opacity = '1'
        }
        
    }
    crossBtn.addEventListener('click',(e)=>{
        hideObj()
    })
    cursorWrapper.addEventListener('click',(e)=>{
        hideObj()
    })
    menu.addEventListener('click',(e)=>{
        hideObj()
    })
    
    objectsToShow.forEach((el)=>{
        el.addEventListener('click',(e)=>{
            showObj(e,modal)
        })
    }) 
}   
// const menu = document.querySelector('.menu')
// const burgerBtn = document.querySelector('.header__burger')
// const crossButton = document.querySelector('.cross-button')
// funcShowHideObj([cursorWrapper,crossButton],[burgerBtn],menu,false,-120,[opacityWrapper],true)

const chatModal = document.querySelector('.feed-back-1')
const chatMenuBtn = document.querySelector('.chat-btn')
const topChatBtn = document.querySelector('.top-chat-btn')
const chatCrossBtn = document.querySelector('.feed-back__cross-button--1')
const repairBtn = document.querySelector('.repair-logo-wrapper')
const mail = document.querySelector('.menu-footer__mail').closest('button')
makeModal([chatMenuBtn,topChatBtn,repairBtn,mail],chatModal,chatCrossBtn)

const callModal = document.querySelector('.feed-back-2')
const callCrossBtn = document.querySelector('.feed-back__cross-button--2')
const topCallBtn = document.querySelector('.top-call-btn')
const callMenuBtn = document.querySelector('.menu-call-btn')
const phone = document.querySelector('.menu-footer__phone').closest('button')
makeModal([topCallBtn,callMenuBtn,phone],callModal,callCrossBtn)


// funcShowHideObj([cursorWrapper,feedBackCrossBtn1],[topChatBtn],feedBackPopUp1,false,120,[opacityWrapper,menu])

// const menuCallBtn = document.querySelector('.menu-call-btn')
// const topCallBtn = document.querySelector('.top-call-btn')
// funcShowHideObj([cursorWrapper,feedBackCrossBtn2],[topCallBtn],feedBackPopUp2,false,120,[opacityWrapper,menu])
// funcShowHideObj([cursorWrapper,feedBackCrossBtn2],[menuCallBtn],feedBackPopUp2,true,120,[opacityWrapper,menu])

const technicsSliders = document.querySelectorAll('.technics-slider__slide');
const imageSliders = document.querySelectorAll('.image-slider__swiper');
const resize = () =>{
    const serviceTitle = document.querySelector('.service__title');
    const decoration = document.querySelector('.service__title-decoration')
    
    const serviceTitleX = serviceTitle.getBoundingClientRect().x
    decoration.style.left = (`-${serviceTitleX+2}px`)       
    const makeLeftMargin= (obj,columnCount)=>{
        for(let i = 0; i < obj.length;i++){
            obj[i].style.marginLeft=0;
        }
        const objWidth =obj[0].offsetWidth 
        const containerWidth = document.querySelector('.container').offsetWidth
        const margin = (containerWidth - objWidth * columnCount)/(columnCount-1)*(0.96);
        for(let i = 0;i < columnCount; i++){
            obj[i].classList.add('remove-top-margin');
        }
        for(let i = 0; i < obj.length;i++){
            if(i%columnCount!=0){
                obj[i].style.marginLeft=margin+'px';
            }
        }
    }
    if(window.innerWidth<768){
        for(let i = 0; i < imageSliders.length;i++){
            imageSliders[i].style.marginLeft=0;
        }
    }
    if(window.innerWidth>=768&&window.innerWidth<1440){
        
        makeLeftMargin(technicsSliders,3)
        makeLeftMargin(imageSliders,3)
    }
    if(window.innerWidth>=1440){
        if(menu.dataset.hidden=='false'){
            menu.dataset.hidden = 'true'
            opacityWrapper.style.pointerEvents="auto"
            document.body.style.height="content-fit"
            document.body.style.overflow="auto"
            menu.style.position="fixed";
            opacityWrapper.style.opacity = '1'
        }
        menu.style.position="static"
        menu.style.transform="none"
        const technicsSliders = document.querySelectorAll('.technics-slider__slide');
        makeLeftMargin(technicsSliders,4)
        const imageSliders = document.querySelectorAll('.image-slider__swiper');
        makeLeftMargin(imageSliders,4)
    }else{
        menu.style.position='fixed'
        if(menu.dataset.hidden=="true") menu.style.transform="translate(-120%,0)"
    }
}



let mobileSwipers;
let topSwiper;

let isMobile = false
let isMediumWidth = false
const addMobileSwiper= ()=>{
    if(window.innerWidth<768&&!isMobile){
        mobileSwipers = new Swiper (".image-slider,.technics-slider,.price-slider", {
            slidesPerView:"auto",
            spaceBetween: 16,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          });
          isMobile=true
    }
    if(window.innerWidth>=768&&isMobile){
        mobileSwipers.forEach(el=>el.destroy())
        isMobile=false
    }
    if(window.innerWidth<1440 && !isMediumWidth){
        topSwiper = new Swiper('.service__slider',{
            slidesPerView:"auto",
            spaceBetween: 16,
          });
          isMediumWidth = true
    }
    if(window.innerWidth>=1440 && isMediumWidth){
        topSwiper.destroy()
        isMediumWidth=false
    }
}

addMobileSwiper()
resize()
window.addEventListener('resize',()=>{
    resize();
    addMobileSwiper()
})
