import labels from "./labels.json";

/**
 * Render prediction boxes
 * @param {HTMLCanvasElement} canvasRef canvas tag reference
 * @param {number} classThreshold class threshold
 * @param {Array} boxes_data boxes array
 * @param {Array} scores_data scores array
 * @param {Array} classes_data class array
 * @param {Array[Number]} ratios boxes ratio [xRatio, yRatio]
 */
export const renderBoxes = (
  canvasRef,
  classThreshold,
  boxes_data,
  scores_data,
  classes_data,
  ratios
) => {
  const ctx = canvasRef.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clean canvas

  const colors = new Colors();

  // Font configuration
  const font = `${Math.max(
    Math.round(Math.max(ctx.canvas.width, ctx.canvas.height) / 40),
    14
  )}px Arial`;
  ctx.font = font;
  ctx.textBaseline = "top";

  for (let i = 0; i < scores_data.length; ++i) {
    // Filter based on class threshold
    if (scores_data[i] > classThreshold) {
      const classId = classes_data[i];
      const klass = labels[classId] || "Unknown"; // Fallback to "Unknown" if label is undefined
      const color = colors.get(classId);
      const score = (scores_data[i] * 100).toFixed(1);

      // Scale bounding box coordinates to canvas size
      let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);
      x1 *= ratios[0]; // Apply xRatio scaling
      x2 *= ratios[0]; // Apply xRatio scaling
      y1 *= ratios[1]; // Apply yRatio scaling
      y2 *= ratios[1]; // Apply yRatio scaling
      const width = x2 - x1;
      const height = y2 - y1;

      // Debugging logs to verify bounding box scaling and drawing
      console.log(`Scaled Bounding Box: [${x1}, ${y1}, ${x2}, ${y2}]`);
      console.log(`Computed Box Dimensions: width=${width}, height=${height}`);

      // Draw the filled rectangle for the box
      ctx.fillStyle = Colors.hexToRgba(color, 0.2);
      ctx.fillRect(x1, y1, width, height);

      // Draw the border of the box
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(
        Math.min(ctx.canvas.width, ctx.canvas.height) / 200,
        2.5
      );
      ctx.strokeRect(x1, y1, width, height);

      // Draw the label background
      ctx.fillStyle = color;
      const labelText = `${klass} - ${score}%`;
      const textWidth = ctx.measureText(labelText).width;
      const textHeight = parseInt(font, 10);
      const yText = y1 - (textHeight + ctx.lineWidth);

      ctx.fillRect(
        x1 - 1,
        yText < 0 ? 0 : yText, // Handle overflow label box
        textWidth + ctx.lineWidth,
        textHeight + ctx.lineWidth
      );

      // Draw the label text
      ctx.fillStyle = "#ffffff";
      ctx.fillText(labelText, x1 - 1, yText < 0 ? 0 : yText);
    }
  }
};

class Colors {
  // Ultralytics color palette https://ultralytics.com/
  constructor() {
    this.palette = [
      "#FF3838",
      "#FF9D97",
      "#FF701F",
      "#FFB21D",
      "#CFD231",
      "#48F90A",
      "#92CC17",
      "#3DDB86",
      "#1A9334",
      "#00D4BB",
      "#2C99A8",
      "#00C2FF",
      "#344593",
      "#6473FF",
      "#0018EC",
      "#8438FF",
      "#520085",
      "#CB38FF",
      "#FF95C8",
      "#FF37C7",
    ];
    this.n = this.palette.length;
  }

  get = (i) => this.palette[Math.floor(i) % this.n];

  static hexToRgba = (hex, alpha) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgba(${[
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ].join(", ")}, ${alpha})`
      : null;
  };
}
