$(document).ready(function() {
    // Thêm hàng mới
    $('#add-row-btn').click(function() {
        let newRow = `
            <tr>
                <td><input type="text" class="form-control" placeholder="Tên"></td>
                <td><input type="text" class="form-control" placeholder="Số máy lẻ"></td>
                <td><input type="text" class="form-control" placeholder="Thành phố"></td>
                <td><input type="date" class="form-control"></td>
                <td><input type="text" class="form-control" placeholder="Hoàn thành"></td>
                <td>
                    <button class="btn btn-sm btn-primary save-btn">Lưu</button>
                    <button class="btn btn-sm btn-danger delete-btn">Xóa</button>
                </td>
            </tr>`;
        $('table tbody').append(newRow);
    });

    // Sửa hàng
    $(document).on('click', '.edit-btn', function() {
        let row = $(this).closest('tr');
        row.find('td').each(function() {
            if (!$(this).find('button').length) {
                let content = $(this).text();
                $(this).html('<input type="text" class="form-control" value="' + content + '">');
            }
        });
        $(this).text('Lưu').removeClass('edit-btn').addClass('save-btn');
    });

    // Lưu hàng
    $(document).on('click', '.save-btn', function() {
        let row = $(this).closest('tr');
        row.find('td').each(function() {
            if (!$(this).find('button').length) {
                let content = $(this).find('input').val();
                $(this).html(content);
            }
        });
        $(this).text('Sửa').removeClass('save-btn').addClass('edit-btn');
    });

    // Xóa hàng
    $(document).on('click', '.delete-btn', function() {
        if (confirm('Bạn có chắc chắn muốn xóa hàng này không?')) {
            $(this).closest('tr').remove();
        }
    });
});

//Thanh hiện modal

$(document).ready(function() {
    $('#detailsModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Nút được nhấn
        var stt = button.data('stt');
        var temperature = button.data('temperature');
        var humidity = button.data('humidity');
        var windSpeed = button.data('wind-speed');
        var windDirection = button.data('wind-direction');
        var solarRadiation = button.data('solar-radiation');

        // Cập nhật thông tin trong modal
        var modal = $(this);
        modal.find('#modal-stt').text(stt);
        modal.find('#modal-temperature').text(temperature);
        modal.find('#modal-humidity').text(humidity);
        modal.find('#modal-wind-speed').text(windSpeed);
        modal.find('#modal-wind-direction').text(windDirection);
        modal.find('#modal-solar-radiation').text(solarRadiation);
    });
});


//thanh chuyển nội dung
document.getElementById('scroll-left').addEventListener('click', function() {
    document.getElementById('scrolling-container').scrollBy({
        left: -100,
        behavior: 'smooth'
    });
});

document.getElementById('scroll-right').addEventListener('click', function() {
    document.getElementById('scrolling-container').scrollBy({
        left: 100,
        behavior: 'smooth'
    });
});


//Thanh trượt
document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 1;
    const totalPages = document.querySelectorAll('.news-page').length; // Number of pages
    const maxVisiblePages = 3; // Number of visible page buttons

    // Function to update the pagination display
    function updatePagination() {
        // Hide all news pages
        document.querySelectorAll('.news-page').forEach(page => {
            page.style.display = 'none';
        });

        // Show the current news page
        const newsPages = document.querySelectorAll('.news-page');
        newsPages.forEach((page, index) => {
            if (index === currentPage - 1) {
                page.style.display = 'block';
            }
        });

        // Update pagination buttons
        const pageNumbers = document.querySelectorAll('.page-number');
        pageNumbers.forEach(page => {
            const pageNum = parseInt(page.getAttribute('data-page'));

            // Calculate range of pages to display
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));

            // Adjust start and end pages if the range is smaller than maxVisiblePages
            if (endPage - startPage + 1 < maxVisiblePages) {
                if (startPage === 1) {
                    endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                } else if (endPage === totalPages) {
                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                }
            }

            // Show pages around the current page
            if (pageNum >= startPage && pageNum <= endPage) {
                page.style.display = '';
            } else {
                page.style.display = 'none';
            }
        });

        // Set active class on current page
        pageNumbers.forEach(page => {
            const pageNum = parseInt(page.getAttribute('data-page'));
            if (pageNum === currentPage) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });

        // Disable Previous button if on the first page
        document.getElementById('prev-page').parentElement.classList.toggle('disabled', currentPage === 1);

        // Disable Next button if on the last page
        document.getElementById('next-page').parentElement.classList.toggle('disabled', currentPage === totalPages);
    }

    // Function to handle page changes
    function handlePageChange(pageNumber) {
        currentPage = pageNumber;
        updatePagination();
    }

    // Event listener for Next button
    document.getElementById('next-page').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    });

    // Event listener for Previous button
    document.getElementById('prev-page').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    });

    // Event listeners for page number buttons
    document.querySelectorAll('.page-number a').forEach(page => {
        page.addEventListener('click', function(e) {
            e.preventDefault();
            handlePageChange(parseInt(this.parentElement.getAttribute('data-page')));
        });
    });

    // Initialize pagination
    updatePagination();
});

//thêm bệnh tôm

document.addEventListener('DOMContentLoaded', () => {
    const addDiseaseModal = document.getElementById('addDiseaseModal');
    const diseaseForm = document.getElementById('diseaseForm');

    if (diseaseForm) {
        diseaseForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const diseaseName = document.getElementById('diseaseName').value;
            const symptoms = document.getElementById('symptoms').value;
            const age = document.getElementById('age').value;
            const temperature = document.getElementById('temperature').value;

            const diseaseTable = document.querySelector('#diseaseTable');
            const rowCount = diseaseTable.rows.length + 1;
            const newRow = diseaseTable.insertRow();
            newRow.innerHTML = `
                <td>${rowCount}</td>
                <td>${diseaseName}</td>
                <td>${symptoms}</td>
                <td>${age}</td>
                <td>${temperature}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-btn">Sửa</button>
                    <button class="btn btn-danger btn-sm delete-btn">Xóa</button>
                </td>
            `;

            // Reset form
            diseaseForm.reset();

            // Hide the modal
            $('#addDiseaseModal').modal('hide');
        });
    }
});
