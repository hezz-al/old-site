function el(a) {
    return document.querySelector(a)
}

function ela(a) {
    return document.querySelectorAll(a)
}

function httpXmlRequest() {
    var a;
    try {
        a = new ActiveXObject("Msxml2.XMLHTTP")
    } catch (c) {
        try {
            a = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
            a = false
        }
    }
    if (!a && typeof XMLHttpRequest != "undefined") {
        a = new XMLHttpRequest()
    }
    return a
}

function validEmail(b) {
    var a = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(b).search(a) != -1
}
var scrollPos = window.scrollTop,
    canPressKey = true,
    backspacePress = false,
    search_value_is_empty = true,
    userAgent = navigator.userAgent.toLowerCase();
setInterval(function() {
    updateOnlineUser()
}, 20000);
console.log("%c Sayt 0-dan yazılıb və bütün kodlar HEZZ.AL-a məxsusdur !", "color: red;font-size:40px;");
for (var i = 0; i < document.getElementsByTagName("img").length; i++) {
    var img = document.getElementsByTagName("img")[i];
    img.ondragstart = function() {
        return false
    }
}
if (document.URL.indexOf("music") == -1) {
    countIncreaser(40);
    setInterval(function() {
        countIncreaser(40)
    }, 9000)
}
document.onkeydown = function(a) {
    if (a.keyCode != 116) {
        if (canPressKey) {
            if (a.ctrlKey || a.keyCode == 123) {
                return false
            }
            if (backspacePress && a.keyCode == 8) {
                a.preventDefault();
                location.href = "http://hezz.al/"
            }
        } else {
            return false
        }
    }
};

function getOffset(c) {
    var b = 0,
        a = 0;
    while (c && !isNaN(c.offsetLeft) && !isNaN(c.offsetTop)) {
        b += c.offsetLeft - c.scrollLeft;
        a += c.offsetTop - c.scrollTop;
        c = c.offsetParent
    }
    return {
        top: a,
        left: b
    }
}

function scrollTo(c, a, d) {
    if (d < 0) {
        return
    }
    var e = a - c.scrollTop;
    var b = e / d * 10;
    setTimeout(function() {
        c.scrollTop = c.scrollTop + b;
        if (c.scrollTop == a) {
            return
        }
        scrollTo(c, a, d - 10)
    }, 10)
}

function sendMessage(c) {
    var b = el(".contact_form .name").value;
    var a = el(".contact_form .email").value;
    var f = el(".contact_form .message_text").value;
    if (b.length < 3) {
        el(".contact_form .name").style.color = el(".contact_form .name").style.borderColor = "red";
        el("p.messageSendingStatus").innerHTML = "Xahiş edirik öz adınızı qeyd edin.";
        return
    } else {
        el(".contact_form .name").style.color = el(".contact_form .name").style.borderColor = "#fff";
        el("p.messageSendingStatus").innerHTML = ""
    }
    if (!validEmail(a)) {
        el(".contact_form .email").style.color = el(".contact_form .email").style.borderColor = "red";
        el("p.messageSendingStatus").innerHTML = "Xahiş edirik düzgün E-ünvanınızı qeyd edin.";
        return
    } else {
        el(".contact_form .email").style.color = el(".contact_form .email").style.borderColor = "#fff";
        el("p.messageSendingStatus").innerHTML = ""
    }
    if (f.length < 3) {
        el(".contact_form .message_text").style.color = el(".contact_form .message_text").style.borderColor = "red";
        el("p.messageSendingStatus").innerHTML = "Xahiş edirik mesajınızı daha ətraflı yazın.";
        return
    } else {
        el(".contact_form .message_text").style.color = el(".contact_form .message_text").style.borderColor = "#fff";
        el("p.messageSendingStatus").innerHTML = ""
    }
    var d = httpXmlRequest();
    d.open("POST", "/php/function.php", true);
    d.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var e = "sendMessage=yes&name=" + b + "&email=" + a + "&text=" + f;
    d.onreadystatechange = function() {
        if (d.readyState == 4 && d.status == 200) {
            if (d.responseText == 1) {
                c.innerHTML = "Göndərildi !";
                c.className += " sendedMessageButton";
                c.disabled = true
            } else {
                el("p.messageSendingStatus").innerHTML = d.responseText;
                c.innerHTML = "Göndər";
                c.disabled = false;
                alert(d.responseText)
            }
        }
    };
    d.send(e);
    c.innerHTML = "Gedir ...";
    c.disabled = true
}

