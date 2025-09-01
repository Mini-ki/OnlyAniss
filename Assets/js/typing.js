document.addEventListener("DOMContentLoaded", function() {
    const kalimat = document.querySelector('.kalimat');
    const gif = document.getElementById('gifBubu');
    const pilihanDiv = document.querySelector('.pilihan');
    const pilihanDiv2 = document.querySelector('.pilihan2');
    const inputPesan = document.querySelector('.inputPesan');
    const btnGa = document.getElementById('btnGa');

    // Fungsi random posisi untuk tombol GAA
    function randomPosition() {
        btnGa.style.position = 'absolute'; // baru jadi absolute saat random
        const parentRect = pilihanDiv2.getBoundingClientRect();
        const btnBolehh = pilihanDiv2.querySelector('button:not(#btnGa)');
        const btnBolehhRect = btnBolehh.getBoundingClientRect();

        let left, top, gaRect;

        do {
            const maxLeft = parentRect.width - btnGa.offsetWidth - 10;
            const maxTop = parentRect.height - btnGa.offsetHeight - 10;
            left = Math.random() * maxLeft;
            top = Math.random() * maxTop;

            gaRect = {
                left: parentRect.left + left,
                right: parentRect.left + left + btnGa.offsetWidth,
                top: parentRect.top + top,
                bottom: parentRect.top + top + btnGa.offsetHeight
            };
        } while (
            gaRect.right > btnBolehhRect.left &&
            gaRect.left < btnBolehhRect.right &&
            gaRect.bottom > btnBolehhRect.top &&
            gaRect.top < btnBolehhRect.bottom
        );

        btnGa.style.left = left + 'px';
        btnGa.style.top = top + 'px';
    }
    btnGa.addEventListener('mouseenter', randomPosition);
    btnGa.addEventListener('click', randomPosition);

    // Kalimat dan flow
    const kalimatList1 = [
        "HAII, CWEKK TERLUCUU (?)",
        "GIMANAA HARII HARIINYAAA....??",
    ];
    const kalimatBaik = [
        "YEYYY MANGATT TERUSS YAAA",
        "BIARR TAMBAH LUCUUNYA....",
    ];
    const kalimatGaBaik = [
        "YAHHH, TETEP SEMANGATT YA!!",
        "BIAR GA HILANG LUCUNYAA....",
    ];
    const kalimatList2 = [
        "HMMM, BOLEHH NANYAA GAA??",
        "BOLEHH GAA.....",
        "KALOKK KITA TEMENANN??",
    ];
    const kalimatList3 = [
        "YEYYY MAKASIII YAAAAA",
        "KALOKK GITUU BOLEHH KANN....",
    ];

    let kalimatIndex = 0;
    let charIndex = 0;
    let typingDelay = 60;
    let newTextDelay = 1200;

    function type(text, callback) {
        if (charIndex < text.length) {
            kalimat.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(() => type(text, callback), typingDelay);
        } else if (callback) {
            setTimeout(callback, newTextDelay);
        }
    }

    function startTypingKalimatList(kalimatList, afterCallback = null) {
        if (kalimatIndex < kalimatList.length) {
            charIndex = 0;
            kalimat.textContent = '';
            type(kalimatList[kalimatIndex], () => {
                if (kalimatIndex === kalimatList.length - 1 && afterCallback) {
                    kalimatIndex = 0;
                    afterCallback();
                } else {
                    kalimatIndex++;
                    startTypingKalimatList(kalimatList, afterCallback);
                }
            });
        }
    }

    function typeKalimatArray(arr, idx = 0, callback = null) {
        if (idx < arr.length) {
            charIndex = 0;
            kalimat.textContent = '';
            type(arr[idx], () => typeKalimatArray(arr, idx + 1, callback));
        } else if (callback) {
            callback();
        }
    }

    // Event untuk pilihan pertama
    pilihanDiv.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            const gifSrc = e.target.getAttribute('data-gif');
            gif.src = gifSrc;
            gif.style.width = "30%";
            pilihanDiv.style.display = 'none';
            if (e.target.textContent.trim().toUpperCase() === "BAIK") {
                typeKalimatArray(kalimatBaik, 0, () => {
                    kalimatIndex = 0;
                    gif.src = "Assets/img/gifBubu_2.gif"; // Ganti GIF di sini
                    startTypingKalimatList(kalimatList2, () => {
                        pilihanDiv2.style.display = 'flex';
                    });
                });
            } else {
                typeKalimatArray(kalimatGaBaik, 0, () => {
                    kalimatIndex = 0;
                    gif.src = "Assets/img/gifBubu_2.gif";
                    startTypingKalimatList(kalimatList2, () => {
                        pilihanDiv2.style.display = 'flex';
                    });
                });
            }
        }
    });

    // Event untuk pilihan2 (BOLEHH dan GAA)
    pilihanDiv2.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' && e.target !== btnGa) {
            // BOLEHH diklik, lakukan aksi selanjutnya di sini
            pilihanDiv2.style.display = 'none';
            gif.src = "Assets/img/gifBubu_3.gif"; // Ganti GIF di sini
            gif.style.width = "30%";
            startTypingKalimatList(kalimatList3, () => {
                inputPesan.style.display = 'flex';
            });
        }
    });

    // Mulai flow awal
    startTypingKalimatList(kalimatList1, () => {
        pilihanDiv.style.display = 'flex';
    });

    document.getElementById('submitPesan').addEventListener('click', function() {
        const pesan = encodeURIComponent(document.getElementById('pesan').value);
        const nomor = '6281933902567'; // ganti dengan nomor tujuan
        window.open(`https://wa.me/${nomor}?text=${pesan}`, '_blank');
    });

});