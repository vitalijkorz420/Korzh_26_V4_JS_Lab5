document.querySelectorAll('.image-container').forEach(function(container) {
  let tooltip = container.querySelector('.tooltip');
  container.addEventListener('mouseenter', function(e) {
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';
  });
  container.addEventListener('mousemove', function(e) {
      let rect = container.getBoundingClientRect();
      let offsetX = e.clientX - rect.left;
      let offsetY = e.clientY - rect.top;
      tooltip.style.left = offsetX + 'px';
      tooltip.style.top = offsetY + 'px';
      tooltip.style.visibility = 'visible';
  });
  container.addEventListener('mouseleave', function(e) {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
  });
});
