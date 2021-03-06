/*
    Código original por Felipe Barrella Netto
    Alterado por Arthur Svensson
*/

var arrayParam, carouseriaHeight, carouseriaLoop, carouseriaDirection, carouseriaAutoPlay, carouseriaIndex, carouseriaNav, navContent, indexContent, indexContentChild, autoPlay, slideReady, mainCarousel, innerElement, focusElem, maxElem; function setCarousel(divParam) {
    console.clear(); /* clearInterval(autoPlay);*/

    if (indexContent != null) indexContent.remove();
    if (navContent != null) navContent.remove();
    if (document.getElementById("carouseria") != null) {
        mainCarousel = document.getElementById("carouseria");
        carouseriaHeight = divParam.split(" ")[0]; carouseriaLoop = ("true" == divParam.split(" ")[1]); carouseriaDirection = divParam.split(" ")[2]; carouseriaAutoPlay = divParam.split(" ")[3]; carouseriaIndex = (divParam.split(" ")[4]).split("|"); carouseriaNav = (divParam.split(" ")[5]).split("|"); mainCarousel.style.height = carouseriaHeight; if (mainCarousel.querySelector(".carouseria-item") != null) {
            innerElement = mainCarousel.querySelectorAll(".carouseria-item"); for (i = 0; i < innerElement.length; i++) { innerElement[i].style.display = "none"; innerElement[i].style.opacity = 0; innerElement[i].style.position = "relative"; innerElement[i].style.left = "0px"; innerElement[i].style.top = "0px"; innerElement[i].setAttribute("count", i) }
            focusElem = innerElement[0]; maxElem = innerElement.length - 1; slideReady = !0; if (carouseriaNav[0] == "true") navNative(carouseriaNav[1]); if (carouseriaIndex[0] == "true") visualIndex(innerElement.length, carouseriaIndex[1]); refreshFocus(!1); autoplay(carouseriaAutoPlay)
        } else { console.log("Não foram detectados itens para exibição.") }
    } else { console.log("Houve erro na detecção do id \"carouseria\"!") }
}
function show(elem, reverse) {
    elem.style.top = "0px"; elem.style.left = "0px"; if (!reverse) {
        try { fadeIn(elem); if (carouseriaDirection == "horizontal") { slideH(elem, 0, mainCarousel.clientWidth, 0, reverse) } else { if (carouseriaDirection == "vertical") { slideV(elem, 0, mainCarousel.clientHeight, 0, reverse) } else { console.log("Erro na definição da direção do carousel.") } } } catch (err) { console.log("Erro detectado: " + err) }
        setTimeout(() => {
            elem.style.display = "block"; if (carouseriaIndex[0] == "true") indexChange()
        }, 10)
    } else {
        try { fadeIn(elem); if (carouseriaDirection == "horizontal") { slideH(elem, 0, -(mainCarousel.clientWidth), 0, reverse) } else { if (carouseriaDirection == "vertical") { slideV(elem, 0, -(mainCarousel.clientHeight), 0, reverse) } else { console.log("Erro na definição da direção do carousel.") } } } catch (err) { console.log("Erro detectado: " + err) }
        setTimeout(() => { elem.style.display = "block"; if (carouseriaIndex[0] == "true") indexChange() }, 10)
    }
}
function hide(elem, reverse) {
    if (!reverse) {
        try {
            fadeOut(elem); if (carouseriaDirection == "horizontal") { slideH(elem, -(mainCarousel.clientWidth), 0, -(mainCarousel.clientWidth), reverse) }
            else {
                if (carouseriaDirection == "vertical") { slideV(elem, -(mainCarousel.clientHeight), 0, -(mainCarousel.clientHeight), reverse) }
                else { console.log("Erro na definição da direção do carousel.") }
            }
        } catch (err) { console.log("Erro detectado: " + err) }
        setTimeout(() => { elem.style.display = "none" }, 300)
    } else {
        try { fadeOut(elem); if (carouseriaDirection == "horizontal") { slideH(elem, mainCarousel.clientWidth, 0, mainCarousel.clientWidth, reverse) } else { if (carouseriaDirection == "vertical") { slideV(elem, mainCarousel.clientHeight, 0, mainCarousel.clientHeight, reverse) } else { console.log("Erro na definição da direção do carousel.") } } } catch (err) { console.log("Erro detectado: " + err) }
        setTimeout(() => { elem.style.display = "none" }, 300)
    }
}
function autoplay(param) {
    if (param.split("|")[0] = "true") { /* true desativa o autoplay, mas fica bem rápido, não sei corrigir :( */
        if (param.split("|")[1] == 1) {
            autoPlay = setInterval(() => next(), param.split("|")[1])
        }
    }
    else { setInterval(autoPlay, 3000) }
}

