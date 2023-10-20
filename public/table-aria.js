(function () {
  'use strict';

  try {
    var allTables = document.querySelectorAll('table');
    for (var i = 0; i < allTables.length; i++) {
      allTables[i].setAttribute('role', 'table');

      var allRowGroups = allTables[i].querySelectorAll('thead, tbody, tfoot');
      for (var j = 0; j < allRowGroups.length; j++) {
        allRowGroups[j].setAttribute('role', 'rowgroup');

        var allRows = allRowGroups[j].querySelectorAll('tr');
        for (var k = 0; k < allRows.length; k++) {
          allRows[k].setAttribute('role', 'row');

          var allCells = allRows[k].querySelectorAll('td');
          for (var l = 0; l < allCells.length; l++) {
            allCells[l].setAttribute('role', 'cell');
          }
          var allHeaders = allRows[k].querySelectorAll('th');
          for (var l = 0; l < allHeaders.length; l++) {
            if (!allHeaders[l].matches('th[scope=row]')) {
              allHeaders[l].setAttribute('role', 'columnheader');
            }
            // this accounts for scoped row headers
            else {
              allHeaders[l].setAttribute('role', 'rowheader');
            }
          }
          // caption role not needed as it is not a real role and
          // browsers do not dump their own role with display block
        }
      }
    }
  } catch (e) {
    console.log('AddTableARIA(): ' + e);
  }
})();
