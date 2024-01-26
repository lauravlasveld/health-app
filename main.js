document.addEventListener("DOMContentLoaded", function () {
    const placesContainer = document.getElementById("placesContainer");
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;

    placesContainer.addEventListener("mousedown", dragStart);
    placesContainer.addEventListener("touchstart", dragStart);

    placesContainer.addEventListener("mousemove", drag);
    placesContainer.addEventListener("touchmove", drag);

    placesContainer.addEventListener("mouseup", dragEnd);
    placesContainer.addEventListener("mouseleave", dragEnd);
    placesContainer.addEventListener("touchend", dragEnd);

    function dragStart(e) {
      if (e.type === "touchstart") {
        startPosition = e.touches[0].clientX;
      } else {
        startPosition = e.clientX;
      }

      isDragging = true;
    }

    function drag(e) {
      if (!isDragging) return;

      const currentPosition = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const distance = currentPosition - startPosition;

      currentTranslate += distance;
      placesContainer.style.transform = `translateX(${currentTranslate}px)`;

      startPosition = currentPosition;
    }

    function dragEnd() {
      isDragging = false;
    }
  });


