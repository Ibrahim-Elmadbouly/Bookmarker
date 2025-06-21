var siteName = document.getElementById('sitename');
var siteURL = document.getElementById('siteurl');
var savedSites = document.getElementById('saved-sites');

var allSites =[];
if (localStorage.getItem('sites') != null) {
        allSites = JSON.parse(localStorage.getItem('sites'));
    }

displaySites();

function addSite(){
  if (!validateForm()) {
      return;
  }
  else{
    var siteinfo = {
        name: normalizeSiteName(siteName.value),
        url: siteURL.value
    };
  }
    

    allSites.push(siteinfo);
    localStorage.setItem('sites', JSON.stringify(allSites));
    displaySites();
    showToast("Site Added", "The site " + siteName.value + " has been successfully added.");
    clearAll();


}


function deleteSite(index) {

      showToast("Site Deleted", "The site " + allSites[index].name + " has been successfully deleted.");

    allSites.splice(index, 1);
    localStorage.setItem('sites', JSON.stringify(allSites));
    displaySites();
}

function displaySites() {
    
    var siteData = '';
    for (var i=0 ; i<allSites.length; i++) {
      siteData = siteData + `<tr class="d-flex justify-content-center align-items-center">
        <td class="px-4 py-3 w-50 d-flex flex-column flex-md-row justify-content-center justify-content-md-start align-items-center gap-md-3">
          <img src="https://icons.duckduckgo.com/ip3/${allSites[i].url.indexOf("w") === 8 ? allSites[i].url.split("https://")[1] : allSites[i].url.split("http://")[1]}.ico" alt="Favicon" class="rounded-md" />
          <span class="site-name">${allSites[i].name}</span>
        </td>
        <td class="text-right px-4 py-3 w-50 d-flex justify-content-center justify-content-md-end align-items-center gap-2">
        <a href="${allSites[i].url}" target="_blank"><button id="visitBtn" type="button" class="btn btn-success px-4"><i class="fas fa-external-link-alt"></i> Visit</button></a>
        <button id="deletBtn" onclick="deleteSite(${i})" type="button" class="btn btn-danger px-3"><i class="fas fa-trash-alt"></i> Delete</button></td>
      </tr>`

    }
    savedSites.innerHTML = siteData;
    
    
  }

  function clearAll() {
    siteName.value = '';
    siteURL.value = '';
  }


  function showToast(title, message) {
    const toastElement = document.getElementById('liveToast');
    const toastTitle = document.getElementById('toastTitle');
    const toastBody = document.getElementById('toastBody');

    toastTitle.innerHTML = title;
    toastBody.innerHTML = message;

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}




function validateForm() {

  var siteNameRegex = /^([A-Z]|[a-z]|[0-9]| ){3,19}$/;
  var siteURLRegex = /^(https|http):\/\/www\.[a-z0-9]{2,30}\.[a-z]{2,5}$/;
    var isValid = true;

    if (!siteNameRegex.test(siteName.value)) {
        isValid = false;
        showToast("Invalid Site Name", "Site name must be between 3 to 20 characters long (spaces allowed).");
    }

    if (!siteURLRegex.test(siteURL.value)) {
        isValid = false;
        showToast("Invalid Site URL", "Site URL must start with 'http://' or 'https://' and be in the format 'www.example.com'.");
    }

    return isValid;
}


function normalizeSiteName(myValue){
  myValue = myValue.trim();
  myValue = myValue.toLowerCase();
  var words = myValue.split(" ");

for (var i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1);
}

return words.join(" ");
}