/*function visualIndex(num, setParams) {
    indexContent = document.createElement('div'); setParams == "vertical" ? indexContent.setAttribute("class", "carouseria-index verti") : indexContent.setAttribute("class", "carouseria-index hori"); indexContent.style.height = mainCarousel.clientHeight + "px"; indexContent.style.marginTop = "-" + mainCarousel.clientHeight + "px"; for (var i = 0; i < num; i++) { indexContent.innerHTML = indexContent.innerHTML + '<span class="index-item"></span>' }
    mainCarousel.insertAdjacentElement('afterend', indexContent); indexContentChild = indexContent.querySelectorAll('span'); for (var i = 0; i < indexContentChild.length; i++) { indexContentChild[i].style.opacity = 0.4; indexContentChild[i].setAttribute('onclick', 'changeFocus(innerElement[' + i + '], false)') }
}*/
function indexChange() {
    var count = parseInt(focusElem.getAttribute("count")); for (var i = 0; i < indexContentChild.length; i++) { indexContentChild[i].style.opacity = 0.4; indexContentChild[i].setAttribute('onclick', 'changeFocus(innerElement[' + i + '], false)') }
    indexContentChild[count].style.opacity = 0.9; for (var j = 1; j < indexContentChild.length; j++) { if ((count - j) >= 0) { indexContentChild[count - j].setAttribute('onclick', 'changeFocus(innerElement[' + (count - j) + '], true)') } else { break } }
}
function navNative(setparam) { var btnCont = document.createElement('div'); navContent = document.createElement('div'); navContent.setAttribute('class', 'carouseria-nav'); navContent.style.height = mainCarousel.clientHeight + "px"; navContent.style.marginBottom = "-" + mainCarousel.clientHeight + "px"; navContent.style.top = "-" + mainCarousel.clientHeight + "px"; if (setparam == "vertical") { btnCont.setAttribute('class', 'vertical'); btnCont.innerHTML = '<span onclick="prev()" class="nav-up">&#65087;</span>'; btnCont.innerHTML += '<span onclick="next()" class="nav-down">&#65088;</span>'; navContent.insertAdjacentElement('afterbegin', btnCont); mainCarousel.insertAdjacentElement('afterend', navContent) } else { btnCont.setAttribute('class', 'horizontal'); btnCont.innerHTML = '<span onclick="prev()" class="nav-left">&#10092;</span>'; btnCont.innerHTML += '<span onclick="next()" class="nav-right">&#10093;</span>'; navContent.insertAdjacentElement('afterbegin', btnCont); mainCarousel.insertAdjacentElement('afterend', navContent) } }
function fadeIn(elem) { elem.style.opacity = parseFloat(elem.style.opacity) + 0.1; if (elem.style.opacity > 1.0) { elem.style.opacity = 1.0; setTimeout(() => { slideReady = !0 }, 200) } else { setTimeout(() => { fadeIn(elem) }, 10) } }
function fadeOut(elem) { elem.style.opacity = parseFloat(elem.style.opacity) - 0.1; if (elem.style.opacity < 0.0) { elem.style.opacity = 0.0 } else { setTimeout(() => { fadeOut(elem) }, 10) } }
function refreshFocus(reverse) { show(focusElem, reverse) }
function changeFocus(elem, reverse) { hide(focusElem, reverse); focusElem = elem; setTimeout(() => refreshFocus(reverse), 300) }
function next() { if (slideReady) { var nowCount = parseInt(focusElem.getAttribute("count")); if (nowCount < maxElem) { slideReady = !1; changeFocus(innerElement[nowCount + 1], !1) } else { if (nowCount == maxElem && carouseriaLoop) { slideReady = !1; changeFocus(innerElement[0], !1) } } } }
function prev() { if (slideReady) { var nowCount = parseInt(focusElem.getAttribute("count")); if (nowCount > 0) { slideReady = !1; changeFocus(innerElement[nowCount - 1], !0) } else { if (nowCount == 0 && carouseriaLoop) { slideReady = !1; changeFocus(innerElement[maxElem], !0) } } } }
function slideH(elem, path, startpos, finalpos, reverse) { var id = setInterval(() => { for (var i = 0; i <= 140; i += 2) { if (reverse ? startpos >= path : startpos <= path) { clearInterval(id); elem.style.left = finalpos + 'px' } else { reverse ? startpos += 1 : startpos -= 1; elem.style.left = startpos + 'px' } } }, 10) }
function slideV(elem, path, startpos, finalpos, reverse) { var id = setInterval(() => { for (var i = 0; i <= 50; i += 2) { if (reverse ? startpos >= path : startpos <= path) { clearInterval(id); elem.style.top = finalpos + 'px' } else { reverse ? startpos += 1 : startpos -= 1; elem.style.top = startpos + 'px' } } }, 10) }