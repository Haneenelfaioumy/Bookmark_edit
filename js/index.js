// global variables
var siteName = document.getElementById("bookmarkName")
var siteURL = document.getElementById("bookmarkURL")

var bookmarks=[];

//storage
if(localStorage.getItem("bookmarksList")!=null){
    bookmarks=JSON.parse(localStorage.getItem("bookmarksList"));
    displayBookmark()
}


//  Submit Function
function submit(){
    if(validateURL() && validateName()){
        var bookmark={
            name: capitalize(siteName.value),
            url:siteURL.value,
        }
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarksList",JSON.stringify(bookmarks))
            displayBookmark()
            clearInput()
            clearshadow()
    }
}
function clearshadow(){
    siteName.classList.remove("shadow-red");
    siteName.classList.remove("shadow-green");
    siteName.classList.add("input-shadow");
    siteURL.classList.remove("shadow-red");
    siteURL.classList.remove("shadow-green");
    siteURL.classList.add("input-shadow");
}
// Clear Function
function clearInput() {
    siteName.value=null;
    siteURL.value=null;
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid")
}


// Display Function 
function displayBookmark() {
    var cartona=""
    for(var i=0 ; i<bookmarks.length;i++){
        cartona+=`
        <tr>
                        <td>${i+1}</td>
                        <td>${bookmarks[i].name}</td>
                        <td>
                            <button class="btn btn-visit" data-index="">
                                <i class="fa-solid fa-eye pe-2"></i>
                                <a href="${bookmarks[i].url}" class="text-decoration-none text-white">Visit</a>
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-delete pe-2" data-index="" onclick="deleteBookmark(${i})">
                                <i class="fa-solid fa-trash-can"></i>
                                Delete
                            </button>
                        </td>
        `
        
    }
    document.getElementById("tableContent").innerHTML=cartona;
}

// Capitalize Function ==> take string and makes it capitalize
function capitalize(str) {
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
}

//  Delete Function
function deleteBookmark(index) {
    bookmarks.splice(index,1)
    displayBookmark()
    localStorage.setItem("bookmarksList",JSON.stringify(bookmarks))
}


// Making sure that user enter the correct data =====> Validation
function validateURL(){
    var url=siteURL.value;
    var valid = /^(ftp|http|https):\/\/[^ "]+(.com)$/.test(url);
    if(valid){
        siteURL.classList.add("is-valid")
        siteURL.classList.add("shadow-green")        
        siteURL.classList.remove("is-invalid")
        siteURL.classList.remove("shadow-red")
        siteURL.classList.remove("input-shadow")
        return true
    }
    else{
        siteURL.classList.add("is-invalid")
        siteURL.classList.add("shadow-red")  
        siteURL.classList.remove("is-valid")
        siteURL.classList.remove("shadow-green")
        siteURL.classList.remove("input-shadow")
        return false

    }
}
function validateName(){
    var siteNameInput=siteName.value;
    var valid = /^.{3,}$/.test(siteNameInput);
    if(valid){
        siteName.classList.add("is-valid")
        siteName.classList.add("shadow-green")        
        siteName.classList.remove("is-invalid")
        siteName.classList.remove("shadow-red")
        siteName.classList.remove("input-shadow")
        return true
    }
    else{
        siteName.classList.add("is-invalid")
        siteName.classList.add("shadow-red")  
        siteName.classList.remove("is-valid")
        siteName.classList.remove("shadow-green")       
        siteName.classList.remove("input-shadow")
        return false
    }
}

