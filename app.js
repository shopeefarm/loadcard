 window.onload = function () {
            var canvases = document.querySelectorAll('.scratch');
            canvases.forEach(function (canvas) {
                var ctx = canvas.getContext('2d');
                var image = canvas.previousElementSibling;
                canvas.width = image.width;
                canvas.height = image.height;

                // Calculate center coordinates
                var centerX = canvas.width / 2;
                var centerY = canvas.height / 2;

                // Calculate half the width and height of the rectangle
                var rectWidth = canvas.width;
                var rectHeight = canvas.height;

                // Adjust the starting coordinates to center the rectangle
                var startX = centerX - rectWidth / 2;
                var startY = centerY - rectHeight / 2;

                ctx.fillStyle = 'gray';
                ctx.fillRect(57, 7, 189, 30);
                ctx.globalCompositeOperation = 'destination-out';

                var scratching = false;

                function scratchStart(event) {
                    scratching = true;
                    scratch(event);
                }

                function scratchMove(event) {
                    if (scratching) {
                        scratch(event);
                    }
                }

                function scratchEnd() {
                    scratching = false;
                }

                function scratch(event) {
                    var rect = canvas.getBoundingClientRect();
                    var x = event.clientX - rect.left;
                    var y = event.clientY - rect.top;

                    ctx.beginPath();
                    ctx.arc(x, y, 20, 0, 2 * Math.PI);
                    ctx.fill();
                }

                canvas.addEventListener('mousedown', scratchStart);
                canvas.addEventListener('mousemove', scratchMove);
                canvas.addEventListener('mouseup', scratchEnd);
                canvas.addEventListener('mouseout', scratchEnd);
                canvas.addEventListener('touchstart', scratchStart);
                canvas.addEventListener('touchmove', scratchMove);
                canvas.addEventListener('touchend', scratchEnd);

                // Calculate the total number of pixels in the scratch area
                var totalPixels = canvas.width * canvas.height;

                // Calculate the number of scratched pixels
                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var scratchedPixels = 0;
                for (var i = 0; i < imageData.data.length; i += 4) {
                    // Check if the pixel is transparent (scratched off)
                    if (imageData.data[i + 3] === 0) {
                        scratchedPixels++;
                    }
                }

                // Calculate the percentage of scratched area
                var scratchedPercentage = (scratchedPixels / totalPixels) * 100;

                // Check if the scratched percentage is between 95% and 100%
                if (scratchedPercentage >= 95 && scratchedPercentage <= 100) {
                    console.log("Scratch area is 95-100% revealed!");
                }
            });
        };