function countIncreaser(c) {
    var a = new Array(),
        e = new Array(),
        d = new Array();
    var b = setInterval(function() {
        for (var h = 0; h < ela(".statistics_count").length; h++) {
            if (a.length < 4) {
                var g = parseInt(ela(".statistics_count")[h].innerHTML);
                a.push(g);
                var f = parseInt(g / 100);
                if (f < 1) {
                    f = 1
                }
                e.push(f);
                ela(".statistics_count")[h].innerHTML = parseInt(f)
            }
            if (d.indexOf(a[h]) == -1) {
                var g = parseInt(ela(".statistics_count")[h].innerHTML);
                ela(".statistics_count")[h].innerHTML = parseInt(g + e[h]);
                if (g >= a[h]) {
                    d.push(a[h]);
                    ela(".statistics_count")[h].innerHTML = a[h]
                }
            }
        }
    }, c)
}

function updateOnlineUser() {
    var a = httpXmlRequest();
    a.open("POST", "/php/function.php", true);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var b = "updateOnlineUser=yes";
    a.send(b)
}

function sideBar() {
    var b = el(".side_bar").style.right;
    if (b == "-350px" || b == "") {
        el(".side_bar").style.right = 0;
        showSideBarItem(el("input[name=side_bar]:checked").id)
    } else {
        el(".side_bar").style.right = "-350px";
        for (var a = 0; a < ela(".playlists_list_li").length; a++) {
            ela(".playlists_list_li")[a].classList.remove("playlistAnimation")
        }
        for (var a = 0; a < ela(".likesSongsList_li").length; a++) {
            ela(".likesSongsList_li")[a].classList.remove("songsAnimation")
        }
        document.removeEventListener("click", sideBarCloser)
    }
}

function showSideBarItem(a) {
    if (a == "likesInput") {
        el(".likesSongsList").scrollTop = 0;
        el(".playlists_list").style.marginLeft = "-350px";
        for (var b = 0; b < ela(".likesSongsList_li").length; b++) {
            ela(".likesSongsList_li")[b].className += " songsAnimation"
        }
        for (var b = 0; b < ela(".playlists_list_li").length; b++) {
            ela(".playlists_list_li")[b].classList.remove("playlistAnimation")
        }
    } else {
        el(".playlists_list").scrollTop = 0;
        el(".playlists_list").style.marginLeft = "0";
        for (var b = 0; b < ela(".playlists_list_li").length; b++) {
            ela(".playlists_list_li")[b].className += " playlistAnimation"
        }
        for (var b = 0; b < ela(".likesSongsList_li").length; b++) {
            ela(".likesSongsList_li")[b].classList.remove("songsAnimation")
        }
    }
    document.addEventListener("click", sideBarCloser)
}

function sideBarCloser(e) {
    var f = el(".side_bar");
    var d = e.target.parentNode;
    if (d != f && d.parentNode != f && d.parentNode.parentNode != f && d.parentNode.parentNode.parentNode != f && d.parentNode.parentNode.parentNode.parentNode != f && d.parentNode.parentNode.parentNode.parentNode.parentNode != f) {
        sideBar();
        document.removeEventListener("click", sideBarCloser);
        return
    }
}

