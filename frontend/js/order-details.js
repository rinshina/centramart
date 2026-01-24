document.addEventListener('DOMContentLoaded', function() {
    // Rating stars functionality
    const stars = document.querySelectorAll('.star');
    let currentRating = 0;
    
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            currentRating = index + 1;
            updateStars();
        });
        
        star.addEventListener('mouseover', function() {
            highlightStars(index + 1);
        });
    });
    
    document.querySelector('.rating-stars').addEventListener('mouseleave', function() {
        updateStars();
    });
    
    function updateStars() {
        stars.forEach((star, index) => {
            if (index < currentRating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#ffc107';
            } else {
                star.style.color = '#ddd';
            }
        });
    }
    
    // Submit review
    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.addEventListener('click', function() {
        if (currentRating > 0) {
            console.log('Review submitted with rating:', currentRating);
            alert('Thank you for your review!');
        } else {
            alert('Please select a rating before submitting.');
        }
    });
});