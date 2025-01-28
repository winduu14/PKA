document.addEventListener('DOMContentLoaded', function () {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbRgnENeis3iPHAoYCiOr-UT-8lZ2Vu_VGz91SEYM_aFQVP3ctIxTDzKoQE1MzcAhGCG_iT1mvhhfz/pub?output=csv'; // Ganti dengan URL file CSV Anda

    let documents = []; // Array untuk menyimpan data dokumen

    Papa.parse(url, {
        download: true,
        header: true,
        complete: function(results) {
            documents = results.data; // Simpan data dokumen ke dalam array
            displayDocuments(documents); // Tampilkan semua dokumen
        },
        error: function(error) {
            console.error('Error parsing CSV:', error);
        }
    });

    // Fungsi untuk menampilkan dokumen
    function displayDocuments(docs) {
        const documentCards = document.getElementById('document-cards');
        documentCards.innerHTML = ''; // Clear existing cards

        docs.forEach(doc => {
            if (doc['Title'] && doc['Description'] && doc['Type'] && doc['Link']) {
                const card = document.createElement('div');
                card.className = 'col-md-4';
                card.innerHTML = `
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title"><i class="fas fa-file-alt"></i> ${doc['Title']}</h5>
                            <span class="badge badge-primary mb-2">${doc['Type']}</span>
                            <p class="card-text">${doc['Description']}</p>
                            <a href="${doc['Link']}" class="btn btn-outline-primary" target="_blank">Lihat Dokumen</a>
                        </div>
                    </div>
                `;
                documentCards.appendChild(card);
            } else {
                console.warn('Incomplete row data:', doc);
            }
        });
    }

    // Fungsi untuk mencari dokumen berdasarkan judul
    function searchDocuments() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const filteredDocs = documents.filter(doc => doc['Title'].toLowerCase().includes(searchTerm));
        
        // Update search description
        const searchDescription = document.getElementById('search-description');
        if (filteredDocs.length > 0) {
            searchDescription.textContent = `Jumlah Hasilnya: ${filteredDocs.length}`;
        } else {
            searchDescription.textContent = 'Tidak Dapat Menemukan Hasil';
        }

        displayDocuments(filteredDocs); // Tampilkan dokumen yang sesuai dengan pencarian
    }

    // Hanya memproses pencarian saat tombol "Cari" diklik
    document.getElementById('search-button').addEventListener('click', searchDocuments);
});
