Write-Host "Downloading images and HTML code from Stitch..."

$files = @(
    @{name="home_page_screenshot.png"; url="https://lh3.googleusercontent.com/aida/ADBb0ugQ_Mr-hsM8pppPLtTksRs_xGp-JxhfNMHHaVA3QfR05BXe74YqtNTWhpTyO2eqImHrFEW7vPSiOW3Wc21Y0FOeemUViv2y33GU-tV9PeGwWJBY2jfN-PU1ZYHFeC6X_gvEuvzdY_201vOpZVTIMqS3HP7b_cPTdFsIyf7DTHWW73Xqumeo4mo6feloYNc8KzTxhO0m3jv-4VD49HmzMxY0YVPQpDtzc9nb89aC7nRSR2nWtKNLiZxbp2kI"},
    
    @{name="collections_screenshot.png"; url="https://lh3.googleusercontent.com/aida/ADBb0uhHw3eYdYJ0YpSAuX7uizMRziWY8iLO5Xwn0Rar2pDoS8Z4iMv6hS-5OCSkSYIlCCH7uaik2Z3whkWi2qX1P7S9VvHGXnBN_pWEminpAzZDjHYjZxH3sNsjPNzkHZK9Z6j-0PBgBnmrGAWt1BtFSl8FvrxZYKYTNjUKt4UfKpu5jPGd2wHnboosIxwoTdRZYgARC3qU4vr7brpFak04uLOUCzs2rLfqrdOpxPMVtSCPUGnAkDwQM_7t67G0"},

    @{name="product_details_screenshot.png"; url="https://lh3.googleusercontent.com/aida/ADBb0uimyLtnIWtmV-rPfmg9q2g_Y3Z_USsn4hbDfwtfxI5H-R0BQ_RnQDcBkkeY27mFH7V-G4B9C67LHsaEckwvfueKR7JN5mNjqgrsHYsB-cerd-Vz7oun7TzHttHjD-sxqX_D1ybgQQqL0ZEk4mj8JpCWPGPgfgStnJGtXAO0h0pvQU5OKC0jvboqz0iHxfq4ecgZlE1MZfydFtt1HugsPSydg3AylDXmKunidqWC1EZL1WDxbUFCJZzpqFA"},

    @{name="legacy_screenshot.png"; url="https://lh3.googleusercontent.com/aida/ADBb0ugWbT5TM87Q4u65BNWrn-Vn0amw3-aKm7Xnf2NCqp4A_cwUNx-EJmPAGs2eV0A3X1UFg4ALtpE81xuRERferSTzkxwFwFVw0s__t4V0814NT6gN4rFc0a1rcCRQpR4Smd4r4yChjcNB51JroF0q6FhUTaTpaIAMEe4er3deGF-MoFeIGO8RlAWPeZ_uaRF9NXH8T9JBxu1dqNiqUHLEgGPum1TE7zUIUXNt52_vY9175U3l-ro96gW6RBr_"},

    @{name="privacy_terms_screenshot.png"; url="https://lh3.googleusercontent.com/aida/ADBb0uhl32EECY4zLiiyaoIdrMykrYciDwlalVwLPFJQu-7aXQBGHrgBfv7FzntE6iylaLAsEmO99myMRYcH8yg31OuodNt3VVTlnWpE22kxG8-RiuVlaia9itB-bylFjZi58AuiNxpy2h5sI-IRbXO9xCOkalc1UXCqcTuL3iSOwdzqqkvsz6AU_SRsvfSZ8V5UIobszQad0EVLN95gc3TTqKY6UV8GS625ZV6acDEl2TC6WvrjPS-GL2a3dQmS"}
)

foreach ($file in $files) {
    Write-Host "Downloading $($file.name)..."
    curl.exe -L -o $file.name $file.url
}

Write-Host "Downloads completed!"
