import { fabric } from "fabric";

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: -20,
  offsetX: 20,
  cursorStyle: "pointer",
  mouseUpHandler: deleteObject,
  render: renderIcon,
});
fabric.Object.prototype.set({
  transparentCorners: false,
  borderColor: "#2e41cec7",
  cornerColor: "#fff",
  cornerStyle: "circle",
  cornerStrokeColor: "#2e41cec7",
});
fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: -20,
  offsetX: 20,
  cursorStyle: "pointer",
  mouseUpHandler: deleteObject,
  render: renderIcon,
});
fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: -20,
  offsetX: 20,
  cursorStyle: "pointer",
  mouseUpHandler: deleteObject,
  render: renderIcon,
});

const deleteIcon = new Image();
deleteIcon.src = process.env.PUBLIC_URL + "/images/clear.png";

function deleteObject(_: MouseEvent, transform: fabric.Transform): boolean {
  const target = transform.target;
  const canvas = target.canvas;
  canvas?.remove(target);
  canvas?.requestRenderAll();
  return true;
}

function renderIcon(
  this: fabric.Control,
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  _: any,
  fabricObject: fabric.Object
) {
  const size = 18;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle ?? 0));
  ctx.drawImage(deleteIcon, -size / 2, -size / 2, size, size);
  ctx.restore();
}
