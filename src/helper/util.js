export function darkModeHandler(setDark, isDark) {
    const newDarkMode = !isDark;
    
    // Toggle the dark-mode class for body, container, and table
    // document.body.classList.toggle("dark-mode", newDarkMode);
    document.querySelector(".container").classList.toggle("dark-mode", newDarkMode);
    document.querySelectorAll("table").forEach((table) => {
      table.classList.toggle("dark-mode");
  });
    
    // Update state and localStorage to persist dark mode
    setDark(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode ? "dark" : "light");
  }


export const allFields = [
  'company', '_id', 'name', 'category', 'contact_num', 'email', 'location', 'GST_No',
'GST_Turnover', 'Supplier_Type', 'numericId'
]

export const requireField = [
  'company', 'name', 'category', 'contact_num', 'email'
]
export const uploadFields = allFields.filter(e=> e!=='_id' && e!=='numericId').concat(['EnqDate','status'])

export const getChekedId = () => Array.from(document.querySelectorAll('input[type="checkbox"]')).filter(e=>e.checked).map(e=>e.id)

export function exportToCsv(Rows) {
  const rows = [Object.keys(Rows[0])];
  for(let row of Rows)
    rows.push(Object.values(row))
  const filename = Date.now()
  var processRow = function (row) {
      var finalVal = '';
      for (var j = 0; j < row.length; j++) {
          var innerValue = row[j] === null ? '' : row[j].toString();
          if (row[j] instanceof Date) {
              innerValue = row[j].toLocaleString();
          };
          var result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0)
              result = '"' + result + '"';
          if (j > 0)
              finalVal += ',';
          finalVal += result;
      }
      return finalVal + '\n';
  };

  var csvFile = '';
  for (var i = 0; i < rows.length; i++) {
      csvFile += processRow(rows[i]);
  }

  var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
  } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}

export const checkAll = ()=> Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(e=>e.checked=true); 
export const uncheckAll = ()=> Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(e=>e.checked=false); 

export function closeDialgog(msg){
    setTimeout(()=>{
      const modal = window.bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
          modal.hide();
      window.alert(msg);
  },1000)
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}