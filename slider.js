document.addEventListener('DOMContentLoaded', function () {
    const fileUploader = document.getElementById('fileUploader');
    const imagePreview = document.getElementById('imagePreview');
    const submitBtn = document.getElementById('submitBtn');
    const imagePreviewHeading = document.getElementById('imagePreviewHeading');
    let slides = [];
    let currentIndex = 0;

    fileUploader.addEventListener('change', function () {
        const files = this.files;
        console.log("files", files)
        if (files && files.length > 0) {
            imagePreviewHeading.style.display = 'block';
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (slides.length >= 6) {
                    alert('You can only upload a maximum of 6 images.');
                    break; 
                }
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const img = new Image();
                        img.onload = function () {
                            const imgElement = document.createElement('img');
                            const aspectRatio = img.width / img.height;
                            if (img.width > img.height) {
                                imgElement.style.width = '100%';
                                imgElement.style.height = 'auto';
                            } else {
                                imgElement.style.width = 'auto';
                                imgElement.style.height = '100%';
                            }
                            imgElement.src = e.target.result;
                            slides.push(imgElement);
                            renderImagePreview();
                        };
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert('Please select only image files.');
                }
            }
        }
    });

    function renderImagePreview() {
        imagePreview.innerHTML = ''; 
        // slides.forEach((file, index) => {
        //     const fileDetails = document.createElement('div');
        //     fileDetails.textContent = `File ${index + 1}: ${file.name} - ${file.type}`;
        // imagePreview.appendChild(fileDetails);
        
        slides.forEach((slide, index) => {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('preview-image-container');
            imgContainer.appendChild(slide.cloneNode(true));
            imagePreview.appendChild(imgContainer);
        });
    }

    submitBtn.addEventListener('click', function () {
        if (slides.length > 0) {
            renderSlider();
            imagePreviewHeading.textContent = "Your Slide"; 
            submitBtn.style.display = 'none'; 
        } else {
            alert('Please select some images first.');
        }
    });

    function renderSlider() {
        const sliderContainer = document.createElement('div');
        sliderContainer.classList.add('slider-container');

        const slideWrapper = document.createElement('div');
        slideWrapper.classList.add('slide-wrapper');
        sliderContainer.appendChild(slideWrapper);

        slides.forEach((slide, index) => {
            const slideItem = document.createElement('div');
            slideItem.classList.add('slide');
            slideItem.appendChild(slide.cloneNode(true));
            slideWrapper.appendChild(slideItem);
        });

        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.classList.add('prev');
        prevBtn.addEventListener('click', function () {
            navigateSlide('prev');
        });
        sliderContainer.appendChild(prevBtn);

        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.classList.add('next');
        nextBtn.addEventListener('click', function () {
            navigateSlide('next');
        });
        sliderContainer.appendChild(nextBtn);

        imagePreview.innerHTML = ''; 
        imagePreview.appendChild(sliderContainer);
        showSlide(0);
    }

    function navigateSlide(direction) {
        const totalSlides = slides.length;
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % totalSlides;
        } else if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        }
        showSlide(currentIndex);
    }

    function showSlide(index) {
        const slideItems = document.querySelectorAll('.slide');
        slideItems.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }
});
