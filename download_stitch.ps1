Write-Host "Downloading images and HTML code from Stitch..."

$files = @(
    @{name="home_page_screenshot.png"; url="https://lh3.googleusercontent.com/aida/ADBb0uhV6bi5owMRVmnVKNfofZrTCkRy6X_Cq6tZL7f2QSUgeYo17yWZb6qQ7hgmyOEhj94zSrblKY6zWlTXly07WnvlkheyFGh7RLY9yzNEznAq3ol3Snwp8v9DLfBc8SEphyAvrHF2e2PDPJklrBpfRd-RSW9Da1WslmQdqJcD0ETI_MzsFI7ykb8LyYjvJ4SR2AToCdugEpY6rAjGL_-3Yt0HQ2ra6z1eUgq9dDZQ32adEs5Sd7a410QZc3G3"},
    @{name="home_page.html"; url="https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzQ1NDBmODNmODVlNjQ0OTNhZjFhNWNiMzM0MjJmM2QzEgsSBxD7z_D3lxUYAZIBJAoKcHJvamVjdF9pZBIWQhQxNDE3OTY2Mzk4MjY1NzUyNzMzNA&filename=&opi=89354086"},
    
    @{name="collections_screenshot.png"; url="https://lh3.googleusercontent.com/aida/ADBb0uhHeB-ErgLAb_HFPgCD1uwhkvi2yqLtdRF25RaIMIpvzYV-WxNwhF8x42jkKQ8xsCIa3LWqc0dkALtK9XSioVYKhYsBgFbz4nb4wadyW2TUA8y0mZbwRJtmZXXBnrMPE-GDbMzC88ezxxAIU0xbH3rdf3CrlVnrdHjFBlLu8SRm35fJJa4OlzcjN1CFsCMYzGTr7dHoYjB43_NWKdA-6wX1arhY8o7bNsuTyF5zYldmSDgcnWrTgNNdaUY"},
    @{name="collections.html"; url="https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzVlMWIwNjAzODFiNjQyMGVhNTM1OTVjYTdjYjk5MGNiEgsSBxD7z_D3lxUYAZIBJAoKcHJvamVjdF9pZBIWQhQxNDE3OTY2Mzk4MjY1NzUyNzMzNA&filename=&opi=89354086"},

    @{name="product_details_screenshot.png"; url="https://lh3.googleusercontent.com/aida/ADBb0uhyy6LikYAgFDA309VWI0KkHR8tCN6HF2qd8nbYoEfM6P9XX3TWoaHxVtuR1XmbeEO7V7i4NqfvInUaTyMQfhxsPaUqlFu-qqbjXN-smvevwOGWcknRdRF5la13bbJWgaJJvDoyIYfluf2I3KiufKcDNJdqAjAH_VuILmHOzoL-mzFEPDHdbPYUCDnh8jBDnFyISnna1I0oqm-vTGnLTi_H93GJ3ieD6NgGcau4Ftta3Qg7vF6Km0Ej46U"},
    @{name="product_details.html"; url="https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzY4ZDdmMTQwOGU3MzQzZTRhZGQyODMzNWNiMjBhYzhkEgsSBxD7z_D3lxUYAZIBJAoKcHJvamVjdF9pZBIWQhQxNDE3OTY2Mzk4MjY1NzUyNzMzNA&filename=&opi=89354086"},

    @{name="legacy_screenshot.png"; url="https://lh3.googleusercontent.com/aida/ADBb0uj3Zu0KxiMtB9sSAA43NNz1VbuiMNynkFUeDCr6qnKEA_re7qo40DzYozqsCqVbBanY23iFg8LupqalpPnqnhHgoyU59dR-cHj90EAe1xnR94zVt_h41fzlEuaNJLvj4YXZppD7u4FA6aG76ll7lkAUaXRAm4UXtLa_aqn6BVeJq9VROJXg9NKUmhif9R2zpU0M75bzhlqMBB_w6a6TbNP49kba7gOoOmHr1wIxB3l1zAxVe3hUiVcVS2s"},
    @{name="legacy.html"; url="https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzFjNTExNDY4ZjM5YzRjZDdhNGI2NzZlNGZiNWVkZmJlEgsSBxD7z_D3lxUYAZIBJAoKcHJvamVjdF9pZBIWQhQxNDE3OTY2Mzk4MjY1NzUyNzMzNA&filename=&opi=89354086"},

    @{name="privacy_terms_screenshot.png"; url="https://lh3.googleusercontent.com/aida/ADBb0ugff6WvSYHtT-ojBcWfiygdb-EJcrmCxbxXCSGKys3959R5PAs-Ym4oaww3ktUy01kg1YVHi_Vt12hGXvudUMzOoUBHpx-xH0h8HClSe4wtWrGFanPKnskoVZ_Auw5QEXV1xAhFIFNuW6fwCyB8jn1ZorEP7dHugkim2E24yj2EoT0wi5XrbhXHhvwyQWFdo6m_23YYSU_ObllOl9IUZ6lasik64-kklZeAB6U1P2-Qnybg_qRryAor-C6O"},
    @{name="privacy_terms.html"; url="https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzA5NWEzYjc2ODU1ZDQwNzZiZjRiNDNmNjkyODFkMTFmEgsSBxD7z_D3lxUYAZIBJAoKcHJvamVjdF9pZBIWQhQxNDE3OTY2Mzk4MjY1NzUyNzMzNA&filename=&opi=89354086"}
)

foreach ($file in $files) {
    Write-Host "Downloading $($file.name)..."
    curl.exe -L -o $file.name $file.url
}

Write-Host "Downloads completed!"