function delLikedSong(a, d) {
    a.parentNode.style.height = 0;
    a.parentNode.style.opacity = 0;
    a.parentNode.style.padding = "0 10px";
    setTimeout(function() {
        a.parentNode.style.display = "none"
    }, 1000);
    var b = httpXmlRequest();
    b.open("POST", "/php/function.php", true);
    b.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var c = "delLikedSong=yes&id=" + d;
    b.onreadystatechange = function() {
        if (b.readyState == 4 && b.status == 200) {
            if (b.responseText != 1) {
                alert(b.responseText)
            }
        }
    };
    b.send(c)
}

function closeFbLike(f) {
    f.parentNode.parentNode.style.opacity = 0;
    setTimeout(function() {
        f.parentNode.parentNode.style.display = "none"
    }, 600);
    var d = httpXmlRequest();
    d.open("POST", "/php/function.php", true);
    d.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var e = "closeFbLike=yes";
    d.send(e)
}
var searchTimer = null;

function searchSong(b) {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function() {
        if (b.value.length < 2) {
            el(".search_results").innerHTML = "";
            if (document.URL.indexOf("music") == -1) {
                el(".search_results_arrow").style.display = "none";
                el(".search_icon").src = "/img/icons/search_icon.png"
            }
            return
        }
        var d = httpXmlRequest();
        d.open("POST", "/php/function.php", true);
        d.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        d.setRequestHeader("Cache-Control", "no-cache");
        var a = "searchSong=yes&text=" + b.value;
        d.onload = function() {
            if (d.readyState == 4 && d.status == 200) {
                el(".search_results").innerHTML = d.responseText;
                if (document.URL.indexOf("music") == -1) {
                    el(".search_results_arrow").style.display = "block";
                    el(".search_icon").src = "/img/icons/search_icon.png"
                }
            }
        };
        d.send(a)
    }, 1000);
    if (document.URL.indexOf("music") == -1 && el(".search_icon").src.indexOf("music_loader") == -1) {
        el(".search_icon").src = "/img/icons/music_loader.gif"
    }
}

function openSearchBox(a) {
    backspacePress = false;
    document.removeEventListener("keyup", playerKeyUpHandler);
    a.className += " openedSearchBox";
    a.querySelector("input").focus();
    el(".search_results_arrow").style.display = "block";
    el(".search_results").style.display = "block";
    document.body.onclick = function(b) {
        if (b.target != el(".search_box") && b.target.parentNode != el(".search_box") && b.target.parentNode.parentNode != el(".search_box") && b.target.parentNode.parentNode.parentNode != el(".search_box")) {
            a.classList.remove("openedSearchBox");
            backspacePress = true;
            a.querySelector("input").value = "";
            document.addEventListener("keyup", playerKeyUpHandler);
            setTimeout(function() {
                el(".search_results").style.display = "none"
            }, 500)
        }
    }
}

function noSongAdd(h) {
    var c = el(".search_text").value;
    if (c.length < 3) {
        return
    }
    var g = httpXmlRequest();
    g.open("POST", "/php/function.php", true);
    g.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var a = "noSongAdd=yes&text=" + c;
    g.onreadystatechange = function() {
        if (g.readyState == 4 && g.status == 200) {
            if (g.responseText == 1) {
                h.parentNode.querySelector(".no_song_text").innerHTML = "Adminin cavabı: <br/> - Baş üstə rəis. 24 saat ərzində əlavə olunacaq. Başqa arzu diləyin ?";
                h.innerHTML = "Sağlığın";
                h.setAttribute("onclick", "this.parentNode.innerHTML = '';el('.search_results_arrow').style.display = 'none';");
                el(".search_text").value = ""
            } else {
                alert(g.responseText)
            }
        }
    };
    g.send(a);
    h.parentNode.querySelector(".no_song_text").innerHTML = "Ötürürük adminə ..."
}

function getStatistics() {
    var a = httpXmlRequest();
    a.open("POST", "/php/function.php", true);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    a.send("getStatistics=yes");
    a.onreadystatechange = function() {
        if (a.readyState == 4 && a.status == 200) {
            el(".top_songs").innerHTML = a.responseText
        }
    }
};
