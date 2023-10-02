// Function to create and trigger the download of an empty CSV file
function downloadEmptyCSV() {
    // Create a data URI for an empty CSV content
    const csvContent = "data:text/csv;charset=utf-8,";
    // Create a Blob containing the CSV content
    const blob = new Blob([csvContent], {
        type: "text/csv"
    });
    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "empty.csv"; // File name
    document.body.appendChild(a);

    // Trigger the click event on the <a> element
    a.click();

    // Clean up: remove the <a> element and revoke the URL
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}



